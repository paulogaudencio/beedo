// BEE.DO Chatbot — Gemini-powered AI Assistant
// Supabase for persistence, Gemini 2.0 Flash for AI responses

const SUPABASE_URL = 'https://jmcsmytmkywbzflesicw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptY3NteXRta3l3YnpmbGVzaWN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2Mzg5NTYsImV4cCI6MjA4ODIxNDk1Nn0.HHr2ru65TI9Sll4t4tlqAH_7rlRpsxFkQfoSvH-6mjo';

class BeedoChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.sessionId = this.generateSessionId();
        this.conversationId = null;
        this.idleTimer = null;
        this.idleNudgeSent = false;
        this.leadFormShown = false;
        this.customSystemPrompt = '';
        this.init();
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
    }

    async init() {
        this.createElements();
        this.addEventListeners();
        await this.loadSystemConfig();
        this.addWelcomeMessage();
        this.startIdleTimer();
    }

    // ─── Supabase Helpers ────────────────────────────────────────
    async supabaseRequest(table, method = 'GET', body = null, params = '') {
        const url = `${SUPABASE_URL}/rest/v1/${table}${params}`;
        const headers = {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': method === 'POST' ? 'return=representation' : undefined,
        };
        // Remove undefined headers
        Object.keys(headers).forEach(k => headers[k] === undefined && delete headers[k]);

        try {
            const res = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : null });
            if (!res.ok) {
                console.error('Supabase error:', res.status, await res.text());
                return null;
            }
            const text = await res.text();
            return text ? JSON.parse(text) : null;
        } catch (e) {
            console.error('Supabase request failed:', e);
            return null;
        }
    }

    async loadSystemConfig() {
        try {
            const data = await this.supabaseRequest('system_config', 'GET', null, '?select=key,value');
            if (data && data.length > 0) {
                const promptConf = data.find(d => d.key === 'custom_system_prompt');
                if (promptConf && promptConf.value) this.customSystemPrompt = promptConf.value;

                const welcomeConf = data.find(d => d.key === 'chatbot_welcome_message');
                if (welcomeConf && welcomeConf.value) this.welcomeMessage = welcomeConf.value;

                const modelConf = data.find(d => d.key === 'chatbot_model');
                if (modelConf && modelConf.value) this.chatbotModel = modelConf.value;
            }
        } catch (e) {
            console.log('No system config loaded');
        }
    }

    async createConversation() {
        const data = await this.supabaseRequest('conversations', 'POST', {
            session_id: this.sessionId,
            status: 'active',
            message_count: 0,
        });
        if (data && data.length > 0) {
            this.conversationId = data[0].id;
        }
    }

    async saveMessage(role, content) {
        if (!this.conversationId) await this.createConversation();
        await this.supabaseRequest('messages', 'POST', {
            conversation_id: this.conversationId,
            role,
            content,
        });
        // Update message count
        if (this.conversationId) {
            this.messages.push({ role, content });
            await this.supabaseRequest(
                'conversations',
                'PATCH',
                { message_count: this.messages.length },
                `?id=eq.${this.conversationId}`
            );
        }
    }

    async saveLead(name, email, phone) {
        if (!this.conversationId) await this.createConversation();
        await this.supabaseRequest('leads', 'POST', {
            conversation_id: this.conversationId,
            name,
            email,
            phone,
            status: 'pending',
        });
        // Track analytics event
        await this.supabaseRequest('analytics_events', 'POST', {
            event_type: 'lead_captured',
            session_id: this.sessionId,
            metadata: { name, email, phone },
        });
    }

    async trackEvent(eventType, metadata = {}) {
        await this.supabaseRequest('analytics_events', 'POST', {
            event_type: eventType,
            session_id: this.sessionId,
            metadata,
        });
    }

    async updateConversationSentiment(sentiment) {
        if (this.conversationId) {
            await this.supabaseRequest(
                'conversations',
                'PATCH',
                { sentiment },
                `?id=eq.${this.conversationId}`
            );
        }
    }

    async closeConversation() {
        if (this.conversationId) {
            const started = this.conversationStartTime || Date.now();
            const duration = Math.floor((Date.now() - started) / 1000);
            await this.supabaseRequest(
                'conversations',
                'PATCH',
                { status: 'closed', ended_at: new Date().toISOString(), duration_seconds: duration },
                `?id=eq.${this.conversationId}`
            );
        }
    }

    // ─── DOM Setup ───────────────────────────────────────────────
    createElements() {
        this.trigger = document.getElementById('beedo-chatbot-trigger');
        this.window = document.getElementById('beedo-chatbot-window');
        this.messagesContainer = document.getElementById('beedo-chatbot-messages');
        this.input = document.getElementById('beedo-chatbot-input');
        this.sendBtn = document.getElementById('beedo-chatbot-send');
        this.closeBtn = document.getElementById('beedo-chatbot-close');
        this.chipsContainer = document.getElementById('beedo-chatbot-chips');
        this.leadForm = document.getElementById('beedo-lead-form');
    }

    addEventListeners() {
        this.trigger.addEventListener('click', () => this.toggleWindow());
        this.closeBtn.addEventListener('click', () => this.toggleWindow());
        this.sendBtn.addEventListener('click', () => this.handleSendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSendMessage();
        });
        this.input.addEventListener('input', () => this.resetIdleTimer());

        // Quick-start chip buttons
        document.querySelectorAll('.beedo-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const text = chip.getAttribute('data-message');
                this.input.value = text;
                this.handleSendMessage();
                this.hideChips();
            });
        });

        // Lead form submit
        if (this.leadForm) {
            this.leadForm.addEventListener('submit', (e) => this.handleLeadSubmit(e));
        }

        // Close conversation on page unload
        window.addEventListener('beforeunload', () => this.closeConversation());
    }

    // ─── UI Actions ──────────────────────────────────────────────
    toggleWindow() {
        this.isOpen = !this.isOpen;
        this.window.classList.toggle('active', this.isOpen);
        if (this.isOpen) {
            this.input.focus();
            this.trackEvent('chat_opened');
            this.conversationStartTime = this.conversationStartTime || Date.now();
        }
    }

    hideChips() {
        if (this.chipsContainer) {
            this.chipsContainer.style.display = 'none';
        }
    }

    addWelcomeMessage() {
        const msg = this.welcomeMessage || "Olá! Sou o Assistente IA da **BEE.DO**. Está pronto para receber **100% das suas comissões** e transformar o seu negócio de mediação? Como posso ajudar hoje?";
        this.addBotMessage(msg);
    }

    startIdleTimer() {
        this.resetIdleTimer();
    }

    resetIdleTimer() {
        clearTimeout(this.idleTimer);
        if (!this.idleNudgeSent && this.isOpen) {
            this.idleTimer = setTimeout(() => {
                if (this.isOpen && !this.idleNudgeSent) {
                    this.addBotMessage("Sabia que na BEE.DO **não partilhamos comissões**? Fica com tudo o que produz. Quer saber como funciona o nosso modelo?");
                    this.idleNudgeSent = true;
                    this.trackEvent('idle_nudge_sent');
                }
            }, 30000);
        }
    }

    // ─── Markdown Rendering ──────────────────────────────────────
    renderMarkdown(text) {
        let html = text
            // Bold
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Italic
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Bullet lists
            .replace(/^[-•]\s+(.+)/gm, '<li>$1</li>')
            // Numbered lists
            .replace(/^\d+\.\s+(.+)/gm, '<li>$1</li>')
            // Links
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
            // Line breaks
            .replace(/\n/g, '<br>');

        // Wrap consecutive <li> in <ul>
        html = html.replace(/((?:<li>.*?<\/li>(?:<br>)?)+)/g, '<ul>$1</ul>');
        html = html.replace(/<br><\/ul>/g, '</ul>');
        html = html.replace(/<ul><br>/g, '<ul>');

        return html;
    }

    // ─── Message Rendering ───────────────────────────────────────
    addBotMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'beedo-msg bot';
        msgDiv.innerHTML = this.renderMarkdown(text);
        this.messagesContainer.appendChild(msgDiv);
        this.scrollToBottom();
    }

    addUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'beedo-msg user';
        msgDiv.textContent = text;
        this.messagesContainer.appendChild(msgDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const typing = document.createElement('div');
        typing.className = 'beedo-msg bot beedo-typing';
        typing.id = 'beedo-typing-indicator';
        typing.innerHTML = `
            <div class="typing-dots">
                <span></span><span></span><span></span>
            </div>
            <span class="typing-text">BEE.DO está a escrever...</span>
        `;
        this.messagesContainer.appendChild(typing);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typing = document.getElementById('beedo-typing-indicator');
        if (typing) typing.remove();
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    showLeadForm() {
        if (this.leadFormShown) return;
        this.leadFormShown = true;
        if (this.leadForm) {
            this.leadForm.classList.add('active');
            this.scrollToBottom();
        }
    }

    hideLeadForm() {
        if (this.leadForm) {
            this.leadForm.classList.remove('active');
        }
    }

    // ─── Send Message to Gemini ──────────────────────────────────
    async handleSendMessage() {
        const text = this.input.value.trim();
        if (!text) return;

        this.addUserMessage(text);
        this.input.value = '';
        this.hideChips();
        this.resetIdleTimer();

        // Save user message to Supabase
        await this.saveMessage('user', text);

        // Show typing indicator
        this.showTypingIndicator();
        this.input.disabled = true;
        this.sendBtn.disabled = true;

        try {
            // Build message history for context (last 10 messages)
            const history = this.messages.slice(-10).map(m => ({
                role: m.role,
                content: m.content,
            }));

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: history,
                    customSystemPrompt: this.customSystemPrompt,
                    model: this.chatbotModel || 'gemini-1.5-flash'
                }),
            });

            this.hideTypingIndicator();

            if (!response.ok) {
                throw new Error('API error');
            }

            const data = await response.json();

            // Display bot response
            this.addBotMessage(data.text);
            await this.saveMessage('bot', data.text);

            // Update sentiment
            if (data.sentiment) {
                await this.updateConversationSentiment(data.sentiment);
            }

            // Handle lead intent
            if (data.hasLeadIntent) {
                this.showLeadForm();
                this.trackEvent('lead_form_shown');
            }

        } catch (error) {
            console.error('Chat error:', error);
            this.hideTypingIndicator();
            const fallbackMsg = "Neste momento a nossa equipa humana está a descansar, mas eu estou aqui 24/7. Deixe o seu contacto e amanhã entraremos em detalhe sobre a sua transição para a BEE.DO. Contacte-nos em **suporte@beedo.pt**";
            this.addBotMessage(fallbackMsg);
            await this.saveMessage('bot', fallbackMsg);
        } finally {
            this.input.disabled = false;
            this.sendBtn.disabled = false;
            this.input.focus();
        }
    }

    // ─── Lead Form Submit ────────────────────────────────────────
    async handleLeadSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const name = form.querySelector('#lead-name').value.trim();
        const email = form.querySelector('#lead-email').value.trim();
        const phone = form.querySelector('#lead-phone').value.trim();

        if (!name || !email) return;

        const submitBtn = form.querySelector('.lead-submit-btn');
        submitBtn.textContent = 'A enviar...';
        submitBtn.disabled = true;

        try {
            await this.saveLead(name, email, phone);
            this.hideLeadForm();
            this.addBotMessage("Obrigado, **" + name + "**! Os seus dados foram registados com sucesso. A nossa equipa irá contactá-lo em breve para agendar uma conversa personalizada. Entretanto, se tiver mais alguma dúvida, estou aqui para ajudar! 🐝");
        } catch (error) {
            console.error('Lead save error:', error);
            this.addBotMessage("Ocorreu um erro ao guardar os seus dados. Por favor, tente novamente ou contacte-nos diretamente em **suporte@beedo.pt**");
        } finally {
            submitBtn.textContent = 'Enviar Contacto';
            submitBtn.disabled = false;
            form.reset();
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new BeedoChatbot();
});
