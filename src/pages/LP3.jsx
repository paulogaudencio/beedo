import React, { useState, useEffect } from 'react';
import {
    ArrowRight,
    CheckCircle2,
    TrendingDown,
    ShieldCheck,
    Smartphone,
    Users,
    Award,
    Zap,
    Lock,
    Globe,
    BookOpen,
    Scale,
    PieChart,
    Briefcase,
    Layers,
    Phone,
    Monitor,
    ChevronRight,
    TrendingUp,
    Search,
    Settings,
    AlertCircle,
    MessageSquare
} from 'lucide-react';

const LP3 = () => {
    // Estado do Simulador
    const [premium, setPremium] = useState(100000);
    const [avgComm, setAvgComm] = useState(18);
    const [retention, setRetention] = useState(20);

    // Cálculos do Simulador
    const grossCommission = premium * (avgComm / 100);
    const traditionalNet = grossCommission * (1 - retention / 100);
    const beedoNet = grossCommission;
    const annualLoss = beedoNet - traditionalNet;

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
    };

    return (
        <div
            className="min-h-screen bg-white font-sans text-slate-900 selection:bg-orange-100 selection:text-orange-600 overflow-x-hidden">
            {/* Decoração de Fundo */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60">
                </div>
                <div
                    className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-orange-50 rounded-full blur-[100px] opacity-40">
                </div>
            </div>

            {/* Header / Navbar */}
            <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-3">
                            <img src="/logos/logo-color.png" alt="BEE.DO Logo" className="h-10 w-auto" />
                        </div>
                        <div className="hidden md:flex items-center gap-10">
                            <a href="#problema" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">O
                                Problema</a>
                            <a href="#simulador"
                                className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Simulador</a>
                            <a href="#beneficios"
                                className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Benefícios</a>
                            <a href="#contacto"
                                className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-full text-sm font-bold transition-all transform hover:-translate-y-0.5 shadow-xl shadow-orange-200">
                                Agendar Conversa
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="relative pt-12 pb-32 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-20">
                    <div className="flex-1 text-center lg:text-left">
                        <div
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold mb-8 uppercase tracking-widest">
                            <span className="relative flex h-2 w-2">
                                <span
                                    className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                            </span>
                            Recrutamento Aberto 2025
                        </div>
                        <h1 className="text-5xl lg:text-8xl font-black text-slate-950 leading-[1.05] mb-8 tracking-tight">
                            Fique com <span className="text-blue-600">100%</span> das suas <span className="relative inline-block">
                                comissões
                                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 358 12" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 9C118.957 4.46788 239.436 3.26419 355 9" stroke="#F97316" strokeWidth="6"
                                        strokeLinecap="round" />
                                </svg>
                            </span>
                        </h1>
                        <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                            Junte-se à elite da mediação de seguros em Portugal. Autonomia total, ferramentas de topo e o rendimento que
                            você realmente merece — sem as taxas escondidas das redes tradicionais.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
                            <a href="#simulador"
                                className="w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-2xl shadow-blue-200 group">
                                Calcular ganhos
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a href="#como-funciona"
                                className="w-full sm:w-auto px-10 py-5 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg transition-all hover:bg-slate-50 flex items-center justify-center gap-2">
                                Como funciona?
                                <ChevronRight size={20} />
                            </a>
                        </div>
                    </div>

                    <div className="flex-1 relative">
                        <div className="relative z-10 w-full max-w-[540px] mx-auto group">
                            <div
                                className="aspect-[4/5] rounded-[48px] overflow-hidden shadow-3xl border-8 border-white relative bg-slate-200">
                                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
                                    alt="Mediador de Seguros Moderno"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    onError={(e) => { e.target.src = "https://via.placeholder.com/800x1000?text=Broker+Image"; }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
                            </div>

                            <div
                                className="absolute -top-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 animate-bounce-slow">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-green-100 rounded-lg text-green-600">
                                        <TrendingUp size={24} />
                                    </div>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Crescimento</span>
                                </div>
                                <p className="text-3xl font-black text-slate-900">+100%</p>
                                <p className="text-xs font-semibold text-slate-500">Rentabilidade Líquida</p>
                            </div>

                            <div
                                className="absolute top-1/2 -left-12 bg-blue-600 text-white p-6 rounded-3xl shadow-2xl shadow-blue-300 transform -translate-y-1/2 animate-float">
                                <div className="flex items-center gap-3 mb-2">
                                    <Users size={24} className="text-blue-200" />
                                    <span className="text-xs font-bold text-blue-100 uppercase tracking-wider">Apoio</span>
                                </div>
                                <p className="text-xl font-bold leading-tight">Apoio Técnico<br />Especializado</p>
                            </div>

                            <div
                                className="absolute -bottom-6 right-12 bg-slate-900 text-white p-6 rounded-3xl shadow-2xl flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                                    <ShieldCheck size={28} />
                                </div>
                                <div>
                                    <p className="text-lg font-bold">100% Autónomo</p>
                                    <p className="text-xs text-slate-400">Liberdade total de gestão</p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 rounded-full blur-[100px] -z-10">
                        </div>
                    </div>
                </div>
            </section>

            {/* PROVA SOCIAL */}
            <div className="relative z-20 -mt-10 mb-24 max-w-6xl mx-auto px-4">
                <div
                    className="bg-white rounded-[32px] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { t: "Sem exclusividade", d: "Liberdade de escolha" },
                        { t: "Custo zero entrada", d: "Risco inexistente" },
                        { t: "Saída livre", d: "Sem letras pequenas" },
                        { t: "+30 anos", d: "Solidez comprovada" }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center">
                            <CheckCircle2 size={24} className="text-orange-500 mb-2" />
                            <p className="font-bold text-slate-900 text-sm">{item.t}</p>
                            <p className="text-xs text-slate-400 font-medium">{item.d}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* SEÇÃO O PROBLEMA */}
            <section id="problema" className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl lg:text-5xl font-black text-slate-950 mb-6">Trabalhar sozinho está a <br /><span
                                className="text-red-500">custar-lhe caro.</span></h2>
                            <p className="text-xl text-slate-600">Reconhece estes obstáculos no seu dia-a-dia? O mercado mudou, e as
                                velhas redes não acompanharam.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Comissões a encolher", desc: "As redes tradicionais ficam com uma fatia cada vez maior das suas comissões. Trabalha mais, ganha menos.", icon:
                                    <TrendingDown className="text-red-500" />
                            },
                            {
                                title: "Pouca oferta de produtos", desc: "Limitado a poucas seguradoras, sem acesso a produtos exclusivos ou condições competitivas.", icon:
                                    <Globe className="text-blue-600" />
                            },
                            {
                                title: "Sem ferramentas digitais", desc: "Gestão manual, sem portal de cliente, sem CRM, sem simuladores. Perde tempo e clientes.", icon:
                                    <Monitor className="text-blue-500" />
                            },
                            {
                                title: "Isolamento profissional", desc: "Sem equipa de suporte, sem formação contínua, sem poder negocial junto das seguradoras.", icon:
                                    <Users className="text-orange-600" />
                            },
                            {
                                title: "Compliance exigente", desc: "Regulação crescente, RGPD, ASF — cumprir sozinho é caro e complexo.",
                                icon:
                                    <Scale className="text-slate-700" />
                            },
                            {
                                title: "Contratos que prendem", desc: "Franchises com cláusulas de exclusividade e taxas de saída que limitam a sua liberdade.", icon:
                                    <Lock className="text-slate-900" />
                            }
                        ].map((card, i) => (
                            <div key={i}
                                className="bg-white p-10 rounded-[32px] border border-slate-100 hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-50 transition-all duration-300 group">
                                <div
                                    className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-50 transition-all">
                                    {card.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-950 mb-4">{card.title}</h3>
                                <p className="text-slate-500 leading-relaxed text-sm">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SIMULADOR MODERNO */}
            <section id="simulador" className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-slate-950 rounded-[64px] p-8 lg:p-20 relative overflow-hidden shadow-3xl">
                        <div className="absolute inset-0 opacity-10" style={{
                            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px'
                        }}></div>

                        <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <h2 className="text-4xl lg:text-5xl font-black text-white mb-8">Quanto está a deixar <br /><span
                                    className="text-orange-500">em cima da mesa?</span></h2>
                                <p className="text-xl text-slate-400 mb-10 leading-relaxed">
                                    Compare o que ganha hoje numa rede tradicional vs. o que ganharia na <strong>BEE.DO</strong>. A diferença
                                    é o seu lucro real.
                                </p>
                                <div className="space-y-6">
                                    <div className="flex gap-4 items-start">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-1">
                                            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                        </div>
                                        <p className="text-slate-300 font-medium">A BEE.DO entrega 100% das remunerações negociadas.</p>
                                    </div>
                                    <div className="flex gap-4 items-start">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-1">
                                            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                        </div>
                                        <p className="text-slate-300 font-medium">Incluímos over's contratualizados nas suas contas.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-8 lg:p-12 rounded-[48px] shadow-2xl">
                                <div className="space-y-10">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Carteira Anual
                                                (Prémios)</label>
                                            <span className="text-2xl font-black text-slate-900">{formatCurrency(premium)}</span>
                                        </div>
                                        <input type="range" min="10000" max="1000000" step="10000" value={premium} onChange={(e) =>
                                            setPremium(Number(e.target.value))}
                                            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Comissão Média
                                                %</label>
                                            <input type="number" value={avgComm} onChange={(e) => setAvgComm(Number(e.target.value))}
                                                className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3 font-bold text-slate-900 focus:ring-2
                  focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Retenção Rede
                                                %</label>
                                            <input type="number" value={retention} onChange={(e) => setRetention(Number(e.target.value))}
                                                className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3 font-bold text-slate-900 focus:ring-2
                  focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-slate-100 space-y-4 text-center">
                                        <p className="text-orange-500 font-black text-sm uppercase tracking-widest">Está a perder por ano:</p>
                                        <p className="text-5xl lg:text-6xl font-black text-slate-950">+ {formatCurrency(annualLoss)}</p>
                                    </div>

                                    <button
                                        className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-100">
                                        Quero Ficar com 100%
                                        <ArrowRight size={22} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BENEFÍCIOS */}
            <section id="beneficios" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <span className="text-blue-600 font-bold text-sm tracking-widest uppercase mb-4 block">Rede BEE.DO</span>
                        <h2 className="text-4xl lg:text-5xl font-black text-slate-950">Tudo o que precisa, <br />nada que não queira.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
                        {[
                            {
                                t: "100% Comissões + Over's", i:
                                    <Award />, d: "Recebe a totalidade das remunerações negociadas, incluindo over's contratualizados."
                            },
                            {
                                t: "Autonomia Total", i:
                                    <Zap />, d: "Não é franchising. Mantém a sua marca, estrutura comercial e independência financeira."
                            },
                            {
                                t: "Acesso ao Mercado", i:
                                    <Globe />, d: "Seguradoras nacionais e internacionais, produtos exclusivos e condições de força."
                            },
                            {
                                t: "Portal do Parceiro", i:
                                    <Smartphone />, d: "Gestão em tempo real, CRM dedicado e simuladores integrados. Powered by LLUNI."
                            },
                            {
                                t: "Formação Contínua", i:
                                    <BookOpen />, d: "Formação obrigatória, eventos anuais e acesso a especialistas em subscrição."
                            },
                            {
                                t: "Jurídico e Compliance", i:
                                    <ShieldCheck />, d: "Serviços jurídicos e conformidade ASF incluídos. Foque-se apenas em vender."
                            },
                            {
                                t: "Cross-selling Dedicado", i:
                                    <PieChart />, d: "Serviços para maximizar o valor de cada cliente na sua carteira atual."
                            },
                            {
                                t: "Rede de Parceiros", i:
                                    <Layers />, d: "Acesso a parceiros e subagentes com total apoio técnico e logístico."
                            },
                            {
                                t: "Conselho Estratégico", i:
                                    <Users />, d: "Participação ativa nas decisões da rede (se acionista) com voz direta."
                            }
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col">
                                <div
                                    className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                    {React.cloneElement(b.i, { size: 28 })}
                                </div>
                                <h3 className="text-xl font-bold text-slate-950 mb-3">{b.t}</h3>
                                <p className="text-slate-500 leading-relaxed text-sm">{b.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TECNOLOGIA - PORTAL DO PARCEIRO */}
            <section className="py-24 bg-slate-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-24">
                        <div className="flex-1 max-w-2xl">
                            <h2 className="text-4xl lg:text-5xl font-black text-slate-950 mb-8 leading-tight">O seu negócio, na palma da
                                mão.</h2>
                            <p className="text-xl text-slate-600 mb-10">Portal do Parceiro integrado with ERP, CRM e simuladores — tudo
                                personalizado with a sua marca.</p>

                            <div className="grid sm:grid-cols-2 gap-8">
                                {[
                                    {
                                        t: "Dashboard em tempo real", d: "Visão completa da carteira with KPIs, alertas e objectivos de desempenho.", i:
                                            <PieChart size={20} />
                                    },
                                    {
                                        t: "Gestão de apólices", d: "Pesquisa rápida de clientes, apólices, recibos e sinistros.", i:
                                            <Search size={20} />
                                    },
                                    {
                                        t: "PWA Multi-dispositivo", d: "Funciona em PC ou smartphone, with possibilidade de instalação.", i:
                                            <Smartphone size={20} />
                                    },
                                    {
                                        t: "Personalização total", d: "O portal assume a identidade da sua marca: logótipo, cores, favicon.", i:
                                            <Settings size={20} />
                                    },
                                    {
                                        t: "Sinistros integrados", d: "Acompanhe processos, submeta documentos e acompanhe a evolução.", i:
                                            <AlertCircle size={20} />
                                    },
                                    {
                                        t: "Pedidos interativos", d: "Formulários dinâmicos with fluxo bidirecional de informação.", i:
                                            <MessageSquare size={20} />
                                    }
                                ].map((f, i) => (
                                    <div key={i} className="flex gap-4 group">
                                        <div
                                            className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                                            {f.i}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-1">{f.t}</h4>
                                            <p className="text-slate-500 text-xs leading-relaxed">{f.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-12 flex items-center gap-3 py-3 px-6 bg-white rounded-2xl border border-slate-200 w-fit">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Powered by</span>
                                <span className="text-xl font-black text-blue-600 tracking-tighter">LLUNI</span>
                            </div>
                        </div>

                        <div className="flex-1 relative">
                            <div className="bg-white rounded-[40px] shadow-3xl border border-slate-100 p-4">
                                <div className="bg-slate-950 rounded-[32px] overflow-hidden aspect-[16/10] relative">
                                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
                                        alt="Mockup Dashboard" className="w-full h-full object-cover opacity-60" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-8 left-8 right-8">
                                        <div className="h-2 w-32 bg-blue-500 rounded-full mb-4"></div>
                                        <div className="h-8 w-48 bg-white/20 backdrop-blur rounded-lg"></div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="absolute -bottom-10 -left-10 w-48 aspect-[9/19] bg-white rounded-[32px] shadow-3xl border-4 border-white overflow-hidden hidden md:block">
                                <div className="bg-slate-50 h-full p-4 flex flex-col gap-4">
                                    <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                                    <div className="h-4 w-3/4 bg-slate-200 rounded"></div>
                                    <div className="h-32 bg-blue-50 rounded-xl border border-blue-100"></div>
                                    <div className="space-y-2">
                                        <div className="h-2 bg-slate-200 rounded"></div>
                                        <div className="h-2 bg-slate-200 rounded"></div>
                                        <div className="h-2 bg-slate-200 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMO FUNCIONA - 4 PASSOS */}
            <section id="como-funciona" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl lg:text-5xl font-black text-slate-950 mb-4">Junte-se em 4 passos simples</h2>
                        <p className="text-xl text-slate-500">Transparência desde o primeiro contacto.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { n: "01", t: "Fale connosco", d: "Uma conversa informal para conhecer o seu negócio e as suas necessidades." },
                            { n: "02", t: "Proposta personalizada", d: "Recebe uma proposta with as condições de adesão calculadas em função da sua carteira." },
                            { n: "03", t: "Integração simples", d: "Assinatura do contrato, setup do Portal do Parceiro e formação da equipa." },
                            { n: "04", t: "Comece a ganhar mais", d: "Acesso imediato a todas as ferramentas, produtos exclusivos e 100% das comissões." }
                        ].map((step, i) => (
                            <div key={i} className="relative group">
                                <div
                                    className="text-8xl font-black text-slate-50 absolute -top-12 -left-4 z-0 group-hover:text-blue-50 transition-colors">
                                    {step.n}</div>
                                <div className="relative z-10 pt-8">
                                    <h3 className="text-xl font-bold text-slate-950 mb-3">{step.t}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">{step.d}</p>
                                </div>
                                {i < 3 && (<div className="hidden lg:block absolute top-1/2 -right-4 translate-x-1/2 z-20 text-slate-200">
                                    <ChevronRight size={32} />
                                </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* GARANTIAS */}
            <section className="py-24 bg-slate-950 text-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[150px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div
                            className="bg-white/5 backdrop-blur-sm p-10 rounded-[40px] border border-white/10 hover:border-white/20 transition-all">
                            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-8 text-blue-400">
                                <Zap size={32} />
                            </div>
                            <h4 className="text-2xl font-black mb-4">Sem lock-in</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">Pode sair a qualquer momento, sem cláusulas indemnizatórias, sem penalizações e with total liberdade de marca.</p>
                        </div>

                        <div
                            className="bg-white/5 backdrop-blur-sm p-10 rounded-[40px] border border-white/10 hover:border-white/20 transition-all">
                            <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-8 text-orange-400">
                                <ShieldCheck size={32} />
                            </div>
                            <h4 className="text-2xl font-black mb-4">Supervisionado ASF</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">Atividade totalmente regulada e em conformidade with todas as normas do setor segurador português.</p>
                        </div>

                        <div
                            className="bg-white/5 backdrop-blur-sm p-10 rounded-[40px] border border-white/10 hover:border-white/20 transition-all">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 text-white">
                                <Users size={32} />
                            </div>
                            <h4 className="text-2xl font-black mb-4">3 Fundadores, +30 anos</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">Bull Insurance, Catarino Seguros e NewCall Seguros — três referências do mercado unidas para mudar as regras.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA FINAL */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        className="bg-gradient-to-br from-blue-600 to-blue-900 rounded-[64px] p-12 lg:p-24 text-center text-white relative overflow-hidden shadow-3xl">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-500 skew-x-12 translate-x-1/2 opacity-10"></div>
                        <h2 className="text-4xl lg:text-7xl font-black mb-8 relative z-10 tracking-tight leading-tight">
                            Pronto para ficar with <br />100% do que é seu?
                        </h2>
                        <h2 className="text-4xl lg:text-7xl font-black mb-8 relative z-10 tracking-tight leading-tight">
                            Pronto para ficar com <br />100% do que é seu?
                        </h2>
                        <p className="text-xl lg:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto relative z-10 leading-relaxed">
                            Agende uma conversa sem compromisso. Descubra quanto pode estar a perder — e como a BEE.DO pode mudar o seu negócio.
                        </p>
                        <div className="flex flex-col items-center gap-8 relative z-10">
                            <button
                                className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-6 rounded-3xl text-2xl font-black transition-all transform hover:scale-105 shadow-3xl flex items-center gap-4 group">
                                Agendar conversa gratuita
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                        <Phone size={18} />
                                    </div>
                                    <span className="font-bold text-lg text-blue-50">+351 210 XXX XXX</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-white py-20 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
                        <div className="max-w-xs">
                            <div className="flex items-center gap-3 mb-6">
                                <img src="/logos/logo-color.png" alt="BEE.DO Logo" className="h-8 w-auto" />
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                A mudar as regras do jogo na mediação de seguros em Portugal. 100% de transparência, 100% para o mediador.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-16">
                            <div className="space-y-4">
                                <h5 className="font-black text-slate-900 text-sm uppercase tracking-widest">Navegação</h5>
                                <ul className="space-y-2 text-slate-500 text-sm font-medium">
                                    <li><a href="#problema" className="hover:text-blue-600 transition-colors">O Problema</a></li>
                                    <li><a href="#simulador" className="hover:text-blue-600 transition-colors">Simulador</a></li>
                                    <li><a href="#beneficios" className="hover:text-blue-600 transition-colors">Benefícios</a></li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h5 className="font-black text-slate-900 text-sm uppercase tracking-widest">Legal</h5>
                                <ul className="space-y-2 text-slate-500 text-sm font-medium">
                                    <li><a href="#" className="hover:text-blue-600 transition-colors">Privacidade</a></li>
                                    <li><a href="#" className="hover:text-blue-600 transition-colors">Termos</a></li>
                                    <li><a href="#" className="hover:text-blue-600 transition-colors">Cookies</a></li>
                                </ul>
                            </div>
                            <div className="space-y-4 hidden lg:block">
                                <h5 className="font-black text-slate-900 text-sm uppercase tracking-widest">Contacto</h5>
                                <p className="text-slate-500 text-sm font-medium">Lisboa, Portugal</p>
                                <p className="text-slate-900 font-bold text-sm">geral@beedo.pt</p>
                            </div>
                        </div>
                    </div>
                    <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-slate-400 text-xs">© 2025 BEE.DO - Todos os direitos reservados. Registado na ASF.</p>
                    </div>
                </div>
            </footer>

            <style dangerouslySetInnerHTML={{
                __html: ` @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% {
  transform: translateY(-10px); } } @keyframes float { 0%, 100% { transform: translateY(-50%) translateX(0); } 50% {
  transform: translateY(-50%) translateX(-10px); } } .animate-bounce-slow { animation: bounce-slow 4s ease-in-out
  infinite; } .animate-float { animation: float 6s ease-in-out infinite; } .shadow-3xl { box-shadow: 0 35px 60px -15px
  rgba(0, 0, 0, 0.1); } `}} />
        </div>
    );
};

export default LP3;
