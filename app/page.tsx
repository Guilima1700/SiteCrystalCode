"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Layout, Smartphone, Zap, Globe, Shield, Play, Check, X, CheckCircle } from 'lucide-react';

const IR_WHATSAPP = "https://wa.me/5579999666089";
const MENSAGEM_WHATSAPP = "Olá, gostaria de saber mais sobre os serviços da CrystalCode.";

const DEPOIMENTOS = [
  { nome: "Ana Silva", cargo: "CEO @ Start", texto: "O design mudou o jogo da nossa empresa." },
  { nome: "Marcos B.", cargo: "Marketing", texto: "Velocidade impressionante. Recomendo!" },
  { nome: "TechSolutions", cargo: "Parceiro", texto: "A melhor agência que já contratamos." },
  { nome: "Julia Lima", cargo: "Founder", texto: "Suporte 24h e código muito limpo." },
];

const COMPARATIVO = [
  { feature: "Design e Identidade Visual", outros: "Templates Prontos (Wix/Wordpress)", nos: "100% Personalizado e Exclusivo" },
  { feature: "Performance (PageSpeed)", outros: "Lento (Nota < 50)", nos: "Ultra Rápido (Nota 95-100)" },
  { feature: "Tecnologia", outros: "Plugins Pesados e Vulneráveis", nos: "Next.js & React (Tecnologia de Big Techs)" },
  { feature: "Otimização SEO", outros: "Básico ou Inexistente", nos: "Estrutura Avançada para Google" },
  { feature: "Suporte e Manutenção", outros: "Tickets demorados", nos: "Atendimento Prioritário via WhatsApp" },
];


const Badge = ({ children }: { children: React.ReactNode }) => (
  <div className="badge">
    <span className="badge-dot">
      <span className="badge-ping"></span>
      <span className="badge-circle"></span>
    </span>
    {children}
  </div>
);

const BotaoPrincipal = ({ texto }: { texto: string }) => (
  <button className="btn-primary">
    <span className="btn-content">
      {texto} <ArrowRight size={18} className="icon-arrow" />
    </span>
  </button>
);

const BotaoSecundario = ({ texto }: { texto: string }) => (
  <button className="btn-secondary">
    <Play size={16} fill="currentColor" /> {texto}
  </button>
);

const CartaoServico = ({ titulo, desc, icon: Icon, largo = false }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`card-servico ${largo ? 'card-largo' : ''}`}
  >
    <div className="card-glow" />
    <div className="card-content-wrapper">
      <div className="card-icon-box">
        <Icon size={24} />
      </div>
      <h3 className="card-title">{titulo}</h3>
      <p className="card-desc">{desc}</p>
    </div>
  </motion.div>
);

