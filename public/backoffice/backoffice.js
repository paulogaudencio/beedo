// BEE.DO Backoffice — Dashboard Logic with Supabase

const SUPABASE_URL = 'https://jmcsmytmkywbzflesicw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptY3NteXRta3l3YnpmbGVzaWN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2Mzg5NTYsImV4cCI6MjA4ODIxNDk1Nn0.HHr2ru65TI9Sll4t4tlqAH_7rlRpsxFkQfoSvH-6mjo';

class BackofficeApp {
    constructor() {
        this.accessToken = null;
        this.currentTab = 'stats';
        this.conversations = [];
        this.leads = [];
        this.init();
    }

    init() {
        // Check existing session
        const savedToken = localStorage.getItem('beedo_access_token');
        const savedRefresh = localStorage.getItem('beedo_refresh_token');
        if (savedToken) {
            this.accessToken = savedToken;
            this.refreshToken = savedRefresh;
            this.showDashboard();
        }

        this.bindEvents();
    }

    // ─── Supabase Helpers ────────────────────────────────────────
    async supabaseAuth(endpoint, body) {
        const res = await fetch(`${SUPABASE_URL}/auth/v1/${endpoint}`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        return res;
    }

    async supabaseQuery(table, params = '', method = 'GET', body = null) {
        const headers = {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
        };
        if (method === 'POST') headers['Prefer'] = 'return=representation';
        if (method === 'PATCH') headers['Prefer'] = 'return=representation';

        const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}${params}`, {
            method, headers,
            body: body ? JSON.stringify(body) : null,
        });

        if (res.status === 401) {
            // Try to refresh token
            const refreshed = await this.refreshSession();
            if (!refreshed) {
                this.logout();
                return null;
            }
            // Retry with new token
            headers['Authorization'] = `Bearer ${this.accessToken}`;
            const retryRes = await fetch(`${SUPABASE_URL}/rest/v1/${table}${params}`, {
                method, headers,
                body: body ? JSON.stringify(body) : null,
            });
            const text = await retryRes.text();
            return text ? JSON.parse(text) : null;
        }

        const text = await res.text();
        return text ? JSON.parse(text) : null;
    }

    async refreshSession() {
        if (!this.refreshToken) return false;
        try {
            const res = await this.supabaseAuth('token?grant_type=refresh_token', {
                refresh_token: this.refreshToken,
            });
            if (res.ok) {
                const data = await res.json();
                this.accessToken = data.access_token;
                this.refreshToken = data.refresh_token;
                localStorage.setItem('beedo_access_token', data.access_token);
                localStorage.setItem('beedo_refresh_token', data.refresh_token);
                return true;
            }
        } catch (e) {
            console.error('Refresh failed:', e);
        }
        return false;
    }

    // ─── Auth ────────────────────────────────────────────────────
    bindEvents() {
        // Login
        document.getElementById('login-form').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('logout-btn').addEventListener('click', () => this.logout());

        // Navigation
        document.querySelectorAll('.nav-item[data-tab]').forEach(btn => {
            btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
        });

        // Search & Filters
        document.getElementById('conv-search').addEventListener('input', (e) => this.filterConversations(e.target.value));
        document.getElementById('conv-filter').addEventListener('change', (e) => this.filterConversations(null, e.target.value));
        document.getElementById('lead-search').addEventListener('input', (e) => this.filterLeads(e.target.value));
        document.getElementById('lead-filter').addEventListener('change', (e) => this.filterLeads(null, e.target.value));

        // Export
        document.getElementById('export-conversations').addEventListener('click', () => this.exportCSV('conversations'));
        document.getElementById('export-leads').addEventListener('click', () => this.exportCSV('leads'));

        // System
        document.getElementById('save-prompt').addEventListener('click', () => this.saveSystemPrompt());
        document.getElementById('save-welcome').addEventListener('click', () => this.saveWelcomeMessage());
        document.getElementById('save-retention').addEventListener('click', () => this.saveRetention());
        document.getElementById('purge-old-data').addEventListener('click', () => this.purgeOldData());

        // Modal
        document.getElementById('modal-close').addEventListener('click', () => this.closeModal());
        document.querySelector('.modal-overlay')?.addEventListener('click', () => this.closeModal());
    }

    async handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        const errorEl = document.getElementById('login-error');
        const btn = document.getElementById('login-btn');

        btn.textContent = 'A entrar...';
        btn.disabled = true;
        errorEl.textContent = '';

        try {
            const res = await this.supabaseAuth('token?grant_type=password', { email, password });
            const data = await res.json();

            if (!res.ok) {
                errorEl.textContent = data.error_description || data.msg || 'Credenciais inválidas';
                btn.textContent = 'Entrar';
                btn.disabled = false;
                return;
            }

            this.accessToken = data.access_token;
            this.refreshToken = data.refresh_token;
            localStorage.setItem('beedo_access_token', data.access_token);
            localStorage.setItem('beedo_refresh_token', data.refresh_token);
            localStorage.setItem('beedo_user_email', data.user?.email || email);
            this.showDashboard();
        } catch (error) {
            errorEl.textContent = 'Erro de ligação. Tente novamente.';
            btn.textContent = 'Entrar';
            btn.disabled = false;
        }
    }

    logout() {
        this.accessToken = null;
        this.refreshToken = null;
        localStorage.removeItem('beedo_access_token');
        localStorage.removeItem('beedo_refresh_token');
        localStorage.removeItem('beedo_user_email');
        document.getElementById('dashboard').classList.add('hidden');
        document.getElementById('login-screen').style.display = 'flex';
    }

    async showDashboard() {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('dashboard').classList.remove('hidden');
        document.getElementById('user-email').textContent = localStorage.getItem('beedo_user_email') || '';
        await this.loadAllData();
    }

    // ─── Tab Navigation ──────────────────────────────────────────
    switchTab(tab) {
        this.currentTab = tab;
        // Update nav
        document.querySelectorAll('.nav-item[data-tab]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });
        // Update content
        document.querySelectorAll('.tab-content').forEach(el => {
            el.classList.toggle('active', el.id === `tab-${tab}`);
        });
        // Update title
        const titles = { stats: 'Estatísticas', conversations: 'Conversas', leads: 'Leads', system: 'Sistema' };
        document.getElementById('page-title').textContent = titles[tab] || tab;
    }

    // ─── Data Loading ────────────────────────────────────────────
    async loadAllData() {
        await Promise.all([
            this.loadConversations(),
            this.loadLeads(),
            this.loadSystemConfig(),
        ]);
        this.updateStats();
    }

    async loadConversations() {
        const data = await this.supabaseQuery('conversations', '?order=started_at.desc&limit=200');
        this.conversations = data || [];
        this.renderConversations(this.conversations);
    }

    async loadLeads() {
        const data = await this.supabaseQuery('leads', '?order=created_at.desc&limit=200');
        this.leads = data || [];
        this.renderLeads(this.leads);
    }

    async loadSystemConfig() {
        const data = await this.supabaseQuery('system_config', '?select=key,value');
        if (data) {
            data.forEach(item => {
                if (item.key === 'custom_system_prompt') {
                    document.getElementById('system-prompt-editor').value = item.value || '';
                }
                if (item.key === 'chatbot_welcome_message') {
                    document.getElementById('welcome-message-editor').value = item.value || '';
                }
                if (item.key === 'gdpr_retention_months') {
                    document.getElementById('retention-months').value = item.value || '12';
                }
            });
        }
    }

    // ─── Stats ───────────────────────────────────────────────────
    updateStats() {
        const totalConvs = this.conversations.length;
        const totalLeads = this.leads.length;
        const conversion = totalConvs > 0 ? ((totalLeads / totalConvs) * 100).toFixed(1) : 0;
        const avgDuration = totalConvs > 0
            ? Math.round(this.conversations.reduce((sum, c) => sum + (c.duration_seconds || 0), 0) / totalConvs)
            : 0;

        document.getElementById('stat-conversations').textContent = totalConvs;
        document.getElementById('stat-leads').textContent = totalLeads;
        document.getElementById('stat-conversion').textContent = `${conversion}%`;
        document.getElementById('stat-duration').textContent = avgDuration > 60
            ? `${Math.round(avgDuration / 60)}m ${avgDuration % 60}s`
            : `${avgDuration}s`;

        this.renderSentimentChart();
        this.renderHotTopics();
    }

    renderSentimentChart() {
        const sentiments = { very_interested: 0, curious: 0, support: 0, neutral: 0 };
        this.conversations.forEach(c => {
            const s = c.sentiment || 'neutral';
            if (sentiments[s] !== undefined) sentiments[s]++;
            else sentiments['neutral']++;
        });

        const total = Math.max(this.conversations.length, 1);
        const labels = {
            very_interested: 'Muito Interessado',
            curious: 'Curioso',
            support: 'Suporte',
            neutral: 'Neutro'
        };

        const container = document.getElementById('sentiment-chart');
        container.innerHTML = Object.entries(sentiments).map(([key, count]) => {
            const pct = Math.round((count / total) * 100);
            return `
                <div class="sentiment-row">
                    <span class="sentiment-label">${labels[key]}</span>
                    <div class="sentiment-bar-bg">
                        <div class="sentiment-bar ${key}" style="width: ${Math.max(pct, 5)}%">${count}</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    async renderHotTopics() {
        // Get recent messages to analyze topics
        const messages = await this.supabaseQuery('messages', '?role=eq.user&order=created_at.desc&limit=500&select=content');
        const topicKeywords = {
            'Comissões': ['comiss', '100%', 'ganho', 'rendimento', 'lucro', 'over'],
            'Adesão': ['aderir', 'parceiro', 'associado', 'integr', 'como funciona'],
            'Tecnologia': ['portal', 'crm', 'erp', 'tecnolog', 'digital', 'lluni', 'software'],
            'Autonomia': ['autonomia', 'exclusividade', 'franchising', 'independ', 'livre', 'lock-in'],
            'Seguradoras': ['segurador', 'companhia', 'produto', 'mercado'],
            'Reunião': ['reunião', 'conversa', 'agendar', 'marcar', 'contacto'],
            'Formação': ['formação', 'treino', 'aprender', 'curso'],
            'Compliance': ['compliance', 'asf', 'rgpd', 'jurídic', 'regulament'],
        };

        const counts = {};
        Object.keys(topicKeywords).forEach(t => counts[t] = 0);

        if (messages) {
            messages.forEach(msg => {
                const text = (msg.content || '').toLowerCase();
                Object.entries(topicKeywords).forEach(([topic, keywords]) => {
                    if (keywords.some(kw => text.includes(kw))) {
                        counts[topic]++;
                    }
                });
            });
        }

        const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        const container = document.getElementById('hot-topics');

        if (sorted.every(([, c]) => c === 0)) {
            container.innerHTML = '<p class="empty-state" style="padding:1rem"><p>Sem dados suficientes</p></p>';
            return;
        }

        container.innerHTML = sorted
            .filter(([, c]) => c > 0)
            .map(([topic, count]) => `<span class="topic-tag">${topic}<span class="count">${count}</span></span>`)
            .join('');
    }

    // ─── Conversations Table ─────────────────────────────────────
    renderConversations(convs) {
        const tbody = document.getElementById('conversations-tbody');
        if (!convs || convs.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="empty-state">Sem conversas registadas</td></tr>`;
            return;
        }

        tbody.innerHTML = convs.map(c => {
            const date = new Date(c.started_at).toLocaleString('pt-PT', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
            const duration = c.duration_seconds > 60
                ? `${Math.round(c.duration_seconds / 60)}m`
                : `${c.duration_seconds || 0}s`;
            const sentimentLabel = {
                very_interested: 'Muito Interessado',
                curious: 'Curioso',
                support: 'Suporte',
                neutral: 'Neutro'
            }[c.sentiment] || c.sentiment || 'Neutro';

            return `
                <tr>
                    <td title="${c.session_id}">${(c.session_id || c.id).substring(0, 16)}...</td>
                    <td>${date}</td>
                    <td>${duration}</td>
                    <td>${c.message_count || 0}</td>
                    <td><span class="badge ${c.sentiment || 'neutral'}">${sentimentLabel}</span></td>
                    <td><span class="badge ${c.status}">${c.status === 'active' ? 'Ativo' : 'Fechado'}</span></td>
                    <td><button class="action-btn" onclick="app.viewConversation('${c.id}')">Ver</button></td>
                </tr>
            `;
        }).join('');
    }

    filterConversations(search, status) {
        const searchTerm = search !== null ? search : document.getElementById('conv-search').value;
        const statusFilter = status || document.getElementById('conv-filter').value;

        let filtered = this.conversations;
        if (statusFilter !== 'all') {
            filtered = filtered.filter(c => c.status === statusFilter);
        }
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(c =>
                (c.session_id || '').toLowerCase().includes(term) ||
                (c.id || '').toLowerCase().includes(term)
            );
        }
        this.renderConversations(filtered);
    }

    async viewConversation(convId) {
        const messages = await this.supabaseQuery('messages', `?conversation_id=eq.${convId}&order=created_at.asc`);
        const body = document.getElementById('modal-body');

        if (!messages || messages.length === 0) {
            body.innerHTML = '<p class="empty-state">Sem mensagens nesta conversa</p>';
        } else {
            body.innerHTML = messages.map(m => {
                const time = new Date(m.created_at).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
                return `<div class="modal-message ${m.role}"><div>${m.content}</div><div class="msg-time">${time}</div></div>`;
            }).join('');
        }

        document.getElementById('conv-modal').classList.remove('hidden');
    }

    closeModal() {
        document.getElementById('conv-modal').classList.add('hidden');
    }

    // ─── Leads Table ─────────────────────────────────────────────
    renderLeads(leads) {
        const tbody = document.getElementById('leads-tbody');
        if (!leads || leads.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="empty-state">Sem leads registados</td></tr>`;
            return;
        }

        tbody.innerHTML = leads.map(l => {
            const date = new Date(l.created_at).toLocaleString('pt-PT', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
            const statusLabel = { pending: 'Pendente', contacted: 'Contactado', converted: 'Convertido', archived: 'Arquivado' }[l.status] || l.status;

            const nextStatus = l.status === 'pending' ? 'contacted' : l.status === 'contacted' ? 'converted' : null;
            const nextLabel = l.status === 'pending' ? 'Marcar Contactado' : l.status === 'contacted' ? 'Marcar Convertido' : '';

            return `
                <tr>
                    <td><strong>${l.name || '—'}</strong></td>
                    <td>${l.email || '—'}</td>
                    <td>${l.phone || '—'}</td>
                    <td>${date}</td>
                    <td><span class="badge ${l.status}">${statusLabel}</span></td>
                    <td>
                        ${nextStatus ? `<button class="action-btn status-btn" onclick="app.updateLeadStatus('${l.id}', '${nextStatus}')">${nextLabel}</button>` : ''}
                    </td>
                </tr>
            `;
        }).join('');
    }

    filterLeads(search, status) {
        const searchTerm = search !== null ? search : document.getElementById('lead-search').value;
        const statusFilter = status || document.getElementById('lead-filter').value;

        let filtered = this.leads;
        if (statusFilter !== 'all') {
            filtered = filtered.filter(l => l.status === statusFilter);
        }
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(l =>
                (l.name || '').toLowerCase().includes(term) ||
                (l.email || '').toLowerCase().includes(term) ||
                (l.phone || '').toLowerCase().includes(term)
            );
        }
        this.renderLeads(filtered);
    }

    async updateLeadStatus(leadId, newStatus) {
        await this.supabaseQuery('leads', `?id=eq.${leadId}`, 'PATCH', { status: newStatus });
        await this.loadLeads();
        this.updateStats();
    }

    // ─── CSV Export ──────────────────────────────────────────────
    exportCSV(type) {
        let csv = '';
        let filename = '';

        if (type === 'conversations') {
            csv = 'Data/Hora,Sessão ID,Duração (s),Mensagens,Sentimento,Estado\n';
            this.conversations.forEach(c => {
                csv += `"${c.started_at}","${c.session_id}",${c.duration_seconds || 0},${c.message_count || 0},"${c.sentiment || 'neutral'}","${c.status}"\n`;
            });
            filename = `beedo_conversas_${new Date().toISOString().split('T')[0]}.csv`;
        } else {
            csv = 'Nome,Email,Telefone,Data,Estado\n';
            this.leads.forEach(l => {
                csv += `"${l.name || ''}","${l.email || ''}","${l.phone || ''}","${l.created_at}","${l.status}"\n`;
            });
            filename = `beedo_leads_${new Date().toISOString().split('T')[0]}.csv`;
        }

        const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    // ─── System Config ───────────────────────────────────────────
    async saveSystemPrompt() {
        const value = document.getElementById('system-prompt-editor').value;
        const statusEl = document.getElementById('prompt-status');

        await this.supabaseQuery('system_config', '?key=eq.custom_system_prompt', 'PATCH', {
            value,
            updated_at: new Date().toISOString(),
        });

        statusEl.textContent = '✓ Guardado com sucesso';
        setTimeout(() => { statusEl.textContent = ''; }, 3000);
    }

    async saveWelcomeMessage() {
        const value = document.getElementById('welcome-message-editor').value;
        const statusEl = document.getElementById('welcome-status');

        try {
            await fetch(`${SUPABASE_URL}/rest/v1/system_config`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'resolution=merge-duplicates'
                },
                body: JSON.stringify({
                    key: 'chatbot_welcome_message',
                    value,
                    updated_at: new Date().toISOString()
                })
            });
            statusEl.textContent = '✓ Guardado com sucesso';
            setTimeout(() => { statusEl.textContent = ''; }, 3000);
        } catch (e) {
            statusEl.textContent = 'Erro ao guardar';
        }
    }

    async saveRetention() {
        const months = document.getElementById('retention-months').value;
        await this.supabaseQuery('system_config', '?key=eq.gdpr_retention_months', 'PATCH', {
            value: months,
            updated_at: new Date().toISOString(),
        });
        alert('Período de retenção atualizado para ' + months + ' meses.');
    }

    async purgeOldData() {
        const months = parseInt(document.getElementById('retention-months').value);
        if (!confirm(`Tem a certeza que deseja eliminar conversas com mais de ${months} meses? Esta ação é irreversível.`)) return;

        const cutoff = new Date();
        cutoff.setMonth(cutoff.getMonth() - months);
        const cutoffISO = cutoff.toISOString();

        // Delete old messages (cascade from conversations)
        await this.supabaseQuery('conversations', `?started_at=lt.${cutoffISO}`, 'DELETE');

        alert('Dados antigos eliminados com sucesso.');
        await this.loadAllData();
    }
}

// Initialize
const app = new BackofficeApp();
