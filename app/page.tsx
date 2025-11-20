"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Layout, Smartphone, Zap, Globe, Shield, Play, Check, X, CheckCircle, RefreshCw, Search, Code, Rocket } from 'lucide-react';
import { html } from 'framer-motion/client';

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

const BotaoPrincipal = ({ texto, onClick }: { texto: string, onClick?: () => void }) => (
  <button className="btn-primary" onClick={onClick}>
    <span className="btn-content">
      {texto} <ArrowRight size={18} className="icon-arrow" />
    </span>
  </button>
);

const BotaoSecundario = ({ texto, onClick }: { texto: string, onClick?: () => void }) => (
  <button className="btn-secondary" onClick={onClick}>
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

  const [videoKey, setVideoKey] = useState(0);

  const handleReplay = () => {
    setVideoKey(prev => prev + 1);
  };

    const handleContact = () => {
    const url = `https://api.whatsapp.com/send?phone=5579999666089&text=${encodeURIComponent("Olá, gostaria de saber mais sobre os serviços da CrystalCode.")}`;
    window.open(url, '_blank');
  };

  return (

    <div className="main-wrapper">
      <style dangerouslySetInnerHTML={{ __html: `
        * { box-sizing: border-box; margin: 0; padding: 0; scroll-behavior: smooth; }
        
        body { background-color: #0c1e28; color: white; font-family: 'Inter', sans-serif; overflow-x: hidden; }

        .navbar-container { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; justify-content: center; padding: 24px 16px 0 16px; }
        .navbar { display: flex; align-items: center; justify-content: space-between; width: 100%; max-width: 1024px; padding: 12px 24px; background: rgba(12, 30, 40, 0.8); border: 1px solid rgba(99, 185, 193, 0.2); border-radius: 999px; backdrop-filter: blur(12px); }
        .logo { display: flex; align-items: center; gap: 8px; width: 60px; margin-top: -2px; }
        
        .logo-icon { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; color: white; }
        .menu-desktop { display: none; gap: 32px; list-style: none; font-size: 14px; color: #9ca3af; font-weight: 500; }
        @media (min-width: 768px) { .menu-desktop { display: flex; } }
        .menu-desktop li:hover { color: #63b9c1; cursor: pointer; transition: color 0.2s; }
        .btn-nav { padding: 8px 20px; background: #63b9c1; color: #0c1e28; border: none; border-radius: 99px; font-weight: bold; font-size: 14px; cursor: pointer; transition: background 0.2s; }
        .btn-nav:hover { background: white; }

        .hero-bg-glow { position: fixed; top: 0; left: 50%; transform: translateX(-50%); width: 1000px; height: 600px; background: rgba(99, 185, 193, 0.15); filter: blur(120px); border-radius: 100%; pointer-events: none; z-index: 0; }
        .hero-section { position: relative; z-index: 10; padding: 160px 24px 80px 24px; display: flex; flex-direction: column; align-items: center; text-align: center; max-width: 1024px; margin: 0 auto; }
        h1 { font-size: 42px; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 32px; line-height: 1.1; color: white; }
        @media (min-width: 768px) { h1 { font-size: 72px; } }
        
        .text-gradient { background: linear-gradient(to right, #63b9c1, #ffffff); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .hero-desc { font-size: 18px; color: #9ca3af; max-width: 600px; margin: 0 auto 40px auto; line-height: 1.6; }
        .hero-buttons { display: flex; flex-direction: column; gap: 16px; justify-content: center; margin-bottom: 80px; }
        @media (min-width: 640px) { .hero-buttons { flex-direction: row; } }

        .dashboard-container { position: relative; width: 100%; max-width: 900px; background: #0F0F11; border: 1px solid rgba(99, 185, 193, 0.2); border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); overflow: hidden; display: flex; flex-direction: column; }
        @media (min-width: 768px) { .dashboard-container { height: 550px; } }
        .browser-header { height: 40px; background: rgba(255, 255, 255, 0.03); border-bottom: 1px solid rgba(255, 255, 255, 0.05); display: flex; align-items: center; padding: 0 16px; gap: 8px; flex-shrink: 0; }
        .dot { width: 10px; height: 10px; border-radius: 50%; } .dot-red { background: #ef4444; } .dot-yellow { background: #eab308; } .dot-green { background: #22c55e; }
        .dashboard-content { padding: 20px; display: flex; flex-direction: column; gap: 20px; flex: 1; overflow: hidden; }
        @media (min-width: 768px) { .dashboard-content { display: grid; grid-template-columns: 100%; gap: 24px; padding: 24px; } }
        .col-left { display: flex; flex-direction: column; gap: 16px; height: 100%; min-height: 0; }
        .col-right-mobile { height: 100%; display: flex; flex-direction: column; min-height: 0; }
        .media-box { border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1); overflow: hidden; position: relative; background: #000; flex: 1; display: flex; min-height: 0; }
        .media-full { width: 100%; height: 100%; object-fit: cover; }
        
        .marquee-container { height: 80px; flex-shrink: 0; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.05); background: #0c1e28; position: relative; display: flex; align-items: center; overflow: hidden; }
        .marquee-gradient-left { position: absolute; top: 0; bottom: 0; left: 0; width: 32px; z-index: 20; background: linear-gradient(to right, #0c1e28, transparent); }
        .marquee-gradient-right { position: absolute; top: 0; bottom: 0; right: 0; width: 32px; z-index: 20; background: linear-gradient(to left, #0c1e28, transparent); }
        .marquee-card { width: 180px; padding: 10px; margin-right: 12px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 8px; flex-shrink: 0; display: flex; flex-direction: column; justify-content: center; }

        .comparison-section { padding: 100px 24px; position: relative; z-index: 10; display: flex; justify-content: center; }
        .comp-container { width: 100%; max-width: 1000px; }
        .comp-header-title { text-align: center; font-size: 36px; font-weight: bold; margin-bottom: 60px; }
        .comp-table { display: grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 768px) { .comp-table { gap: 24px; } }
        
        .comp-row { display: grid; grid-template-columns: 1fr; background: #0c1e28; border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; overflow: hidden; transition: border-color 0.3s; }
        @media (min-width: 768px) { .comp-row { grid-template-columns: 1.5fr 1.2fr 1.2fr; align-items: stretch; } }
        .comp-row:hover { border-color: rgba(99, 185, 193, 0.5); }
        .cell { padding: 24px; display: flex; flex-direction: column; justify-content: center; }
        .cell-feature { border-bottom: 1px solid rgba(255,255,255,0.05); }
        @media (min-width: 768px) { .cell-feature { border-bottom: none; border-right: 1px solid rgba(255,255,255,0.05); } }
        .feature-name { font-size: 18px; font-weight: bold; color: white; display: flex; align-items: center; gap: 12px; }
        
        .feature-icon { color: #63b9c1; }
        .cell-others { background: rgba(255,255,255,0.01); color: #9ca3af; font-size: 14px; position: relative; }
        .cell-label { font-size: 10px; text-transform: uppercase; color: #6b7280; margin-bottom: 8px; font-weight: bold; display: block; }
        @media (min-width: 768px) { .cell-label { display: none; } }
        .status-others { display: flex; align-items: center; gap: 8px; opacity: 0.7; }
        .icon-x { color: #ef4444; flex-shrink: 0; }
        
        .cell-us { background: rgba(99, 185, 193, 0.05); position: relative; }
        .status-us { display: flex; align-items: center; gap: 8px; font-weight: bold; color: white; }
        .icon-check { color: #63b9c1; flex-shrink: 0; background: rgba(99, 185, 193, 0.1); border-radius: 50%; padding: 2px; width: 24px; height: 24px; }
        .glow-bar { position: absolute; top: 0; bottom: 0; left: 0; width: 4px; background: #63b9c1; display: none; }
        @media (min-width: 768px) { .glow-bar { display: block; } }
        .table-header { display: none; grid-template-columns: 1.5fr 1.2fr 1.2fr; padding: 0 24px 24px 24px; }
        @media (min-width: 768px) { .table-header { display: grid; } }
        .th-item { font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #6b7280; }
        .th-us { color: #63b9c1; }

        .story-section {
            padding: 100px 24px;
            position: relative;
            z-index: 10;
            display: flex;
            justify-content: center;
        }
        .story-container {
            width: 100%;
            max-width: 1100px;
            display: grid;
            grid-template-columns: 1fr;
            gap: 60px;
            align-items: center;
        }
        @media (min-width: 900px) {
            .story-container { grid-template-columns: 1fr 1fr; }
        }
        
        .story-image-wrapper {
            position: relative;
            height: 400px;
            border-radius: 24px;
            overflow: hidden;
            border: 1px solid rgba(99, 185, 193, 0.2);
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }
        
        .story-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s;
        }
        .story-image-wrapper:hover .story-img { transform: scale(1.05); }

        .story-float-card {
            position: absolute;
            bottom: 30px;
            right: -20px;
            background: rgba(12, 30, 40, 0.9); /* Principal com transparência */
            backdrop-filter: blur(10px);
            padding: 20px;
            border-radius: 16px;
            border: 1px solid rgba(99, 185, 193, 0.3);
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            gap: 16px;
            animation: float 6s ease-in-out infinite;
            z-index: 2;
        }
        @media (max-width: 768px) { .story-float-card { right: 20px; bottom: 20px; } }

        .story-icon-box {
            width: 50px; height: 50px; background: rgba(99, 185, 193, 0.2);
            border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #63b9c1;
        }

        .story-text-col { display: flex; flex-direction: column; gap: 24px; }
        .story-title { font-size: 36px; font-weight: bold; line-height: 1.2; color: white; }
        .story-desc { font-size: 16px; color: #9ca3af; line-height: 1.6; }
        
        .story-stats {
            display: flex;
            gap: 40px;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid rgba(255,255,255,0.1);
        }
        .stat-item h4 { font-size: 32px; font-weight: 800; color: white; margin-bottom: 4px; }
        .stat-item p { font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; }

        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }


        .services-section { padding: 128px 24px; position: relative; z-index: 10; }
        .max-w-container { max-width: 1100px; margin: 0 auto; }
        .text-center { text-align: center; margin-bottom: 80px; }
        .grid-bento { display: grid; grid-template-columns: 1fr; gap: 24px; width: 100%; }
        @media (min-width: 768px) { .grid-bento { grid-template-columns: repeat(3, 1fr); } }
        
        .card-servico { position: relative; padding: 32px; border-radius: 24px; background-color: #0c1e28; border: 1px solid rgba(255, 255, 255, 0.05); overflow: hidden; transition: transform 0.3s ease, border-color 0.3s ease; display: flex; flex-direction: column; align-items: flex-start; height: 100%; }
        .card-servico:hover { border-color: rgba(99, 185, 193, 0.5); transform: translateY(-4px); }
        .card-largo { grid-column: span 1; } @media (min-width: 768px) { .card-largo { grid-column: span 2; } }
        .card-glow { position: absolute; top: -20px; right: -20px; width: 150px; height: 150px; background: rgba(99, 185, 193, 0.15); filter: blur(60px); border-radius: 50%; pointer-events: none; }
        .card-content-wrapper { position: relative; z-index: 10; }
        .card-icon-box { display: inline-flex; padding: 12px; border-radius: 12px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: #63b9c1; margin-bottom: 24px; }
        .card-title { font-size: 20px; font-weight: 700; margin-bottom: 12px; color: white; }
        .card-desc { color: #9ca3af; font-size: 15px; line-height: 1.6; }

        .process-section { padding: 80px 24px; background: linear-gradient(to bottom, #0c1e28, #08141b); border-top: 1px solid rgba(255,255,255,0.05); position: relative; z-index: 10; }
        .process-grid { display: grid; grid-template-columns: 1fr; gap: 32px; margin-top: 60px; }
        @media (min-width: 768px) { .process-grid { grid-template-columns: repeat(3, 1fr); } }
        .process-card { background: #0c1e28; border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; padding: 32px; position: relative; overflow: hidden; transition: all 0.3s; }
        .process-card:hover { border-color: rgba(99, 185, 193, 0.5); transform: translateY(-5px); }
        .process-number { font-size: 48px; font-weight: 800; color: rgba(255,255,255,0.05); position: absolute; top: 10px; right: 20px; }
        .process-icon { width: 48px; height: 48px; background: rgba(99, 185, 193, 0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #63b9c1; margin-bottom: 24px; }
        .process-title { font-size: 20px; font-weight: bold; margin-bottom: 12px; color: white; }
        .process-desc { color: #9ca3af; line-height: 1.6; font-size: 14px; }

        .badge { display: inline-flex; align-items: center; gap: 8px; padding: 4px 12px; border-radius: 99px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); font-size: 12px; font-weight: 500; color: #63b9c1; margin-bottom: 24px; cursor: pointer; backdrop-filter: blur(4px); }
        .badge-dot { position: relative; display: flex; width: 8px; height: 8px; } .badge-ping { position: absolute; width: 100%; height: 100%; border-radius: 50%; background: #63b9c1; opacity: 0.75; animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite; } .badge-circle { position: relative; width: 8px; height: 8px; border-radius: 50%; background: #63b9c1; }
        
        .btn-primary { position: relative; padding: 16px 32px; background: #63b9c1; color: #0c1e28; font-weight: bold; border: none; border-radius: 99px; overflow: hidden; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; } .btn-primary:hover { transform: scale(1.05); box-shadow: 0 0 40px -10px rgba(99, 185, 193, 0.5); } .btn-content { position: relative; z-index: 10; display: flex; align-items: center; gap: 8px; } .icon-arrow { transition: transform 0.2s; } .btn-primary:hover .icon-arrow { transform: translateX(4px); }
        .btn-secondary { padding: 16px 32px; background: rgba(255, 255, 255, 0.05); color: white; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 99px; font-weight: 500; display: flex; align-items: center; gap: 8px; cursor: pointer; backdrop-filter: blur(4px); transition: background 0.2s; } .btn-secondary:hover { background: rgba(255, 255, 255, 0.1); }
        
        .clients-section { padding: 40px 0; border-top: 1px solid rgba(255, 255, 255, 0.05); border-bottom: 1px solid rgba(255, 255, 255, 0.05); background: rgba(255, 255, 255, 0.02); text-align: center; } .clients-label { font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 32px; } .logos-wrapper { display: flex; flex-wrap: wrap; justify-content: center; gap: 48px; opacity: 0.5; filter: grayscale(100%); padding: 0 24px; } .client-logo { font-size: 20px; font-weight: bold; color: white; }
        
        .cta-section { padding: 80px 24px; position: relative; overflow: hidden; } .cta-box { max-width: 900px; margin: 0 auto; padding: 48px; background: linear-gradient(to bottom, #0c1e28, #08141b); border: 1px solid rgba(59, 103, 111, 0.5); border-radius: 24px; text-align: center; position: relative; z-index: 10; } .cta-bg { position: absolute; inset: 0; background: rgba(59, 103, 111, 0.3); transform: skewY(3deg) scale(1.1); transform-origin: bottom left; }
        footer { padding: 32px; text-align: center; color: #4b5563; font-size: 14px; border-top: 1px solid rgba(255, 255, 255, 0.05); margin-top: 40px; }

        .media-box { 
            border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1); 
            overflow: hidden; position: relative; background: #000; 
            flex: 1; display: flex; 
            min-height: 300px; 
        }
        .video-wrapper { width: 100%; height: 100%; position: absolute; top:0; left:0; overflow: hidden; background: #0F0F11; }
        .media-full { width: 100%; height: 100%; object-fit: cover; }

        .scene { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; opacity: 0; pointer-events: none; padding: 0 20px; text-align: center; }
        .subtitles { position: absolute; bottom: 20px; left: 0; right: 0; text-align: center; font-size: 14px; font-weight: 300; color: #fff; text-shadow: 0 2px 4px rgba(0,0,0,0.8); z-index: 100; padding: 0 20px; }
        @media (min-width: 768px) { .subtitles { font-size: 16px; bottom: 30px; } }
        .subtitles span { background: rgba(0,0,0,0.6); padding: 4px 12px; border-radius: 4px; }
        .progress-bar { position: absolute; bottom: 0; left: 0; height: 4px; background: #63b9c1; width: 0%; animation: progress 30s linear forwards; z-index: 200; }
        @keyframes progress { to { width: 100%; } }
        
        .scene-1 { animation: fadeScene 5s linear 0s forwards; }
        .scene-2 { animation: fadeScene 5s linear 5s forwards; }
        .scene-3 { animation: fadeScene 5s linear 10s forwards; }
        .scene-4 { animation: fadeScene 5s linear 15s forwards; }
        .scene-5 { animation: fadeScene 5s linear 20s forwards; }
        .scene-6 { animation: fadeFinalScene 5s linear 25s forwards; }
        @keyframes fadeScene { 0% { opacity: 0; transform: scale(1.1); } 10% { opacity: 1; transform: scale(1); } 90% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(0.95); } }
        @keyframes fadeFinalScene { 0% { opacity: 0; } 10% { opacity: 1; } 100% { opacity: 1; } }
        
        .scene-1 h1 { font-size: 32px; font-weight: 800; background: linear-gradient(to right, #63b9c1, #ffffff); -webkit-background-clip: text; color: transparent; animation: pulseLogo 2s infinite; }
        @media (min-width: 768px) { .scene-1 h1 { font-size: 48px; } }
        .scene-1 .tagline { font-size: 12px; color: #9ca3af; margin-top: 8px; letter-spacing: 2px; text-transform: uppercase; }
        .scene-2 .loading-bar-container { width: 200px; height: 8px; background: #333; border-radius: 5px; margin-bottom: 10px; overflow: hidden; }
        .scene-2 .loading-bar { width: 20%; height: 100%; background: #ef4444; animation: slowLoad 4s ease-in-out infinite; }
        .scene-2 .error-box { border: 1px solid #ef4444; color: #ef4444; padding: 10px; font-family: monospace; font-size: 12px; background: rgba(239, 68, 68, 0.1); border-radius: 8px; }
        .scene-3 .tech-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        .tech-item { width: 60px; height: 60px; background: rgba(99, 185, 193, 0.1); border: 1px solid #63b9c1; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #63b9c1; }
        .scene-4 .speed-circle { width: 100px; height: 100px; border-radius: 50%; border: 6px solid #333; border-top: 6px solid #63b9c1; position: relative; animation: spinSpeed 1s linear infinite; }
        .scene-4 h2 { margin-top: 20px; font-size: 32px; color: #63b9c1; }
        .scene-5 .chat-bubble { background: #1f2937; padding: 12px; border-radius: 12px 12px 12px 0; margin-bottom: 10px; max-width: 90%; font-size: 14px; box-shadow: 0 10px 20px rgba(0,0,0,0.5); transform: translateX(-20px); opacity: 0; animation: chatSlide 0.5s ease forwards 0.5s; }
        
        .scene-5 .chat-bubble.reply { background: #3b676f; color: white; border-radius: 12px 12px 0 12px; align-self: flex-end; margin-left: auto; transform: translateX(20px); animation: chatSlide 0.5s ease forwards 2s; }
        .scene-6 .final-logo { font-size: 32px; font-weight: bold; margin-bottom: 10px; background: linear-gradient(to right, #63b9c1, #ffffff); -webkit-background-clip: text; color: transparent; }
        .scene-6 .cta-btn-vid { padding: 10px 20px; background: white; color: #0c1e28; font-weight: bold; border-radius: 99px; text-transform: uppercase; margin-top: 20px; font-size: 12px; cursor: pointer; }
        
        @keyframes pulseLogo { 0% { transform: scale(1); } 50% { transform: scale(1.05); text-shadow: 0 0 20px rgba(99, 185, 193, 0.5); } 100% { transform: scale(1); } }
        @keyframes slowLoad { 0% { width: 10%; } 50% { width: 40%; } 100% { width: 45%; } }
        @keyframes spinSpeed { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes chatSlide { to { transform: translateX(0); opacity: 1; } }
        #narrator-text::after { content: ""; animation: changeText 30s linear forwards; }
        @keyframes changeText {
            0%, 16% { content: "“Na internet de hoje, cada detalhe faz diferença.”"; }
            17%, 33% { content: "“Muitos negócios sofrem com sites lentos e genéricos.”"; }
            34%, 50% { content: "“A CrystalCode nasceu para mudar isso. Focamos em funcionalidade.”"; }
            51%, 66% { content: "“Acreditamos em soluções simples e bem feitas.”"; }
            67%, 83% { content: "“Transformamos suas ideias em sites que funcionam.”"; }
            84%, 100% { content: "“CrystalCode. Vamos construir algo juntos.”"; }
        }
        .refresh-btn { position: absolute; top: 10px; right: 10px; width: 32px; height: 32px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.1); border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 1000; transition: background 0.2s; }
        .refresh-btn:hover { background: rgba(255,255,255,0.2); }

        .junte-se-section {
            padding: 100px 24px;
            position: relative;
            z-index: 10;
            background: linear-gradient(to bottom, #0c1e28, #08141b);
            border-top: 1px solid rgba(255,255,255,0.05);
        }
        .junte-se-container {
            max-width: 1100px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr;
            gap: 90px;
            align-items: center;
        }
        @media (min-width: 768px) {
            .junte-se-container {
                grid-template-columns: 1fr 1fr;
            }
        }
        .junte-se-image-wrapper {
            position: relative;
            border-radius: 24px;
            overflow: hidden;
            border: 1px solid rgba(99, 185, 193, 0.2);
            box-shadow: 0 20px 50px -10px rgba(99, 185, 193, 0.2);
        }
        .junte-se-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s;
        }
        .junte-se-image-wrapper:hover .junte-se-img { transform: scale(1.05); }
        
        .junte-se-content {
            display: flex;
            flex-direction: column;
            gap: 24px;
            justify-content: center;
        }
        .junte-se-title {
            font-size: 32px;
            font-weight: 800;
            line-height: 1.1;
            color: white;
        }
        @media (min-width: 768px) {
            .junte-se-title { font-size: 48px; }
        }
        .junte-se-subtitle {
            font-size: 18px;
            color: #9ca3af;
            font-weight: 400;
            line-height: 1.6;
        }

        }
      `}} />

      <nav className="navbar-container">
        <div className="navbar">
          <div className="logo">
            <div className="logo-icon">
              <img className='logo' src="/cc.png" alt="" />
            </div>
          </div>
          
          <ul className="menu-desktop">
            {[
              { name: 'Vantagens', id: 'vantagens' },
              { name: 'Sobre',    id: 'sobre' },
              { name: 'Soluções', id: 'solucoes' },
              { name: 'Processos',   id: 'processos' }
            ].map((item) => (
              <li key={item.name}>
                <a 
                  href={`#${item.id}`} 
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {item.name}
                </a>
              </li>
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
            <BotaoPrincipal texto="Começar Projeto" onClick={handleContact} />
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
                        <button className="refresh-btn" onClick={handleReplay} title="Replay Video">
                            <RefreshCw size={14} />
                        </button>
                        <div className="video-wrapper" key={videoKey}>
                            <div className="scene scene-1">
                                <h1>CrystalCode</h1>
                                <div className="tagline">Digital Experience</div>
                            </div>

                            <div className="scene scene-2">
                                <div className="loading-bar-container"><div className="loading-bar"></div></div>
                                <div className="error-box">⚠ Connection Timed Out...</div>
                                <h3 style={{marginTop:'20px', color:'#9ca3af', fontSize: '12px'}}>Carregando...</h3>
                            </div>

                            <div className="scene scene-3">
                                <div className="tech-grid">
                                    <div className="tech-item">&lt;/&gt;</div>
                                    <div className="tech-item">🎨</div>
                                    <div className="tech-item">⚡</div>
                                    <div className="tech-item">📱</div>
                                </div>
                                <h3 style={{marginTop:'30px', fontSize: '14px', fontWeight: 'bold'}}>Identidade & Performance</h3>
                            </div>

                            <div className="scene scene-4">
                                <div className="speed-circle"></div>
                                <h2>100/100</h2>
                                <p style={{color:'#22c55e', marginTop:'10px', fontSize: '12px'}}>PageSpeed Optimized</p>
                            </div>

                            <div className="scene scene-5" style={{alignItems: 'flex-start', padding: '0 40px'}}>
                                <div className="chat-bubble">Preciso de um site que venda mais.</div>
                                <div className="chat-bubble reply">Nós criamos a estratégia perfeita.</div>
                            </div>

                            <div className="scene scene-6">
                                <div className="final-logo">CrystalCode</div>
                                <p style={{ fontSize: '14px' }}>Experiências digitais que fazem sentido.</p>
                                <div className="cta-btn-vid" onClick={handleContact}>Entre em Contato</div>
                            </div>

                            <div className="subtitles">
                                <span id="narrator-text"></span>
                            </div>

                            <div className="progress-bar"></div>
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

      <section id='vantagens' className="comparison-section">
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

        <section className="story-section" id="sobre">
        <div className="story-container">
            <div className="story-image-wrapper">
                <img src="/lindos.png" alt="Equipe CrystalCode" className="story-img" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #000 0%, transparent 50%)' }}/>
            </div>

            <div className="story-text-col">
                <Badge>Sobre a CrystalCode</Badge>
                <h2 className="story-title">Não somos apenas <br/> desenvolvedores.</h2>
                <p className="story-desc">
                  A CrystalCode surgiu com a ideia de fazer diferente no mercado digital. Começamos oferecendo sistemas para lanchonetes e logo percebemos que muitos negócios tinham sites lentos, desatualizados ou todos parecidos entre si. A partir disso, decidimos focar em criar soluções simples, funcionais e bem feitas — sempre com atenção ao que realmente importa para cada cliente.
                </p>
                <p className="story-desc">
                    Hoje, unimos <strong>Design de Ponta</strong> com <strong>Engenharia de Software</strong> para criar experiências digitais que não apenas impressionam visualmente, mas geram credibilidade para os nossos clientes.
                </p>

                <div className="story-stats">
                    <div className="stat-item">
                        <h4>2+</h4>
                        <p>Anos de Experiência</p>
                    </div>
                    <div className="stat-item">
                        <h4>100%</h4>
                        <p>Clientes Satisfeitos</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <section id='solucoes' className="services-section">
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

      <section className="junte-se-section">
        <div className="junte-se-container">
           <div className="junte-se-image-wrapper">
              <img src="/HomemCC.png" alt="Equipe CrystalCode" className="junte-se-img" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #000 0%, transparent 50%)', opacity: 0.5 }}/>
           </div>
           
           <div className="junte-se-content">
              <h2 className="junte-se-title">Vem para a CrystalCode e seja um empreendedor que foca no que importa!</h2>
              <h3 className="junte-se-subtitle">Junte-se a uma empresa que está revolucionando o mercado com o custo-benefício ideal.</h3>
              <div style={{ marginTop: '32px' }}>
                  <BotaoPrincipal texto="Quero fazer parte" onClick={handleContact} />
              </div>
           </div>
        </div>
      </section>

      <section id='processos' className="process-section">
        <div className="max-w-container">
           <div className="text-center">
              <Badge>Metodologia Ágil</Badge>
              <h2 className="section-title" style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Do conceito ao código</h2>
              <p className="section-desc">Nosso processo simplificado para tirar sua ideia do papel.</p>
           </div>
           
           <div className="process-grid">
              <motion.div className="process-card" whileHover={{ y: -5 }}>
                 <span className="process-number">01</span>
                 <div className="process-icon"><Search size={24}/></div>
                 <h3 className="process-title">Discovery & Design</h3>
                 <p className="process-desc">Entendemos seu negócio e criamos protótipos de alta fidelidade focados na experiência do usuário.</p>
              </motion.div>

              <motion.div className="process-card" whileHover={{ y: -5 }}>
                 <span className="process-number">02</span>
                 <div className="process-icon"><Code size={24}/></div>
                 <h3 className="process-title">Desenvolvimento</h3>
                 <p className="process-desc">Codificamos seu projeto usando as melhores tecnologias (Next.js, React) para garantir performance máxima.</p>
              </motion.div>

              <motion.div className="process-card" whileHover={{ y: -5 }}>
                 <span className="process-number">03</span>
                 <div className="process-icon"><Rocket size={24}/></div>
                 <h3 className="process-title">Entrega & Escala</h3>
                 <p className="process-desc">Lançamos seu site otimizado e oferecemos suporte contínuo para sua empresa crescer.</p>
              </motion.div>
           </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-bg" />
        <div className="cta-box">
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '24px', color: 'white' }}>Pronto para escalar?</h2>
            <p style={{ color: '#9ca3af', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px auto' }}>Agende uma reunião estratégica de 15 minutos e descubra como podemos transformar sua presença digital.</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}><BotaoPrincipal texto="Agendar Reunião Agora" onClick={handleContact} /></div>
        </div>
      </section>

      <footer><p>&copy; 2025 CrystalCode Agency. Todos os direitos reservados.</p></footer>
    </div>
  );
}