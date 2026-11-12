import "./_group.css";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Building2,
  Check,
  Compass,
  GraduationCap,
  Globe2,
  Menu,
  MessageCircle,
  Search,
  Sparkles,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const riseIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function Refresh() {
  return (
    <main className="ems-refresh">
      <style>{`
        .ems-refresh {
          --ink: #163d39;
          --ink-deep: #10312e;
          --paper: #f5f4ed;
          --paper-bright: #fbfaf5;
          --leaf: #c9e16a;
          --clay: #df795c;
          --soft: #e6e8dc;
          --muted: #677873;
          background: var(--paper);
          color: var(--ink);
          font-family: var(--font-body), sans-serif;
          overflow: hidden;
          -webkit-font-smoothing: antialiased;
        }
        .ems-refresh * { box-sizing: border-box; }
        .ems-refresh a { color: inherit; text-decoration: none; }
        .ems-refresh a:focus-visible { outline: 3px solid var(--clay); outline-offset: 4px; }
        .ems-refresh button { font: inherit; }
        .ems-shell { width: min(1180px, calc(100% - 64px)); margin-inline: auto; }
        .ems-topbar { position: absolute; z-index: 20; inset: 0 0 auto; padding: 24px 0; }
        .ems-nav { display: flex; align-items: center; justify-content: space-between; }
        .ems-brand { display: inline-flex; align-items: center; gap: 11px; font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 21px; letter-spacing: -.045em; }
        .ems-mark { display: grid; place-items: center; width: 37px; height: 37px; border-radius: 13px 13px 13px 4px; background: var(--leaf); color: var(--ink); }
        .ems-brand small { display: block; color: #7d8b76; font: 500 9px/1.2 var(--font-body), sans-serif; letter-spacing: .16em; text-transform: uppercase; }
        .ems-nav-links { display: flex; align-items: center; gap: 34px; color: #516761; font-size: 13px; font-weight: 600; }
        .ems-nav-links a:not(.ems-nav-cta) { transition: color .2s ease; }
        .ems-nav-links a:not(.ems-nav-cta):hover { color: var(--clay); }
        .ems-nav-cta, .ems-button { display: inline-flex; align-items: center; justify-content: center; gap: 11px; border: 1px solid var(--ink); border-radius: 999px; background: var(--ink); color: var(--paper-bright)!important; padding: 13px 20px; font-size: 13px; font-weight: 700; transition: transform .2s ease, background .2s ease, color .2s ease; }
        .ems-nav-cta:hover, .ems-button:hover { transform: translateY(-2px); background: var(--clay); border-color: var(--clay); }
        .ems-mobile-menu { display:none; border: 0; background: transparent; color: var(--ink); padding: 8px; }
        .ems-hero { position: relative; min-height: 760px; padding: 148px 0 82px; background: var(--paper-bright); }
        .ems-hero::before { position: absolute; content: ""; width: 480px; height: 480px; top: -190px; right: -115px; border: 1px solid #e8e7da; border-radius: 50%; box-shadow: 0 0 0 34px rgba(232,231,218,.24), 0 0 0 72px rgba(232,231,218,.14); }
        .ems-hero-grid { display: grid; grid-template-columns: 1.04fr .96fr; align-items: center; gap: 54px; position: relative; z-index: 1; }
        .ems-kicker { display: inline-flex; align-items: center; gap: 9px; color: #66804a; font-size: 11px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }
        .ems-kicker-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--clay); box-shadow: 0 0 0 5px #f6e5dc; }
        .ems-hero h1 { max-width: 620px; margin: 23px 0 20px; font: 500 clamp(56px, 6.15vw, 82px)/.99 var(--font-display), sans-serif; letter-spacing: -.07em; }
        .ems-hero h1 em { color: #839b4d; font-style: normal; }
        .ems-hero-copy { max-width: 490px; margin: 0; color: #62736d; font-size: 16px; line-height: 1.8; }
        .ems-hero-actions { display:flex; align-items:center; gap: 24px; margin-top: 31px; }
        .ems-button { padding: 16px 22px; }
        .ems-text-link { display:inline-flex; align-items:center; gap:8px; color:var(--ink); font-weight:700; font-size:13px; transition:gap .2s ease; }
        .ems-text-link:hover { gap:13px; color:var(--clay); }
        .ems-hero-note { display:flex; align-items:center; gap:10px; margin-top: 26px; color:#83908a; font-size:11px; }
        .ems-hero-note span { display:grid; place-items:center; width:18px; height:18px; border:1px solid #b8c6a6; border-radius:50%; color:#688246; }
        .ems-art { position:relative; min-height:490px; display:flex; align-items:center; justify-content:center; }
        .ems-orbit { position:absolute; width:410px; height:410px; border:1px solid #dfe2d4; border-radius:50%; }
        .ems-orbit::before, .ems-orbit::after { content:""; position:absolute; border:1px solid #e9eadf; border-radius:50%; inset:25px; }
        .ems-orbit::after { inset:55px; }
        .ems-sun { position:absolute; top:53px; right:46px; width:105px; height:105px; border-radius:50%; background:var(--leaf); }
        .ems-sun::after { content:""; position:absolute; inset:14px; border:1px solid rgba(22,61,57,.24); border-radius:50%; }
        .ems-art-figure { position:relative; width:260px; height:390px; overflow:hidden; border-radius:140px 140px 20px 20px; background:#d8dfca; }
        .ems-art-figure::before { content:""; position:absolute; inset:0; background:linear-gradient(155deg, transparent 35%, rgba(16,49,46,.14)); }
        .ems-window { position:absolute; top:30px; left:31px; right:31px; height:184px; border-radius:110px 110px 0 0; background:linear-gradient(135deg,#c5cfb1,#edf0e5); border:1px solid rgba(22,61,57,.15); }
        .ems-window::before { content:""; position:absolute; top:0; bottom:0; left:50%; border-left:1px solid rgba(22,61,57,.16); }
        .ems-window::after { content:""; position:absolute; top:58%; left:0; right:0; border-top:1px solid rgba(22,61,57,.16); }
        .ems-person { position:absolute; bottom:-8px; left:53px; width:160px; height:216px; }
        .ems-person-head { position:absolute; width:69px; height:80px; border-radius:46% 46% 43% 43%; background:#b86f50; top:10px; left:48px; z-index:2; }
        .ems-person-hair { position:absolute; width:80px; height:57px; top:0; left:42px; background:#263d37; border-radius:50% 50% 35% 30%; z-index:3; transform:rotate(-6deg); }
        .ems-person-body { position:absolute; width:160px; height:148px; top:78px; left:0; border-radius:75px 75px 0 0; background:#e17b60; }
        .ems-book { position:absolute; right:23px; bottom:30px; width:107px; height:68px; transform:rotate(-11deg); background:#f6f2e6; border:1px solid #d7d8c8; border-radius:4px; box-shadow:6px 5px 0 #c7d18d; z-index:4; }
        .ems-book::before { content:""; position:absolute; top:12px; left:12px; right:16px; border-top:1px solid #b8c3a5; box-shadow:0 9px 0 #b8c3a5,0 18px 0 #b8c3a5; }
        .ems-art-label { position:absolute; left:0; bottom:44px; width:185px; padding:17px 18px; background:var(--ink); color:var(--paper-bright); border-radius:4px 16px 16px 16px; box-shadow:0 14px 35px rgba(16,49,46,.15); }
        .ems-art-label span { display:block; color:#bfd278; font-size:9px; letter-spacing:.15em; text-transform:uppercase; }
        .ems-art-label strong { display:block; margin-top:8px; font:500 19px/1.2 var(--font-display),sans-serif; letter-spacing:-.03em; }
        .ems-stamp { position:absolute; right:0; bottom:79px; display:grid; place-items:center; width:72px; height:72px; border:1px solid #b8c6a6; border-radius:50%; color:#6c824f; font:600 10px/1.25 var(--font-body),sans-serif; text-align:center; text-transform:uppercase; letter-spacing:.08em; transform:rotate(10deg); }
        .ems-side-note { position:absolute; top:70px; left:-20px; color:#85927f; font-size:10px; letter-spacing:.16em; text-transform:uppercase; writing-mode:vertical-rl; transform:rotate(180deg); }
        .ems-strip { border-top:1px solid #e6e7dc; border-bottom:1px solid #e6e7dc; background:#f1f1e8; }
        .ems-strip-inner { display:flex; align-items:center; justify-content:space-between; gap:30px; padding:23px 0; }
        .ems-strip-label { color:#77857c; font-size:10px; font-weight:700; letter-spacing:.13em; text-transform:uppercase; }
        .ems-strip-item { display:flex; align-items:center; gap:10px; color:#45635c; font:500 14px var(--font-display),sans-serif; }
        .ems-strip-item svg { color:#98ae58; }
        .ems-section { padding:112px 0; }
        .ems-section-head { display:grid; grid-template-columns:1fr .62fr; gap:65px; align-items:end; margin-bottom:57px; }
        .ems-eyebrow { margin-bottom:15px; color:#83964f; font-size:10px; font-weight:700; letter-spacing:.17em; text-transform:uppercase; }
        .ems-section h2 { max-width:670px; margin:0; font:500 clamp(38px, 4.5vw, 58px)/1.05 var(--font-display),sans-serif; letter-spacing:-.06em; }
        .ems-section-head p { margin:0 0 4px; color:#65766f; font-size:14px; line-height:1.85; }
        .ems-journey { background:var(--paper); }
        .ems-paths { display:grid; grid-template-columns:1.06fr .94fr 1fr; align-items:stretch; gap:15px; }
        .ems-path-card { position:relative; min-height:330px; display:flex; flex-direction:column; padding:28px; overflow:hidden; border:1px solid #e1e4d8; background:var(--paper-bright); transition:transform .28s ease, box-shadow .28s ease; }
        .ems-path-card:hover { transform:translateY(-6px); box-shadow:0 18px 45px rgba(22,61,57,.08); }
        .ems-path-card.primary { background:var(--ink); color:var(--paper-bright); border-color:var(--ink); }
        .ems-path-top { display:flex; align-items:center; justify-content:space-between; }
        .ems-path-num { color:#95a199; font:500 11px var(--font-body),sans-serif; }
        .ems-path-icon { display:grid; place-items:center; width:42px; height:42px; border-radius:50%; color:#6d8049; background:#eaf0d8; }
        .ems-path-card.primary .ems-path-icon { background:#cde274; color:var(--ink); }
        .ems-path-card h3 { margin:40px 0 12px; font:500 27px/1.1 var(--font-display),sans-serif; letter-spacing:-.04em; }
        .ems-path-card p { max-width:290px; margin:0; color:#708079; font-size:13px; line-height:1.75; }
        .ems-path-card.primary p { color:#c0cec5; }
        .ems-card-link { display:flex; align-items:center; justify-content:space-between; margin-top:auto; padding-top:27px; color:#76914b; font-size:12px; font-weight:700; }
        .ems-path-card.primary .ems-card-link { color:var(--leaf); }
        .ems-path-deco { position:absolute; right:-44px; bottom:-64px; width:170px; height:170px; border:1px solid #e1e7d1; border-radius:50%; }
        .ems-path-deco::before,.ems-path-deco::after { content:""; position:absolute; inset:18px; border:1px solid #e1e7d1; border-radius:50%; }
        .ems-path-deco::after { inset:38px; }
        .ems-path-card.primary .ems-path-deco,.ems-path-card.primary .ems-path-deco::before,.ems-path-card.primary .ems-path-deco::after { border-color:rgba(227,238,207,.16); }
        .ems-course { padding:118px 0; background:#e9ecdf; }
        .ems-course-grid { display:grid; grid-template-columns:.88fr 1.12fr; gap:85px; align-items:center; }
        .ems-course-copy h2 { margin:14px 0 20px; font:500 clamp(42px,5vw,62px)/1.01 var(--font-display),sans-serif; letter-spacing:-.065em; }
        .ems-course-copy>p { max-width:440px; color:#64756c; font-size:14px; line-height:1.85; }
        .ems-checklist { list-style:none; padding:0; margin:26px 0 32px; display:grid; gap:14px; color:#46625a; font-size:13px; }
        .ems-checklist li { display:flex; align-items:center; gap:11px; }
        .ems-check { display:grid; place-items:center; width:20px; height:20px; border-radius:50%; background:#d5e39f; color:var(--ink); flex:none; }
        .ems-course-board { position:relative; min-height:470px; padding:34px; border-radius:3px 70px 3px 3px; background:var(--ink); color:var(--paper-bright); overflow:hidden; }
        .ems-course-board::after { content:""; position:absolute; width:310px; height:310px; right:-85px; bottom:-170px; border:1px solid rgba(222,238,191,.2); border-radius:50%; box-shadow:0 0 0 24px rgba(222,238,191,.05),0 0 0 53px rgba(222,238,191,.04); }
        .ems-board-top { position:relative; z-index:1; display:flex; justify-content:space-between; align-items:center; color:#c1d078; font-size:10px; letter-spacing:.15em; text-transform:uppercase; }
        .ems-board-top span:last-child { display:grid; place-items:center; width:33px; height:33px; border:1px solid rgba(255,255,255,.2); border-radius:50%; }
        .ems-search-mock { position:relative; z-index:1; display:flex; align-items:center; gap:12px; margin:34px 0 17px; padding:15px 17px; border:1px solid rgba(255,255,255,.24); color:#c5d0c5; font-size:12px; }
        .ems-course-row { position:relative; z-index:1; display:grid; grid-template-columns:44px 1fr auto; align-items:center; gap:14px; margin-top:10px; padding:15px; background:rgba(245,244,237,.08); border:1px solid rgba(255,255,255,.09); }
        .ems-course-icon { display:grid; place-items:center; width:42px; height:42px; background:#d7e39e; color:var(--ink); }
        .ems-course-row:nth-of-type(4) .ems-course-icon { background:#e8a289; }
        .ems-course-row:nth-of-type(5) .ems-course-icon { background:#c7d6c6; }
        .ems-course-row strong { display:block; font:500 15px var(--font-display),sans-serif; }
        .ems-course-row small { display:block; margin-top:5px; color:#adbbb1; font-size:10px; }
        .ems-course-row>svg { color:#c7d975; }
        .ems-board-foot { position:relative; z-index:1; margin-top:23px; color:#9fb0a4; font-size:10px; letter-spacing:.04em; }
        .ems-partners { padding:116px 0; background:#fbfaf5; }
        .ems-partner-grid { display:grid; grid-template-columns:1fr 1fr; gap:90px; align-items:center; }
        .ems-partner-art { min-height:400px; position:relative; background:#e9e2d4; overflow:hidden; }
        .ems-partner-art::before { content:""; position:absolute; left:-50px; bottom:-120px; width:340px; height:340px; border:1px solid rgba(22,61,57,.18); border-radius:50%; box-shadow:0 0 0 25px rgba(22,61,57,.04),0 0 0 55px rgba(22,61,57,.04); }
        .ems-building { position:absolute; right:55px; bottom:0; width:220px; height:305px; background:#d17b60; border-radius:110px 110px 0 0; }
        .ems-building::before { content:""; position:absolute; top:45px; left:35px; right:35px; height:195px; background:repeating-linear-gradient(90deg,transparent 0 35px,#f0cfb0 35px 39px),repeating-linear-gradient(0deg,transparent 0 42px,#f0cfb0 42px 46px); opacity:.8; }
        .ems-building::after { content:""; position:absolute; left:75px; bottom:0; width:70px; height:95px; border-radius:40px 40px 0 0; background:#a95543; }
        .ems-art-caption { position:absolute; left:24px; top:24px; display:flex; align-items:center; gap:9px; color:#526b5c; font-size:10px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; }
        .ems-art-caption span { display:block; width:6px; height:6px; background:var(--clay); border-radius:50%; }
        .ems-floating-note { position:absolute; left:25px; bottom:30px; max-width:180px; padding:15px; background:var(--paper-bright); color:var(--ink); font:500 16px/1.3 var(--font-display),sans-serif; box-shadow:0 10px 24px rgba(22,61,57,.08); }
        .ems-partner-copy h2 { margin:13px 0 20px; font:500 clamp(40px,4.5vw,57px)/1.04 var(--font-display),sans-serif; letter-spacing:-.065em; }
        .ems-partner-copy>p { max-width:455px; color:#65756e; font-size:14px; line-height:1.85; }
        .ems-rule { height:1px; background:#e4e5da; margin:28px 0; }
        .ems-partner-detail { display:grid; grid-template-columns:42px 1fr; gap:14px; margin-bottom:26px; }
        .ems-partner-detail .ems-path-icon { width:38px; height:38px; }
        .ems-partner-detail strong { display:block; font:500 16px var(--font-display),sans-serif; }
        .ems-partner-detail p { margin:5px 0 0; color:#74827b; font-size:12px; line-height:1.65; }
        .ems-counsellor { padding:108px 0; color:var(--paper-bright); background:#244b43; position:relative; }
        .ems-counsellor::before { content:""; position:absolute; left:-130px; top:-170px; width:440px; height:440px; border:1px solid rgba(230,239,209,.15); border-radius:50%; box-shadow:0 0 0 34px rgba(230,239,209,.035),0 0 0 75px rgba(230,239,209,.025); }
        .ems-counsellor-inner { position:relative; display:grid; grid-template-columns:1fr .7fr; align-items:center; gap:80px; }
        .ems-counsellor .ems-eyebrow { color:#c8da7e; }
        .ems-counsellor h2 { max-width:680px; margin:0 0 18px; font:500 clamp(40px,5vw,62px)/1.04 var(--font-display),sans-serif; letter-spacing:-.06em; }
        .ems-counsellor-copy { max-width:520px; margin:0; color:#c0d0c6; font-size:14px; line-height:1.85; }
        .ems-counsellor .ems-button { color:var(--ink)!important; background:var(--leaf); border-color:var(--leaf); }
        .ems-counsellor .ems-button:hover { color:var(--paper-bright)!important; background:var(--clay); border-color:var(--clay); }
        .ems-steps { display:flex; flex-direction:column; gap:21px; border-left:1px solid rgba(238,243,224,.25); padding:7px 0 7px 25px; }
        .ems-step { display:grid; grid-template-columns:27px 1fr; gap:13px; align-items:start; }
        .ems-step-num { display:grid; place-items:center; width:25px; height:25px; border:1px solid #9eae75; border-radius:50%; color:#d7e796; font-size:10px; }
        .ems-step strong { display:block; font:500 16px var(--font-display),sans-serif; }
        .ems-step span { display:block; margin-top:5px; color:#b7c8be; font-size:11px; line-height:1.55; }
        .ems-start { padding:105px 0; }
        .ems-start-head { text-align:center; max-width:670px; margin:0 auto 52px; }
        .ems-start-head h2 { margin:0 0 15px; font:500 clamp(40px,4.8vw,58px)/1.05 var(--font-display),sans-serif; letter-spacing:-.06em; }
        .ems-start-head p { margin:0; color:#6b7b73; font-size:14px; line-height:1.8; }
        .ems-start-choices { display:grid; grid-template-columns:1fr 1fr; gap:18px; max-width:860px; margin:auto; }
        .ems-start-card { display:flex; align-items:center; gap:17px; padding:24px; border:1px solid #e0e3d7; background:var(--paper-bright); transition:transform .2s ease,border-color .2s ease; }
        .ems-start-card:hover { transform:translateY(-3px); border-color:#b8c779; }
        .ems-start-card .ems-path-icon { flex:none; }
        .ems-start-card strong { display:block; font:500 17px var(--font-display),sans-serif; }
        .ems-start-card span { display:block; margin-top:5px; color:#738078; font-size:11px; }
        .ems-start-card>svg { margin-left:auto; color:#819751; flex:none; }
        .ems-footer { padding:30px 0; border-top:1px solid #e2e4d9; background:#f0f0e8; }
        .ems-footer-inner { display:flex; align-items:center; justify-content:space-between; gap:25px; }
        .ems-footer-brand { display:flex; align-items:center; gap:10px; font:600 16px var(--font-display),sans-serif; }
        .ems-footer-brand .ems-mark { width:29px; height:29px; border-radius:10px 10px 10px 3px; }
        .ems-footer-links { display:flex; gap:25px; color:#66776e; font-size:11px; font-weight:600; }
        .ems-footer-links a:hover { color:var(--clay); }
        .ems-copyright { color:#8a958b; font-size:10px; }
        @media (max-width: 900px) {
          .ems-hero-grid { gap:20px; }
          .ems-art { transform:scale(.9); transform-origin:center; }
          .ems-section-head { gap:35px; }
          .ems-course-grid { gap:40px; }
          .ems-partner-grid { gap:45px; }
          .ems-counsellor-inner { gap:40px; }
        }
        @media (max-width: 700px) {
          .ems-shell { width:min(100% - 38px, 540px); }
          .ems-topbar { padding:17px 0; }
          .ems-nav-links { display:none; }
          .ems-mobile-menu { display:grid; place-items:center; }
          .ems-hero { padding:112px 0 50px; min-height:auto; }
          .ems-hero-grid { grid-template-columns:1fr; gap:20px; }
          .ems-hero h1 { font-size:clamp(51px,14vw,70px); max-width:520px; }
          .ems-hero-copy { font-size:14px; }
          .ems-hero-actions { flex-wrap:wrap; gap:18px; }
          .ems-art { min-height:405px; transform:scale(.82); margin:-22px -35px -42px; }
          .ems-orbit { width:360px; height:360px; }
          .ems-art-figure { width:230px; height:350px; }
          .ems-person { transform:scale(.88); transform-origin:bottom center; left:36px; }
          .ems-strip-inner { flex-wrap:wrap; justify-content:flex-start; gap:17px 27px; }
          .ems-strip-label { width:100%; }
          .ems-strip-item { font-size:12px; }
          .ems-section { padding:76px 0; }
          .ems-section-head { grid-template-columns:1fr; gap:15px; margin-bottom:32px; }
          .ems-section h2 { font-size:43px; }
          .ems-paths { grid-template-columns:1fr; gap:12px; }
          .ems-path-card { min-height:275px; }
          .ems-course { padding:77px 0; }
          .ems-course-grid { grid-template-columns:1fr; gap:38px; }
          .ems-course-board { min-height:425px; padding:23px; }
          .ems-course-row { grid-template-columns:40px 1fr auto; padding:12px; gap:10px; }
          .ems-course-row strong { font-size:13px; }
          .ems-partners { padding:78px 0; }
          .ems-partner-grid { grid-template-columns:1fr; gap:37px; }
          .ems-partner-art { min-height:340px; }
          .ems-building { right:35px; transform:scale(.88); transform-origin:bottom right; }
          .ems-counsellor { padding:76px 0; }
          .ems-counsellor-inner { grid-template-columns:1fr; gap:38px; }
          .ems-counsellor h2 { font-size:45px; }
          .ems-start { padding:76px 0; }
          .ems-start-choices { grid-template-columns:1fr; }
          .ems-start-head { margin-bottom:32px; }
          .ems-footer-inner { flex-wrap:wrap; }
          .ems-copyright { width:100%; order:3; }
          .ems-footer-links { gap:15px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ems-refresh *, .ems-refresh *::before, .ems-refresh *::after { scroll-behavior:auto!important; transition:none!important; animation:none!important; }
        }
      `}</style>

      <header className="ems-topbar">
        <div className="ems-shell ems-nav">
          <a className="ems-brand" href="#top" aria-label="EMS Pro home">
            <span className="ems-mark"><GraduationCap size={20} strokeWidth={2.2} /></span>
            <span>EMS Pro<small>Education, moving forward</small></span>
          </a>
          <nav className="ems-nav-links" aria-label="Main navigation">
            <a href="#pathways">Explore pathways</a>
            <a href="#institutes">For institutes</a>
            <a href="#counselling">Study abroad</a>
            <a className="ems-nav-cta" href="/sign-in">Sign in <ArrowUpRight size={15} /></a>
          </nav>
          <a className="ems-mobile-menu" href="#pathways" aria-label="Explore pathways"><Menu size={23} /></a>
        </div>
      </header>

      <section id="top" className="ems-hero">
        <div className="ems-shell ems-hero-grid">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: .65, ease: [.22, 1, .36, 1] }}>
            <div className="ems-kicker"><span className="ems-kicker-dot" />A clearer way to choose what’s next</div>
            <h1>Your next step should feel <em>possible.</em></h1>
            <p className="ems-hero-copy">Find courses that fit, discover institutes worth exploring, or talk through studying abroad with a counsellor. Start with the decision in front of you.</p>
            <div className="ems-hero-actions">
              <a className="ems-button" href="/sign-up">Explore your options <ArrowRight size={17} /></a>
              <a className="ems-text-link" href="#pathways">See how EMS Pro helps <ArrowDownRight size={16} /></a>
            </div>
            <div className="ems-hero-note"><span><Check size={11} /></span> Browse courses, compare details, and take the next step at your pace.</div>
          </motion.div>
          <motion.div className="ems-art" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .12, ease: [.22, 1, .36, 1] }} aria-label="Illustration of a student reading beside a sunlit window">
            <div className="ems-side-note">A little more direction, every day</div>
            <div className="ems-orbit" />
            <div className="ems-sun" />
            <div className="ems-art-figure">
              <div className="ems-window" />
              <div className="ems-person">
                <div className="ems-person-head" />
                <div className="ems-person-hair" />
                <div className="ems-person-body" />
              </div>
              <div className="ems-book" />
            </div>
            <div className="ems-art-label"><span>Start where you are</span><strong>Build a path that feels like yours.</strong></div>
            <div className="ems-stamp">Learn<br />choose<br />move</div>
          </motion.div>
        </div>
      </section>

      <div className="ems-strip">
        <div className="ems-shell ems-strip-inner">
          <span className="ems-strip-label">One place to move forward</span>
          <span className="ems-strip-item"><BookOpen size={17} /> Courses to explore</span>
          <span className="ems-strip-item"><Building2 size={17} /> Institutes to find</span>
          <span className="ems-strip-item"><Globe2 size={17} /> Counsellors to talk to</span>
        </div>
      </div>

      <section id="pathways" className="ems-section ems-journey">
        <div className="ems-shell">
          <motion.div className="ems-section-head" initial={false} whileInView="visible" viewport={{ once: true, amount: .3 }} variants={riseIn} transition={{ duration: .55 }}>
            <div><div className="ems-eyebrow">Find your starting point</div><h2>Three ways to make your next move.</h2></div>
            <p>Education decisions rarely come in a straight line. Pick the question on your mind today; you can explore the rest when you’re ready.</p>
          </motion.div>
          <div className="ems-paths">
            <motion.article className="ems-path-card primary" whileInView={{ opacity: 1, y: 0 }} initial={false} viewport={{ once: true, amount: .2 }} transition={{ duration: .5 }}>
              <div className="ems-path-top"><span className="ems-path-num">01 / LEARN</span><span className="ems-path-icon"><BookOpen size={20} /></span></div>
              <h3>Find a course<br />that fits.</h3>
              <p>Browse courses, open the details, and find the one that matches what you want to learn next.</p>
              <a className="ems-card-link" href="/sign-up">Explore courses <ArrowRight size={17} /></a><div className="ems-path-deco" />
            </motion.article>
            <motion.article className="ems-path-card" whileInView={{ opacity: 1, y: 0 }} initial={false} viewport={{ once: true, amount: .2 }} transition={{ duration: .5, delay: .08 }}>
              <div className="ems-path-top"><span className="ems-path-num">02 / CONNECT</span><span className="ems-path-icon"><Building2 size={20} /></span></div>
              <h3>Meet the right<br />institute.</h3>
              <p>Find coaching institutes and submit an application when you’re ready to take it further.</p>
              <a className="ems-card-link" href="/sign-up">Find an institute <ArrowRight size={17} /></a><div className="ems-path-deco" />
            </motion.article>
            <motion.article className="ems-path-card" whileInView={{ opacity: 1, y: 0 }} initial={false} viewport={{ once: true, amount: .2 }} transition={{ duration: .5, delay: .16 }}>
              <div className="ems-path-top"><span className="ems-path-num">03 / LOOK OUTWARD</span><span className="ems-path-icon"><Compass size={20} /></span></div>
              <h3>Talk through<br />studying abroad.</h3>
              <p>Explore counsellor support and schedule a consultation about your study-abroad plans.</p>
              <a className="ems-card-link" href="#counselling">Meet a counsellor <ArrowRight size={17} /></a><div className="ems-path-deco" />
            </motion.article>
          </div>
        </div>
      </section>

      <section id="courses" className="ems-course">
        <div className="ems-shell ems-course-grid">
          <motion.div className="ems-course-copy" initial={false} whileInView="visible" viewport={{ once: true, amount: .25 }} variants={fadeUp} transition={{ duration: .6 }}>
            <div className="ems-eyebrow">A better way to begin</div>
            <h2>Curiosity first.<br />Then a course.</h2>
            <p>Explore what’s available before you commit. EMS Pro brings course discovery, course details, and enrollment into one straightforward journey.</p>
            <ul className="ems-checklist">
              <li><span className="ems-check"><Check size={12} /></span>Browse courses in one place</li>
              <li><span className="ems-check"><Check size={12} /></span>Review details before deciding</li>
              <li><span className="ems-check"><Check size={12} /></span>Enroll when you’re ready</li>
            </ul>
            <a className="ems-text-link" href="/sign-up">Start exploring <ArrowRight size={16} /></a>
          </motion.div>
          <motion.div className="ems-course-board" initial={false} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .65 }}>
            <div className="ems-board-top"><span>Make room for what’s next</span><span><Sparkles size={15} /></span></div>
            <div className="ems-search-mock"><Search size={16} /> What would you like to learn?</div>
            <div className="ems-course-row"><span className="ems-course-icon"><BookOpen size={19} /></span><span><strong>Explore a course</strong><small>Start with a subject that interests you</small></span><ArrowUpRight size={17} /></div>
            <div className="ems-course-row"><span className="ems-course-icon"><GraduationCap size={20} /></span><span><strong>Read the details</strong><small>See what a course includes</small></span><ArrowUpRight size={17} /></div>
            <div className="ems-course-row"><span className="ems-course-icon"><Check size={20} /></span><span><strong>Take the next step</strong><small>Enroll when it feels right</small></span><ArrowUpRight size={17} /></div>
            <div className="ems-board-foot">A simple path from looking to learning.</div>
          </motion.div>
        </div>
      </section>

      <section id="institutes" className="ems-partners">
        <div className="ems-shell ems-partner-grid">
          <motion.div className="ems-partner-art" initial={false} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .6 }} aria-label="Illustration of a welcoming learning institute">
            <div className="ems-art-caption"><span /> A place to grow</div><div className="ems-building" /><div className="ems-floating-note">Good learning starts with finding your people.</div>
          </motion.div>
          <motion.div className="ems-partner-copy" initial={false} whileInView="visible" viewport={{ once: true, amount: .25 }} variants={fadeUp} transition={{ duration: .6 }}>
            <div className="ems-eyebrow">For coaching institutes</div>
            <h2>Be easier to find. Easier to reach.</h2>
            <p>EMS Pro gives students a way to discover institutes and submit applications. For institute teams, lead tracking keeps student enquiries in view.</p>
            <div className="ems-rule" />
            <div className="ems-partner-detail"><span className="ems-path-icon"><Search size={18} /></span><div><strong>Help students find you</strong><p>Put your institute in the path of students looking for their next learning opportunity.</p></div></div>
            <div className="ems-partner-detail"><span className="ems-path-icon"><MessageCircle size={18} /></span><div><strong>Keep track of leads</strong><p>Follow up on student interest with lead tracking built for institute teams.</p></div></div>
            <a className="ems-text-link" href="/sign-up">Get started with EMS Pro <ArrowRight size={16} /></a>
          </motion.div>
        </div>
      </section>

      <section id="counselling" className="ems-counsellor">
        <div className="ems-shell ems-counsellor-inner">
          <motion.div initial={false} whileInView="visible" viewport={{ once: true, amount: .2 }} variants={fadeUp} transition={{ duration: .6 }}>
            <div className="ems-eyebrow">For the bigger questions</div>
            <h2>Thinking about studying abroad?</h2>
            <p className="ems-counsellor-copy">You don’t have to have every detail figured out before you talk. Find a counsellor and schedule a consultation to discuss your study-abroad plans.</p>
            <div style={{ marginTop: 29 }}><a className="ems-button" href="/sign-up">Explore counsellor consultations <ArrowRight size={16} /></a></div>
          </motion.div>
          <div className="ems-steps">
            <div className="ems-step"><span className="ems-step-num">1</span><div><strong>Explore counsellors</strong><span>See who’s available to guide your next conversation.</span></div></div>
            <div className="ems-step"><span className="ems-step-num">2</span><div><strong>Choose a time to talk</strong><span>Schedule a consultation that works for you.</span></div></div>
            <div className="ems-step"><span className="ems-step-num">3</span><div><strong>Bring your questions</strong><span>Talk through the choices you’re considering.</span></div></div>
          </div>
        </div>
      </section>

      <section className="ems-start">
        <div className="ems-shell">
          <motion.div className="ems-start-head" initial={false} whileInView="visible" viewport={{ once: true, amount: .3 }} variants={riseIn} transition={{ duration: .55 }}>
            <div className="ems-eyebrow">Your next step starts here</div>
            <h2>Come as a student.<br />Or as an institute.</h2>
            <p>Whether you’re choosing where to learn or helping students find their way, EMS Pro is a place to get started.</p>
          </motion.div>
          <div className="ems-start-choices">
            <a className="ems-start-card" href="/sign-up"><span className="ems-path-icon"><GraduationCap size={20} /></span><span><strong>I’m a student</strong><span>Explore courses, institutes, and counsellors.</span></span><ArrowRight size={18} /></a>
            <a className="ems-start-card" href="/sign-up"><span className="ems-path-icon"><Building2 size={20} /></span><span><strong>I’m with an institute</strong><span>Connect with students and track leads.</span></span><ArrowRight size={18} /></a>
          </div>
        </div>
      </section>

      <footer className="ems-footer">
        <div className="ems-shell ems-footer-inner">
          <a className="ems-footer-brand" href="#top"><span className="ems-mark"><GraduationCap size={16} /></span>EMS Pro</a>
          <nav className="ems-footer-links" aria-label="Footer navigation"><a href="#pathways">Pathways</a><a href="#institutes">Institutes</a><a href="#counselling">Counselling</a><a href="/sign-in">Sign in</a></nav>
          <span className="ems-copyright">Education, moving forward.</span>
        </div>
      </footer>
    </main>
  );
}
