class BeedoChatbot {
    constructor() {
        this.isOpen = false;
        this.knowledgeBase = [
            {
                keywords: ["o que é", "beedo", "bee.do", "quem somos"],
                answer: "A BEE.DO Insurance Group é uma rede de agregação de mediadores de seguros fundada pela Bull Insurance, Catarino Seguros e NewCall Seguros. Oferecemos 100% das comissões e ferramentas de topo para mediadores independentes."
            },
            {
                keywords: ["comissões", "ganhos", "lucro", "dinheiro", "100%"],
                answer: "Na BEE.DO, os parceiros retêm 100% das comissões negociadas com as seguradoras, incluindo bónus contratuais (over's). O nosso objetivo é dar escala ao seu negócio."
            },
            {
                keywords: ["exclusividade", "franchising", "livre", "independência"],
                answer: "Não somos um franchising. Não há cláusulas de exclusividade nem taxas de entrada. Você mantém a sua marca e autonomia total. A saída também é livre a qualquer momento."
            },
            {
                keywords: ["tecnologia", "portal", "digital", "crm", "ferramentas", "lluni"],
                answer: "Oferecemos um Portal do Parceiro completo (powered by LLUNI) com CRM, multi-tarificadores, gestão de apólices e sinistros em tempo real — tudo personalizado com a sua marca."
            },
            {
                keywords: ["aderir", "parceiro", "como funciona", "passos"],
                answer: "O processo tem 4 passos: 1. Conversa informal; 2. Proposta personalizada; 3. Integração e setup; 4. Começar a faturar 100%. Quer agendar uma conversa?"
            },
            {
                keywords: ["seguradoras", "mercado", "companhias"],
                answer: "Temos parcerias com as principais seguradoras nacionais e internacionais, garantindo acesso a produtos exclusivos e condições altamente competitivas."
            },
            {
                keywords: ["suporte", "apoio", "jurídico", "compliance", "asf"],
                answer: "Garantimos apoio técnico especializado, formação contínua e total conformidade com a ASF e o RGPD. Você foca-se em vender, nós tratamos das regras."
            }
        ];
        this.init();
    }

    init() {
        this.createElements();
        this.addEventListeners();
        this.addWelcomeMessage();
    }

    createElements() {
        this.trigger = document.getElementById('beedo-chatbot-trigger');
        this.window = document.getElementById('beedo-chatbot-window');
        this.messagesContainer = document.getElementById('beedo-chatbot-messages');
        this.input = document.getElementById('beedo-chatbot-input');
        this.sendBtn = document.getElementById('beedo-chatbot-send');
        this.closeBtn = document.getElementById('beedo-chatbot-close');
    }

    addEventListeners() {
        this.trigger.addEventListener('click', () => this.toggleWindow());
        this.closeBtn.addEventListener('click', () => this.toggleWindow());
        this.sendBtn.addEventListener('click', () => this.handleSendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSendMessage();
        });
    }

    toggleWindow() {
        this.isOpen = !this.isOpen;
        this.window.classList.toggle('active', this.isOpen);
        if (this.isOpen) {
            this.input.focus();
        }
    }

    addWelcomeMessage() {
        this.addMessage("Olá! Sou o assistente virtual da BEE.DO. Como posso ajudar a aumentar o seu rendimento hoje?", 'bot');
    }

    handleSendMessage() {
        const text = this.input.value.trim();
        if (!text) return;

        this.addMessage(text, 'user');
        this.input.value = '';

        setTimeout(() => {
            const response = this.findResponse(text);
            this.addMessage(response, 'bot');
        }, 600);
    }

    addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `beedo-msg ${sender}`;
        msgDiv.textContent = text;
        this.messagesContainer.appendChild(msgDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    findResponse(query) {
        const lowerQuery = query.toLowerCase();

        for (const item of this.knowledgeBase) {
            if (item.keywords.some(keyword => lowerQuery.includes(keyword))) {
                return item.answer;
            }
        }

        return "Peço desculpa, não consegui encontrar uma resposta exata para isso. Gostaria de agendar uma conversa com um dos nossos consultores para esclarecer todas as dúvidas?";
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new BeedoChatbot();
});
