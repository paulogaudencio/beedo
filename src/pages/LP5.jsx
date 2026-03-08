import React, { useState, useEffect, useRef } from 'react';

const Icon = ({ name, size = 24, className = "" }) => {
    const iconRef = useRef(null);
    useEffect(() => {
        if (window.lucide && iconRef.current) {
            iconRef.current.innerHTML = `<i data-lucide="${name}"></i>`;
            window.lucide.createIcons({
                root: iconRef.current,
                attrs: { width: size, height: size, class: className }
            });
        }
    }, [name, size, className]);
    return <span ref={iconRef} className="inline-flex items-center justify-center" style={{ width: size, height: size }} />;
};

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white mb-3 shadow-sm">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 text-left flex justify-between items-center group bg-white hover:bg-slate-50 transition-colors"
            >
                <span className="text-[15px] font-bold text-slate-800 pr-4">{question}</span>
                <Icon
                    name="chevron-down"
                    size={18}
                    className={`text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <div
                className="overflow-hidden transition-all duration-300 bg-white"
                style={{ maxHeight: isOpen ? '1000px' : '0px' }}
            >
                <div className="px-6 pb-5 text-[15px] text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {answer}
                </div>
            </div>
        </div>
    );
};

const FAQ = () => {
    const categories = [
        {
            title: "Sobre a BEE.DO",
            items: [
                { q: "O que é a BEE.DO – Insurance Group?", a: "A BEE.DO – Insurance Group é uma rede colaborativa de mediadores de seguros que opera na categoria de Corretor. Foi fundada pelas sociedades Bull Insurance, Catarino Seguros e NewCall — três empresas com longa experiência no sector. À data de lançamento, a rede já detém uma carteira de prémios brutos próxima dos 10 M€ e uma equipa conjunta de cerca de 20 pessoas." },
                { q: "Por que razão foi criada a BEE.DO?", a: "O mercado segurador em Portugal tem-se consolidado de forma consistente, colocando os operadores de menor dimensão perante desafios que só podem ser superados de forma colaborativa. A aceleração da digitalização, a pressão sobre os preços, o aparecimento de insurtech e a crescente concentração do sector reduziram as vantagens competitivas dos mediadores independentes. A BEE.DO surge para inverter essa tendência — através da cooperação, da partilha de recursos e da criação de escala colectiva." },
                { q: "Qual é a ambição da BEE.DO?", a: "A BEE.DO tem ambição nacional. O modelo é progressivo, contínuo e prevê um crescimento sustentado ao longo dos anos, integrando um número crescente de associados e parceiros — incluindo em zonas do país mais afastadas dos grandes centros, onde também existe necessidade de respostas qualificadas." },
                { q: "Em que valores assenta a BEE.DO?", a: "A BEE.DO baseia-se em 7 pilares: Solidariedade, Transparência, Honorabilidade, Autonomia funcional, Não concorrência, Honestidade e Responsabilidade social. Estes valores constituem o código de conduta que rege todas as relações entre parceiros e clientes." }
            ]
        },
        {
            title: "Modelo de Funcionamento",
            items: [
                { q: "Como funciona a BEE.DO na prática?", a: "A BEE.DO assume a forma de sociedade de mediação — na classe de Corretor — que agrega num único portfólio as carteiras de todos os mediadores associados e parceiros, sem obrigação de exclusividade. Esta agregação coloca a rede num plano de relevância perante as seguradoras, aumentando a qualidade das relações e melhorando as condições de trabalho e de operação para todos." },
                { q: "A BEE.DO é um franchising?", a: "Não. A BEE.DO é um modelo colaborativo, não um franchising. Os associados não perdem a sua identidade comercial, a sua carteira de clientes, nem a sua autonomia de gestão. A rede funciona como uma alavanca estratégica — não como uma estrutura que absorve ou substitui o parceiro." },
                { q: "A BEE.DO exige exclusividade?", a: "Não existe obrigação de exclusividade. A adesão é feita sem essa condicionante, embora a rede valorize o alinhamento estratégico e o compromisso genuíno dos seus parceiros." },
                { q: "A BEE.DO apenas distribui seguros?", a: "Não. A BEE.DO oferece uma abordagem consultiva completa: diagnóstico de risco, estruturação de programas de seguros, apoio na gestão de sinistros, revisão periódica de carteiras e consultoria técnica em garantias e contratos." },
                { q: "O que distingue a BEE.DO de outras redes ou estruturas?", a: "O modelo colaborativo (não impositivo), o foco na rentabilidade e crescimento do parceiro, a estrutura técnica de suporte real, o acesso a soluções diferenciadas e produtos exclusivos, a especialização em ramos complexos (caução, D&O, ciber-risco) e a preservação total da autonomia. A BEE.DO não centraliza poder — distribui capacidade." }
            ]
        },
        {
            title: "Adesão",
            items: [
                { q: "Como me torno associado da BEE.DO?", a: "A adesão materializa-se pela subscrição de capital social da BEE.DO – Insurance Group, em condições iguais para todos os associados, calculadas em função da carteira a agregar. Os mediadores tornam-se accionistas da BEE.DO sem custos de entrada, mediante a celebração de um contrato de vinculação em regime de agenciamento, em conformidade com as normas legais em vigor no sector." },
                { q: "Quem pode tornar-se associado ou parceiro?", a: "A BEE.DO é adequada para: mediadores de seguros (individuais ou sociedades), corretores com carteira activa, estruturas de mediação em fase de crescimento, novos mediadores com ambição e estrutura, e profissionais que pretendam aceder a ramos técnicos e a maior capacidade negocial. A rede prevê ainda uma rede de partners para subagentes ou profissionais que não pretendam integrar o quadro accionista." },
                { q: "Posso sair da BEE.DO?", a: "Sim. Os associados podem sair a qualquer momento, mediante comunicação formal nos termos previstos na lei, sem qualquer cláusula indemnizatória de parte a parte. A saída implica o fim do acesso às condições garantidas pela condição de associado." },
                { q: "Existe algum custo de entrada para aderir?", a: "Não existem custos de entrada. Os mediadores tornam-se accionistas da BEE.DO através da subscrição de capital social calculada em função da carteira a agregar, sem necessidade de pagamento de qualquer taxa inicial." }
            ]
        },
        {
            title: "Remuneração e Benefícios",
            items: [
                { q: "Como sou remunerado enquanto associado?", a: "A BEE.DO entrega aos seus associados a totalidade das remunerações nas condições negociadas com as seguradoras, incluindo as over's contratualizadas pela rede — o que representa um acréscimo de rendimento potencial para todos os parceiros." },
                { q: "Quais os benefícios concretos de ser associado?", a: "Integração num operador de grande dimensão, pertença a uma equipa experiente e motivada, melhoria potencial das margens comerciais, maior capacidade de defesa e retenção de carteiras, acesso a todo o mercado segurador, alargamento da base de produtos e riscos, acesso a produtos exclusivos e ao canal de venda digital, possibilidade de autonomia na emissão, e apoio ao estabelecimento de parcerias." },
                { q: "A que serviços tenho acesso enquanto associado?", a: "Os associados têm acesso a: sistema de gestão integrada (CRM) com acesso em tempo real à carteira, apoio à venda e informação comercial permanente, apoio em contratação pública, apoio à subscrição especializada, serviços de cross-selling, formação obrigatória programada, evento anual de formação, serviços jurídicos e de compliance, e participação no Conselho Estratégico da empresa. Estes serviços estão sujeitos a um fee calculado em função do volume de negócios." },
                { q: "A BEE.DO tem produtos próprios para os associados?", a: "Sim. Está em fase de construção um portfólio de produtos próprios, disponíveis para todos os associados e partners em condições vantajosas de preço e remuneração — como forma de potenciar os negócios individuais e reforçar a posição na rede." }
            ]
        },
        {
            title: "Produtos e Ramos",
            items: [
                { q: "Em que ramos de seguros actua a BEE.DO?", a: "A rede actua em todos os ramos: Seguros Empresariais (RC, Multirriscos Empresarial, Acidentes de Trabalho, Frota Automóvel, Saúde Empresarial, Ciber-risco, D&O, Caução e Garantias Financeiras), Seguros Particulares (Automóvel, Habitação, Vida, Saúde, Acidentes Pessoais, Protecção de Crédito) e Seguros Técnicos e Especiais (Caução, Garantias Contratuais, Responsabilidades Técnicas, Seguros Financeiros)." },
                { q: "A BEE.DO tem alguma especialização técnica?", a: "Sim. Embora actue de forma transversal em todos os ramos, a BEE.DO possui know-how diferenciado em seguros de caução e garantias financeiras, oferecendo: análise técnica especializada, estruturação de soluções para concursos públicos e apoio a empresas com contratos que exigem garantias." },
                { q: "Manterei liberdade comercial após aderir?", a: "Sim. O parceiro mantém liberdade comercial total, com apoio técnico disponível sempre que necessário. A BEE.DO não impõe a venda de produtos específicos nem condiciona as relações comerciais existentes do parceiro." }
            ]
        },
        {
            title: "Contacto",
            items: [
                { q: "Como posso marcar uma reunião com a equipa BEE.DO?", a: (<span>Para marcar uma conversa com um dos responsáveis da BEE.DO, envie um email para <strong>parceiros@beedo.pt</strong> ou ligue para <strong>910 484 290</strong>. A nossa equipa terá todo o gosto em apresentar o modelo em detalhe e responder a qualquer questão específica sobre o seu caso.</span>) },
                { q: "O que acontece se tiver dúvidas sobre condições contratuais específicas?", a: (<span>Questões relativas a condições contratuais específicas, preços individuais ou acordos personalizados merecem uma response personalizada. Recomendamos que contacte directamente a equipa BEE.DO através do email <strong>parceiros@beedo.pt</strong> ou pelo telefone <strong>910 484 290</strong>.</span>) }
            ]
        }
    ];

    return (
        <section id="perguntas" className="py-24 bg-slate-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6">Perguntas Mais Frequentes</h2>
                </div>

                <div className="space-y-12">
                    {categories.map((cat, i) => (
                        <div key={i}>
                            <h3 className="text-2xl font-black text-blue-700 mb-6 pb-2 border-b border-slate-200">
                                {cat.title}
                            </h3>
                            <div>
                                {cat.items.map((item, j) => (
                                    <FAQItem key={j} question={item.q} answer={item.a} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const LP5 = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [premium, setPremium] = useState(200000);
    const [avgComm, setAvgComm] = useState(16);
    const [retention, setRetention] = useState(20);
    const [activeTechTab, setActiveTechTab] = useState(0);

    useEffect(() => {
        const handleScroll = () => { setIsScrolled(window.scrollY > 50); };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const techFeatures = [
        { t: "Dashboard em tempo real", d: "Visão completa da carteira com KPIs, alertas e objetivos de desempenho.", i: "pie-chart", img: "/images/dashboard/media__1772399560135.png" },
        { t: "CRM & Gestão de Clientes", d: "Ficha de cliente 360º com histórico de interações e documentos.", i: "users", img: "/images/dashboard/media__1772399560131.png" },
        { t: "Gestão de apólices", d: "Pesquisa rápida de clientes, apólices, recibos e sinistros.", i: "search", img: "/images/dashboard/media__1772399560120.png" },
        { t: "Recibos e Documentos", d: "Emissão e consulta de recibos, avisos e documentação contratual.", i: "file-text", img: "/images/dashboard/media__1772399560111.png" },
        { t: "Análise de Carteira", d: "Distribuição por ramo, produto e principais indicadores de produção.", i: "trending-up", img: "/images/dashboard/media__1772399560148.png" }
    ];

    const grossCommission = premium * (avgComm / 100);
    const traditionalNet = grossCommission * (1 - retention / 100);
    const beedoNet = grossCommission;
    const annualLoss = beedoNet - traditionalNet;

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('de-DE').format(value) + ' €';
    };

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-orange-100 selection:text-orange-600 overflow-x-hidden">
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden text-black/0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-orange-50 rounded-full blur-[100px] opacity-40"></div>
            </div>

            <div className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/LP2/hero-lp2.jpg')" }}>
                <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <img src={isScrolled ? '/logos/logo-color.png' : '/logos/logo-white.png'} alt="BEE.DO Logo" className="h-14 w-auto transition-all duration-300" />
                            </div>
                            <div className="hidden md:flex items-center gap-10">
                                <a href="#problema" className={`text-sm font-bold transition-colors ${isScrolled ? 'text-slate-600 hover:text-blue-600' : 'text-slate-200 hover:text-white'}`}>O Problema</a>
                                <a href="#simulador" className={`text-sm font-bold transition-colors ${isScrolled ? 'text-slate-600 hover:text-blue-600' : 'text-slate-200 hover:text-white'}`}>Simulador</a>
                                <a href="#beneficios" className={`text-sm font-bold transition-colors ${isScrolled ? 'text-slate-600 hover:text-blue-600' : 'text-slate-200 hover:text-white'}`}>Benefícios</a>
                                <a href="#contacto" className={`bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-full text-sm font-bold transition-all transform hover:-translate-y-0.5 shadow-xl ${isScrolled ? 'shadow-orange-200/50' : 'shadow-orange-900/50'}`}>Agendar Conversa</a>
                            </div>
                        </div>
                    </div>
                </nav>

                <section className="relative pt-32 pb-32 z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl py-12">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/40 border border-white/20 text-white backdrop-blur-sm text-xs font-bold mb-8 uppercase tracking-widest">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                                </span>
                                Recrutamento Aberto 2026
                            </div>
                            <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-black text-white leading-[1.05] mb-8 tracking-tight">
                                Fique com <span className="text-orange-500">100%</span> <br />
                                das suas <span className="relative inline-block">
                                    comissões
                                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 358 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 9C118.957 4.46788 239.436 3.26419 355 9" stroke="#F97316" strokeWidth="6" strokeLinecap="round" />
                                    </svg>
                                </span>
                            </h1>
                            <p className="text-xl lg:text-2xl text-white mb-12 leading-relaxed max-w-2xl font-medium drop-shadow-lg">
                                Junte-se à elite da mediação de seguros em Portugal. Autonomia total, ferramentas de topo e o rendimento que você realmente merece.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-5 justify-start">
                                <a href="#simulador" className="w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-2xl shadow-blue-900/50 group">
                                    Calcular ganhos <Icon name="arrow-right" size={20} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                                <a href="#como-funciona" className="w-full sm:w-auto px-10 py-5 bg-white/10 text-white border-2 border-white/40 backdrop-blur-sm rounded-2xl font-bold text-lg transition-all hover:bg-white/20 flex items-center justify-center gap-2">
                                    Como funciona? <Icon name="chevron-right" size={20} />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className="relative z-20 -mt-20 mb-16 max-w-6xl mx-auto px-4">
                <div className="bg-white rounded-[32px] border border-slate-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-8 shadow-3xl">
                    {[
                        { t: "Sem exclusividade", d: "Liberdade de escolha" },
                        { t: "Custo zero entrada", d: "Risco inexistente" },
                        { t: "Saída livre", d: "Sem letras pequenas" },
                        { t: "+30 anos", d: "Solidez comprovada" }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center px-4">
                            <Icon name="check-circle" size={32} className="text-orange-500 mb-3" />
                            <p className="font-bold text-slate-900 text-lg mb-1">{item.t}</p>
                            <p className="text-sm text-slate-500 font-medium">{item.d}</p>
                        </div>
                    ))}
                </div>
            </div>

            <section id="problema" className="py-16 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-5xl lg:text-6xl font-black text-slate-950 mb-6">Se trabalha sozinho, <br /><span className="text-blue-600">está a perder dinheiro.</span></h2>
                        <p className="text-xl text-slate-600">Reconhece estes obstáculos no seu dia-a-dia? O mercado mudou, e as velhas redes não acompanharam.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "Comissões a encolher", desc: "As redes tradicionais ficam com uma fatia cada vez maior das suacas comissões. Trabalha mais, ganha menos.", icon: "trending-down", color: "text-blue-600" },
                            { title: "Pouca oferta", desc: "Limitado a poucas seguradoras, sem acesso a produtos exclusivos ou condições competitivas para os seus clientes.", icon: "globe", color: "text-blue-600" },
                            { title: "Sem ferramentas digitais", desc: "Gestão manual, sem portal de cliente, sem CRM. Perde tempo e clientes para a concorrência digital.", icon: "monitor", color: "text-blue-600" },
                            { title: "Isolamento total", desc: "Sem equipa de suporte, sem formação contínua, sem poder negocial junto das seguradoras principais.", icon: "users", color: "text-blue-600" },
                            { title: "Compliance exaustivo", desc: "Regulação crescente, RGPD, ASF — cumprir sozinho todas as normas é caro e complexo.", icon: "scale", color: "text-blue-600" },
                            { title: "Contratos que prendem", desc: "Franchises com cláusulas de exclusividade, taxas de saída e obrigações que limitam a sua liberdade.", icon: "lock", color: "text-blue-600" }
                        ].map((card, i) => (
                            <div key={i} className="bg-white p-10 rounded-[32px] border border-slate-200 hover:border-blue-300 transition-all group">
                                <div className={`w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all ${card.color}`}>
                                    <Icon name={card.icon} size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-950 mb-4">{card.title}</h3>
                                <p className="text-slate-500 text-sm">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="simulador" className="py-24 relative overflow-hidden bg-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <span className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-3 block">Simulador de Ganhos</span>
                        <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight">Quanto está a perder por <br /><span className="text-blue-600">não ser nosso parceiro?</span></h2>
                        <p className="mt-4 text-slate-600 font-medium">Compare o que ganha hoje numa rede tradicional vs. o que ganharia na BEE.DO. A diferença é o seu lucro real!</p>
                    </div>
                    <div className="max-w-5xl mx-auto bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl border border-slate-100">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="space-y-10">
                                <div>
                                    <div className="flex justify-between items-center mb-4"><label className="text-sm font-bold text-slate-900">Carteira Anual</label><span className="text-blue-500 font-bold">{formatCurrency(premium)}</span></div>
                                    <input type="range" min="10000" max="2000000" step="10000" value={premium} onChange={(e) => setPremium(Number(e.target.value))} className="w-full cursor-pointer" />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-4"><label className="text-sm font-bold text-slate-900">Comissão Média (%)</label><span className="text-blue-500 font-bold">{avgComm}%</span></div>
                                    <input type="range" min="5" max="15" step="1" value={avgComm} onChange={(e) => setAvgComm(Number(e.target.value))} className="w-full cursor-pointer" />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-4"><label className="text-sm font-bold text-slate-900">Retenção Atual (%)</label><span className="text-red-500 font-bold">{retention}%</span></div>
                                    <input type="range" min="5" max="50" step="1" value={retention} onChange={(e) => setRetention(Number(e.target.value))} className="w-full cursor-pointer" />
                                </div>
                            </div>
                            <div className="bg-slate-50 rounded-2xl p-8 text-center border border-slate-100 shadow-inner">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Com a BEE.DO você receberia</p>
                                <p className="text-6xl font-black text-slate-900 tracking-tighter mb-10">{formatCurrency(beedoNet)}</p>
                                <div className="text-5xl md:text-6xl font-black text-blue-600 tracking-tight mb-8">+{formatCurrency(annualLoss)} <span className="text-[0.55em]">EXTRA</span></div>
                                <a href="#contacto" className="mt-6 block w-full py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all">Aproveitar este lucro agora</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="beneficios" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl lg:text-6xl font-black text-slate-950">Tudo o que precisa, <br /><span className="text-blue-600">para focar no que importa.</span></h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
                        {[
                            { t: "100% Comissões + Over's", i: "award", d: "Recebe a totalidade das remunerações negociadas, incluindo over's contratualizados." },
                            { t: "Autonomia Total", i: "zap", d: "Não é franchising. Mantém a sua marca, estrutura comercial e independência financeira." },
                            { t: "Acesso ao Mercado", i: "globe", d: "Seguradoras nacionais e internacionais, produtos exclusivos e condições de força." },
                            { t: "Portal do Parceiro", i: "smartphone", d: "Gestão em tempo real, CRM dedicado e simuladores integrados. Powered by LLUNI." },
                            { t: "Formação Contínua", i: "book-open", d: "Formação obrigatória, eventos anuais e acesso a especialistas em subscrição." },
                            { t: "Jurídico e Compliance", i: "shield-check", d: "Serviços jurídicos e conformidade ASF incluídos. Foque-se apenas em vender." },
                            { t: "Cross-selling Dedicado", i: "pie-chart", d: "Serviços para maximizar o valor de cada cliente na sua carteira atual." },
                            { t: "Rede de Parceiros", i: "layers", d: "Acesso a parceiros e subagentes com total apoio técnico e logístico." },
                            { t: "Conselho Estratégico", i: "users", d: "Participação ativa nas decisões da rede (se acionista) com voz direta." }
                        ].map((b, i) => (
                            <div key={i} className="bg-white p-10 rounded-[32px] border border-slate-200 hover:border-blue-300 transition-all group flex flex-col">
                                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all">
                                    <Icon name={b.i} size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-950 mb-4">{b.t}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{b.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-slate-950 text-white text-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-12">
                    <div className="bg-white/5 p-10 rounded-[40px] border border-white/10">
                        <Icon name="zap" size={32} className="text-blue-400 mb-8 mx-auto" />
                        <h4 className="text-2xl font-black mb-4">Sem lock-in</h4>
                        <p className="text-slate-400 text-sm">Pode sair a qualquer momento, sem penalizações.</p>
                    </div>
                    <div className="bg-white/5 p-10 rounded-[40px] border border-white/10">
                        <Icon name="shield-check" size={32} className="text-orange-400 mb-8 mx-auto" />
                        <h4 className="text-2xl font-black mb-4">Supervisionado ASF</h4>
                        <p className="text-slate-400 text-sm">Atividade regulada e em total conformidade.</p>
                    </div>
                    <div className="bg-white/5 p-10 rounded-[40px] border border-white/10">
                        <Icon name="users" size={32} className="text-white mb-8 mx-auto" />
                        <h4 className="text-2xl font-black mb-4">+30 anos</h4>
                        <p className="text-slate-400 text-sm">Bull, Catarino e NewCall Seguros unidas.</p>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-slate-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center mb-16 px-4">
                        <h2 className="text-5xl lg:text-6xl font-black text-slate-950 mb-6 leading-tight">O seu negócio, <br /><span className="text-blue-600">na palma da mão.</span></h2>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto">Portal do Parceiro integrado with ERP, CRM and simulators — all personalized with your brand.</p>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center gap-24">
                        <div className="lg:flex-[0.8] w-full">
                            <div className="grid sm:grid-cols-2 gap-8">
                                {techFeatures.map((f, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setActiveTechTab(i)}
                                        className={`flex gap-4 p-4 rounded-2xl cursor-pointer transition-all border ${activeTechTab === i ? 'bg-white border-blue-100 shadow-xl scale-105' : 'border-transparent hover:bg-white/50'}`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${activeTechTab === i ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-blue-600'}`}>
                                            <Icon name={f.i} size={20} />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h4 className={`font-bold ${activeTechTab === i ? 'text-slate-900' : 'text-slate-700'}`}>{f.t}</h4>
                                            <p className={`text-xs mt-1 leading-relaxed ${activeTechTab === i ? 'text-slate-500' : 'text-slate-400'}`}>{f.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-12 flex items-center gap-3 py-3 px-6 bg-white rounded-2xl border border-slate-200 w-fit">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Powered by</span>
                                <span className="text-xl font-black text-blue-600 tracking-tighter">LLUNI</span>
                            </div>
                        </div>
                        <div className="lg:flex-[1.2] w-full relative">
                            <div className="bg-white rounded-[40px] shadow-3xl p-4 overflow-hidden">
                                <img
                                    src={techFeatures[activeTechTab].img}
                                    className="w-full aspect-video object-cover rounded-[32px] transition-all duration-500"
                                    alt={techFeatures[activeTechTab].t}
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-6 rounded-3xl shadow-2xl animate-bounce-slow">
                                <Icon name="mouse-pointer-2" size={24} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="como-funciona" className="py-24 bg-blue-600 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[120px] -mr-48 -mt-48"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-[120px] -ml-48 -mb-48"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h2 className="text-5xl lg:text-6xl font-black text-white mb-16 underline decoration-orange-500 decoration-4 underline-offset-8">Junte-se em <span className="text-white">4 passos simples</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
                        {[
                            { n: "01", t: "Fale connosco", d: "Conversa informal para conhecer o seu negócio." },
                            { n: "02", t: "Proposta", d: "Condições calculadas em função da sua carteira." },
                            { n: "03", t: "Integração", d: "Setup do Portal e formação da equipa." },
                            { n: "04", t: "Ganhe mais", d: "Acesso imediato a 100% das comissões." }
                        ].map((step, i) => (
                            <div key={i} className="flex flex-col">
                                <div className="text-7xl md:text-[7rem] leading-none font-black text-blue-50 opacity-90 mb-6">{step.n}</div>
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{step.t}</h3>
                                    <p className="text-blue-50 text-sm leading-relaxed">{step.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="contacto" className="py-24 bg-slate-100 text-center relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-5xl lg:text-6xl font-black text-blue-600 mb-12">Pronto para ficar com 100%?</h2>
                    <div className="max-w-xl mx-auto bg-blue-600 p-8 md:p-12 rounded-[32px] mb-12 shadow-2xl">
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const form = e.target;
                            const btn = form.querySelector('button[type="submit"]');
                            const originalContent = btn.innerHTML;

                            try {
                                btn.innerHTML = 'Op a enviar...';
                                btn.disabled = true;

                                const formData = new FormData(form);
                                const data = {
                                    name: formData.get('Nome'),
                                    email: formData.get('Email'),
                                    phone: formData.get('Telefone'),
                                    notes: formData.get('Empresa'),
                                    status: 'New Lead'
                                };

                                const res = await fetch('https://jmcsmytmkywbzflesicw.supabase.co/rest/v1/leads', {
                                    method: 'POST',
                                    headers: {
                                        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptY3NteXRta3l3YnpmbGVzaWN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2Mzg5NTYsImV4cCI6MjA4ODIxNDk1Nn0.HHr2ru65TI9Sll4t4tlqAH_7rlRpsxFkQfoSvH-6mjo',
                                        'Content-Type': 'application/json',
                                        'Prefer': 'return=minimal'
                                    },
                                    body: JSON.stringify(data)
                                });

                                if (!res.ok) throw new Error('Erro na resposta do servidor');

                                window.location.href = '/obrigado.html';
                            } catch (error) {
                                console.error('Error submitting form:', error);
                                alert('Ocorreu um erro ao enviar o formulário. Por favor, sente novamente mais tarde.');
                                btn.innerHTML = originalContent;
                                btn.disabled = false;
                            }
                        }} className="flex flex-col gap-5 text-left">

                            <div>
                                <label className="text-sm font-bold text-white/90 mb-2 block ml-1">Nome</label>
                                <input type="text" name="Nome" required className="w-full px-5 py-4 rounded-2xl bg-white text-slate-900 border-none outline-none focus:ring-4 focus:ring-orange-500/50 shadow-inner" placeholder="O seu nome completo" />
                            </div>

                            <div>
                                <label className="text-sm font-bold text-white/90 mb-2 block ml-1">Email</label>
                                <input type="email" name="Email" required className="w-full px-5 py-4 rounded-2xl bg-white text-slate-900 border-none outline-none focus:ring-4 focus:ring-orange-500/50 shadow-inner" placeholder="exemplo@email.com" />
                            </div>

                            <div>
                                <label className="text-sm font-bold text-white/90 mb-2 block ml-1">Nome Empresa</label>
                                <input type="text" name="Empresa" required className="w-full px-5 py-4 rounded-2xl bg-white text-slate-900 border-none outline-none focus:ring-4 focus:ring-orange-500/50 shadow-inner" placeholder="Nome da sua empresa ou mediação" />
                            </div>

                            <div>
                                <label className="text-sm font-bold text-white/90 mb-2 block ml-1">Contacto Telefónico</label>
                                <input type="tel" name="Telefone" required className="w-full px-5 py-4 rounded-2xl bg-white text-slate-900 border-none outline-none focus:ring-4 focus:ring-orange-500/50 shadow-inner" placeholder="910 000 000" />
                            </div>

                            <button type="submit" className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white px-8 py-5 rounded-2xl text-xl font-black transition-all transform hover:-translate-y-1 shadow-2xl hover:shadow-orange-500/50 flex justify-center items-center gap-2 group">
                                Agendar conversa gratuita <Icon name="arrow-right" size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                    <div className="flex items-center justify-center gap-3 relative z-10 text-slate-600">
                        <Icon name="phone" size={24} />
                        <span className="font-bold text-2xl">Ou ligue para +351 910 484 290</span>
                    </div>
                </div>
            </section>

            <FAQ />

            <footer className="bg-white py-12 border-t border-slate-100 text-center">
                <p className="text-slate-400 text-xs">© 2025 BEE.DO - Registado na ASF.</p>
            </footer>
        </div>
    );
};

export default LP5;