export default function SiteCrystalCode() {

    const handleContact = () => {
    const url = `https://api.whatsapp.com/send?phone=${5579999666089}&text=${encodeURIComponent(MENSAGEM_WHATSAPP)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="main-wrapper">
      
      <style dangerouslySetInnerHTML={{ __html: `
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background-color: #050505; color: white; font-family: 'Inter', sans-serif; overflow-x: hidden; }

        .navbar-container { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; justify-content: center; padding: 24px 16px 0 16px; }
        .navbar { display: flex; align-items: center; justify-content: space-between; width: 100%; max-width: 1024px; padding: 12px 24px; background: rgba(10, 10, 10, 0.8); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 999px; backdrop-filter: blur(12px); }
        .logo { display: flex; align-items: center; gap: 8px; font-weight: bold; }
        .logo-icon { width: 32px; height: 32px; background: linear-gradient(to top right, #9333ea, #2563eb); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; }
        .menu-desktop { display: none; gap: 32px; list-style: none; font-size: 14px; color: #9ca3af; font-weight: 500; }
        @media (min-width: 768px) { .menu-desktop { display: flex; } }
        .menu-desktop li:hover { color: white; cursor: pointer; transition: color 0.2s; }
        .btn-nav { padding: 8px 20px; background: white; color: black; border: none; border-radius: 99px; font-weight: bold; font-size: 14px; cursor: pointer; transition: background 0.2s; }
        .btn-nav:hover { background: #e5e7eb; }

        .hero-bg-glow { position: fixed; top: 0; left: 50%; transform: translateX(-50%); width: 1000px; height: 600px; background: rgba(107, 33, 168, 0.2); filter: blur(120px); border-radius: 100%; pointer-events: none; z-index: 0; }
        .hero-section { position: relative; z-index: 10; padding: 160px 24px 80px 24px; display: flex; flex-direction: column; align-items: center; text-align: center; max-width: 1024px; margin: 0 auto; }
        h1 { font-size: 42px; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 32px; line-height: 1.1; color: white; }
        @media (min-width: 768px) { h1 { font-size: 72px; } }
        .text-gradient { background: linear-gradient(to right, #c084fc, #f472b6, #ffffff); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .hero-desc { font-size: 18px; color: #9ca3af; max-width: 600px; margin: 0 auto 40px auto; line-height: 1.6; }
        .hero-buttons { display: flex; flex-direction: column; gap: 16px; justify-content: center; margin-bottom: 80px; }
        @media (min-width: 640px) { .hero-buttons { flex-direction: row; } }

        .dashboard-container {
          position: relative;
          width: 100%;
          max-width: 1000px;
          background: #0F0F11;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        
        @media (min-width: 768px) {
           .dashboard-container { height: 550px; } 
        }

        .browser-header {
          height: 40px;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          display: flex; align-items: center; padding: 0 16px; gap: 8px;
          flex-shrink: 0; /* Não encolher */
        }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .dot-red { background: #ef4444; } .dot-yellow { background: #eab308; } .dot-green { background: #22c55e; }

        .dashboard-content {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          flex: 1;
          overflow: hidden;
        }
        
        @media (min-width: 768px) {
          .dashboard-content {
            display: grid;
            grid-template-columns: 100%;
            gap: 24px;
            padding: 24px;
          }
        }

        .col-left {
          display: flex;
          flex-direction: column;
          gap: 16px;
          height: 100%;
          min-height: 0;
        }

        .media-box {
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
          position: relative;
          background: #000;
          flex: 1;
          display: flex;
          min-height: 0;
        }
        .media-full {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .marquee-container {
          height: 80px;
          flex-shrink: 0;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          background: #0a0a0a;
          position: relative;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .marquee-gradient-left { position: absolute; top: 0; bottom: 0; left: 0; width: 32px; z-index: 20; background: linear-gradient(to right, #0a0a0a, transparent); }
        .marquee-gradient-right { position: absolute; top: 0; bottom: 0; right: 0; width: 32px; z-index: 20; background: linear-gradient(to left, #0a0a0a, transparent); }
        
        .marquee-card {
          width: 180px;
          padding: 10px;
          margin-right: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          flex-shrink: 0;
          display: flex; flex-direction: column; justify-content: center;
        }


        .comparison-section { padding: 100px 24px; position: relative; z-index: 10; display: flex; justify-content: center; }
        .comp-container { width: 100%; max-width: 1000px; }
        .comp-header-title { text-align: center; font-size: 36px; font-weight: bold; margin-bottom: 60px; }
        .comp-table { display: grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 768px) { .comp-table { gap: 24px; } }
        .comp-row { display: grid; grid-template-columns: 1fr; background: #0F0F11; border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; overflow: hidden; transition: border-color 0.3s; }
        @media (min-width: 768px) { .comp-row { grid-template-columns: 1.5fr 1.2fr 1.2fr; align-items: stretch; } }
        .comp-row:hover { border-color: rgba(168, 85, 247, 0.3); }
        .cell { padding: 24px; display: flex; flex-direction: column; justify-content: center; }
        .cell-feature { border-bottom: 1px solid rgba(255,255,255,0.05); }
        @media (min-width: 768px) { .cell-feature { border-bottom: none; border-right: 1px solid rgba(255,255,255,0.05); } }
        .feature-name { font-size: 18px; font-weight: bold; color: white; display: flex; align-items: center; gap: 12px; }
        .feature-icon { color: #a855f7; }
        .cell-others { background: rgba(255,255,255,0.01); color: #9ca3af; font-size: 14px; position: relative; }
        .cell-label { font-size: 10px; text-transform: uppercase; color: #6b7280; margin-bottom: 8px; font-weight: bold; display: block; }
        @media (min-width: 768px) { .cell-label { display: none; } }
        .status-others { display: flex; align-items: center; gap: 8px; opacity: 0.7; }
        .icon-x { color: #ef4444; flex-shrink: 0; }
        .cell-us { background: rgba(168, 85, 247, 0.05); position: relative; }
        .status-us { display: flex; align-items: center; gap: 8px; font-weight: bold; color: white; }
        .icon-check { color: #22c55e; flex-shrink: 0; background: rgba(34, 197, 94, 0.1); border-radius: 50%; padding: 2px; width: 24px; height: 24px; }
        .glow-bar { position: absolute; top: 0; bottom: 0; left: 0; width: 4px; background: #a855f7; display: none; }
        @media (min-width: 768px) { .glow-bar { display: block; } }
        .table-header { display: none; grid-template-columns: 1.5fr 1.2fr 1.2fr; padding: 0 24px 24px 24px; }
        @media (min-width: 768px) { .table-header { display: grid; } }
        .th-item { font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #6b7280; }
        .th-us { color: #a855f7; }

        .services-section { padding: 128px 24px; position: relative; z-index: 10; }
        .max-w-container { max-width: 1100px; margin: 0 auto; }
        .text-center { text-align: center; margin-bottom: 80px; }
        .grid-bento { display: grid; grid-template-columns: 1fr; gap: 24px; width: 100%; }
        @media (min-width: 768px) { .grid-bento { grid-template-columns: repeat(3, 1fr); } }
        .card-servico { position: relative; padding: 32px; border-radius: 24px; background-color: #0F0F11; border: 1px solid rgba(255, 255, 255, 0.05); overflow: hidden; transition: transform 0.3s ease, border-color 0.3s ease; display: flex; flex-direction: column; align-items: flex-start; height: 100%; }
        .card-servico:hover { border-color: rgba(168, 85, 247, 0.3); transform: translateY(-4px); }
        .card-largo { grid-column: span 1; } @media (min-width: 768px) { .card-largo { grid-column: span 2; } }
        .card-glow { position: absolute; top: -20px; right: -20px; width: 150px; height: 150px; background: rgba(147, 51, 234, 0.15); filter: blur(60px); border-radius: 50%; pointer-events: none; }
        .card-content-wrapper { position: relative; z-index: 10; }
        .card-icon-box { display: inline-flex; padding: 12px; border-radius: 12px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: #c084fc; margin-bottom: 24px; }
        .card-title { font-size: 20px; font-weight: 700; margin-bottom: 12px; color: white; }
        .card-desc { color: #9ca3af; font-size: 15px; line-height: 1.6; }

        .btn-primary { background: #a855f7; color: white; border: none; padding: 14px 24px; border-radius: 99px; font-size: 16px; font-weight: bold; cursor: pointer; transition: background 0.2s; }
        .btn-primary:hover { background: #9333ea; }
        .btn-content { display: flex; align-items: center; gap: 8px; }
        .icon-arrow { transition: transform 0.2s; }
        .btn-primary:hover .icon-arrow { transform: translateX(4px); }

        .btn-secondary { display: inline-flex; align-items: center; gap: 8px; background: transparent; color: #9ca3af; border: 1px solid #4b5563; padding: 12px 20px; border-radius: 99px; font-size: 14px; cursor: pointer; transition: background 0.2s, border-color 0.2s; }
        .btn-secondary:hover { background: rgba(255, 255, 255, 0.05); border-color: #a855f7; color: white; }

        .badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.05); padding: 6px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; color: #9ca3af; margin-bottom: 16px; }
        .badge-dot { position: relative; width: 10px; height: 10px; }
        .badge-ping { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 50%; background: #0b71f7ff; animation: ping 1.5s infinite; }
        .badge-circle { position: absolute; top: 2px; left: 2px; width: 6px; height: 6px; border-radius: 50%; background: #0b71f7ff; }
        @keyframes ping { 0% { transform: scale(1); opacity: 1; } 75%, 100% { transform: scale(2); opacity: 0; } }

        .clients-section { padding: 40px 0; border-top: 1px solid rgba(255, 255, 255, 0.05); border-bottom: 1px solid rgba(255, 255, 255, 0.05); background: rgba(255, 255, 255, 0.02); text-align: center; } .clients-label { font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 32px; } .logos-wrapper { display: flex; flex-wrap: wrap; justify-content: center; gap: 48px; opacity: 0.5; filter: grayscale(100%); padding: 0 24px; } .client-logo { font-size: 20px; font-weight: bold; color: white; }
        .cta-section { padding: 80px 24px; position: relative; overflow: hidden; } .cta-box { max-width: 900px; margin: 0 auto; padding: 48px; background: linear-gradient(to bottom, #1a1a1a, #000); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; text-align: center; position: relative; z-index: 10; } .cta-bg { position: absolute; inset: 0; background: rgba(88, 28, 135, 0.2); transform: skewY(3deg) scale(1.1); transform-origin: bottom left; }
        footer { padding: 32px; text-align: center; color: #4b5563; font-size: 14px; border-top: 1px solid rgba(255, 255, 255, 0.05); margin-top: 40px; }
      `}} />

      <nav className="navbar-container">
        <div className="navbar">
          <div className="logo">
            <div className="logo-icon">C</div>
            <span>CrystalCode</span>
          </div>
          <ul className="menu-desktop">
            {['Recursos', 'Soluções', 'Preços', 'Sobre'].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <button className="btn-nav" onClick={handleContact}>Entrar em contato</button>
        </div>
      </nav>

      <div className="hero-bg-glow" />

      <section className="hero-section">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Badge>A melhor opção para o seu negócio</Badge>
          <h1>Construímos sites que <br /><span className="text-gradient">convertem visitantes</span></h1>
          <p className="hero-desc">Uma agência focada em performance, design premium e tecnologia de ponta. Não entregamos apenas código, entregamos a evolução da sua marca.</p>
          <div className="hero-buttons">
            <BotaoPrincipal texto="Começar Projeto" />
            <BotaoSecundario texto="Ir para portfólio" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="dashboard-container"
        >
            <div className="browser-header"><div className="dot dot-red"/><div className="dot dot-yellow"/><div className="dot dot-green"/></div>
            
            <div className="dashboard-content">
                <div className="col-left">
                    <div className="media-box">
                        <video autoPlay loop muted playsInline className="media-full" style={{ opacity: 0.6 }}>
                            <source src="/video-placeholder.mp4" type="video/mp4" />
                        </video>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                           <span style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px', fontSize: '10px' }}>VIDEO_PREVIEW.mp4</span>
                        </div>
                    </div>
                    <div className="marquee-container">
                        <div className="marquee-gradient-left" />
                        <div className="marquee-gradient-right" />
                        <motion.div style={{ display: 'flex' }} animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 20 }}>
                            {[...DEPOIMENTOS, ...DEPOIMENTOS].map((item, idx) => (
                                <div key={idx} className="marquee-card">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>{item.nome[0]}</div>
                                        <div><div style={{ fontSize: '10px', fontWeight: 'bold' }}>{item.nome}</div><div style={{ fontSize: '8px', color: '#9ca3af' }}>{item.cargo}</div></div>
                                    </div>
                                    <div style={{ fontSize: '9px', color: '#d1d5db', fontStyle: 'italic' }}>"{item.texto}"</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
      </section>

      <section className="clients-section">
        <p className="clients-label">Empresas que confiam no nosso design</p>
        <div className="logos-wrapper">
           {['Acme Corp', 'AndreaBank', 'BrancaTech', 'dreacars', 'stargusto'].map(logo => (<span key={logo} className="client-logo">{logo}</span>))}
        </div>
      </section>

      <section className="comparison-section">
        <div className="comp-container">
           <h2 className="comp-header-title">Por que escolher a CrystalCode?</h2>
           
           <div className="table-header">
             <div className="th-item">O que entregamos</div>
             <div className="th-item">Outras Agências</div>
             <div className="th-item th-us">CrystalCode</div>
           </div>

           <div className="comp-table">
              {COMPARATIVO.map((item, index) => (
                 <motion.div 
                   key={index} 
                   className="comp-row"
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: index * 0.1 }}
                   viewport={{ once: true }}
                 >
                    <div className="cell cell-feature">
                       <div className="feature-name">
                         <CheckCircle size={18} className="feature-icon"/> {item.feature}
                       </div>
                    </div>
                    <div className="cell cell-others">
                       <span className="cell-label">Outros</span>
                       <div className="status-others">
                          <X size={18} className="icon-x"/> {item.outros}
                       </div>
                    </div>
                    <div className="cell cell-us">
                       <div className="glow-bar"/>
                       <span className="cell-label" style={{ color: '#a855f7' }}>CrystalCode</span>
                       <div className="status-us">
                          <Check size={14} className="icon-check"/> {item.nos}
                       </div>
                    </div>
                 </motion.div>
              ))}
           </div>
        </div>
      </section>

      <section className="services-section">
        <div className="max-w-container">
          <div className="text-center">
            <h2 className="section-title" style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Tudo o que sua empresa precisa</h2>
            <p className="section-desc">Do design à infraestrutura, cuidamos de cada pixel.</p>
          </div>
          <div className="grid-bento">
            <CartaoServico titulo="Design Responsivo" desc="Seu site perfeito em qualquer tela." icon={Smartphone} />
            <CartaoServico titulo="SEO Otimizado" desc="Estrutura de código limpa que o Google ama." icon={Globe} />
            <CartaoServico titulo="Performance" desc="Carregamento instantâneo." icon={Zap} />
            <CartaoServico titulo="Segurança & Escala" desc="Proteção contra DDoS e servidores globais." icon={Shield} largo={true} />
            <CartaoServico titulo="CMS Próprio" desc="Painel administrativo fácil." icon={Layout} />
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-bg" />
        <div className="cta-box">
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '24px', color: 'white' }}>Pronto para escalar?</h2>
            <p style={{ color: '#9ca3af', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px auto' }}>Agende uma reunião estratégica de 15 minutos e descubra como podemos transformar sua presença digital.</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}><BotaoPrincipal texto="Agendar Reunião Agora" /></div>
        </div>
      </section>

      <footer><p>&copy; 2025 CrystalCode. Todos os direitos reservados.</p></footer>
    </div>
  );
}