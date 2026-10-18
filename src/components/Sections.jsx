import React, { useEffect, useRef } from 'react';
import { HeroWave, TunerVisual, SomnilVisual } from './Visuals';

// Logo mark — minimalist "M" + waveform combination
export function LogoMark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#A5B4FC"/>
          <stop offset="1" stopColor="#67E8F9"/>
        </linearGradient>
      </defs>
      <path d="M3 18 C 5 18 5 8 7.5 8 C 10 8 10 18 12 18 C 14 18 14 6 16.5 6 C 19 6 19 18 21 18"
            stroke="url(#lg)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

export function Nav() {
  return (
    <nav className="nav">
      <div className="nav__inner">
        <a href="#top" className="nav__brand">
          <LogoMark />
          <span>MelSpectrum</span>
          <span style={{ color: 'var(--fg-4)', fontWeight: 400, marginLeft: 4 }}>融谱</span>
        </a>
        <div className="nav__links">
          <a className="nav__link" href="#products">产品</a>
          <a className="nav__link" href="#tech">技术</a>
          <a className="nav__link" href="#team">团队</a>
          <a className="nav__link" href="#contact">联系</a>
        </div>
        <a className="nav__cta" href="mailto:contact@melspectrum.com">合作 →</a>
      </div>
    </nav>
  );
}

export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__bg">
        <HeroWave />
      </div>
      <div className="hero__inner">
        <h1 className="hero__title">
          <span className="grad">让机器<br/>听懂声音。</span>
        </h1>
        <p className="hero__sub">
          融谱智能科技 · 声学（物理）与智能（算法）的深度融合。<br/>
          We turn vibrations into understanding.
        </p>
        <div className="hero__cta">
          <a href="#products" className="btn btn--primary">
            探索产品 <span className="arrow">→</span>
          </a>
          <a href="#team" className="btn btn--ghost">
            了解团队
          </a>
        </div>
      </div>
      <div className="hero__scroll">
        <span>SCROLL</span>
        <span className="line"></span>
      </div>
    </section>
  );
}

export function Strip() {
  const items = [
    '±2 ¢ TUNING ACCURACY',
    'AUC 0.92 · SLEEP STAGE',
    '< 10 ms DETECTION LATENCY',
    'BLE 5.0 · OTA',
    'iOS · watchOS · EMBEDDED',
    'RAILSBACK CURVE · LIVE',
    '16 kHz ACOUSTIC SAMPLING',
    'MEL · STFT · CWT',
    '声学采集 · AI 算法 · BLE 通信',
  ];
  const all = [...items, ...items];

  return (
    <div className="strip" aria-hidden="true">
      <div className="strip__track">
        {all.map((t, i) => (
          <span key={i} className="strip__item">
            <span className="strip__dot"></span>{t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Pillars() {
  return (
    <section className="section section--tight reveal">
      <div className="wrap">
        <div className="stage-head">
          <div className="stage-head__row">
            <div>
              <div className="t-eyebrow" style={{ marginBottom: 16 }}>OUR THESIS · 我们的判断</div>
              <h2 className="t-h2" style={{ maxWidth: 760, margin: 0 }}>
                声音是物理的。<br/>
                理解声音，是芯片、固件、算法<br/>三层一起打穿的问题。
              </h2>
            </div>
            <p className="stage-head__sub" style={{ alignSelf: 'flex-end' }}>
              我们不做 PPT 项目。每一个数字都来自真实的传感器、真实的算法、真实的人。
            </p>
          </div>
        </div>
      </div>
      <div className="pillars">
        <div className="pillar">
          <div className="pillar__num">01 · ACOUSTICS</div>
          <div className="pillar__metric">±2<span className="unit">cents</span></div>
          <div className="pillar__title">物理层精度</div>
          <div className="pillar__desc">
            声学硬件 + 数字信号处理，调律精度逼近人耳分辨极限。
          </div>
        </div>
        <div className="pillar">
          <div className="pillar__num">02 · INTELLIGENCE</div>
          <div className="pillar__metric">0.92<span className="unit">AUC</span></div>
          <div className="pillar__title">睡眠分期算法</div>
          <div className="pillar__desc">
            基于声学信号的睡眠分期，AUC 与多导睡眠图（PSG）金标准相当。
          </div>
        </div>
        <div className="pillar">
          <div className="pillar__num">03 · LATENCY</div>
          <div className="pillar__metric">&lt;10<span className="unit">ms</span></div>
          <div className="pillar__title">实时响应</div>
          <div className="pillar__desc">
            事件检测到反馈端到端延迟，焦虑发作前介入，唤醒动作发生在意识到来之前。
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductTuner() {
  return (
    <section className="section reveal">
      <div className="wrap">
        <div className="stage-head">
          <div className="stage-head__row">
            <div className="t-eyebrow">PRODUCT 01 · HARDWARE</div>
            <span className="t-eyebrow" style={{ color: 'var(--fg-4)' }}>pianotuner.top ↗</span>
          </div>
        </div>
        <article className="product product--tuner">
          <div className="product__inner">
            <div>
              <span className="tag tag--teal">硬件 · HARDWARE</span>
              <h3 className="product__name">Piano&nbsp;Tuner</h3>
              <p className="product__lead">
                把一台专业调律师的耳朵装口袋。
                BLE 5.0 麦克风 + 实时 Railsback 曲线拟合，
                让每一根钢弦回到它应有的频率。
              </p>
              <div className="specs">
                <div>
                  <div className="spec__num">±2<span style={{ fontSize: 12, color: 'var(--fg-3)' }}>¢</span></div>
                  <div className="spec__label">PITCH ACCURACY</div>
                </div>
                <div>
                  <div className="spec__num">88</div>
                  <div className="spec__label">FULL KEY RANGE</div>
                </div>
                <div>
                  <div className="spec__num">BLE 5.0</div>
                  <div className="spec__label">WIRELESS · OTA</div>
                </div>
              </div>
              <div className="product__cta">
                <a href="https://pianotuner.top" target="_blank" rel="noreferrer" className="btn btn--primary btn--sm">
                  访问产品站 <span className="arrow">→</span>
                </a>
                <a href="#tech" className="linkish">了解技术细节</a>
              </div>
            </div>
            <div className="product__visual">
              <TunerVisual />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export function ProductSomnil() {
  return (
    <section className="section reveal" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="stage-head">
          <div className="stage-head__row">
            <div className="t-eyebrow">PRODUCT 02 · ALGORITHM</div>
            <span className="t-eyebrow" style={{ color: 'var(--fg-4)' }}>somnil.top ↗</span>
          </div>
        </div>
        <article className="product product--somnil">
          <div className="product__inner" style={{ gridTemplateColumns: '1fr 1.05fr' }}>
            <div className="product__visual" style={{ order: -1 }}>
              <SomnilVisual />
            </div>
            <div>
              <span className="tag tag--violet">算法 · ALGORITHM</span>
              <h3 className="product__name">Somnil</h3>
              <p className="product__lead">
                在焦虑发作前，把你轻轻唤醒。
                基于睡眠声学信号的实时分期与梦魇检测，
                干预发生在意识到来之前。
              </p>
              <div className="specs">
                <div>
                  <div className="spec__num">0.92</div>
                  <div className="spec__label">SLEEP-STAGE AUC</div>
                </div>
                <div>
                  <div className="spec__num">&lt;10<span style={{ fontSize: 12, color: 'var(--fg-3)' }}>ms</span></div>
                  <div className="spec__label">DETECTION LATENCY</div>
                </div>
                <div>
                  <div className="spec__num">iOS<span style={{ fontSize: 12, color: 'var(--fg-3)' }}>·watchOS</span></div>
                  <div className="spec__label">PLATFORMS</div>
                </div>
              </div>
              <div className="product__cta">
                <a href="https://somnil.top" target="_blank" rel="noreferrer" className="btn btn--primary btn--sm">
                  访问产品站 <span className="arrow">→</span>
                </a>
                <a href="#tech" className="linkish">了解技术细节</a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export function Tech() {
  return (
    <section id="tech" className="section reveal">
      <div className="wrap">
        <div className="stage-head">
          <div className="stage-head__row">
            <div>
              <div className="t-eyebrow" style={{ marginBottom: 16 }}>THE STACK · 技术壁垒</div>
              <h2 className="t-h2" style={{ maxWidth: 720, margin: 0 }}>
                同一种能力，<br/>两种产品形态。
              </h2>
            </div>
            <p className="stage-head__sub" style={{ alignSelf: 'flex-end' }}>
              声学采集 → AI 推理 → 无线交付。
              三层叠在一起，才是「让机器听懂声音」的全部含义。
            </p>
          </div>
        </div>
        <div className="tech-grid">
          <div className="tech">
            <div className="tech__icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="6" y="2" width="8" height="11" rx="4" stroke="#67E8F9" strokeWidth="1.4"/>
                <path d="M3 10 a 7 7 0 0 0 14 0 M10 17 v 1.5" stroke="#67E8F9" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="tech__num">01 · ACQUISITION</div>
            <div className="tech__title">声学采集</div>
            <div className="tech__desc">
              MEMS 麦克风阵列 + 模拟前端低噪声放大，
              在嘈杂家居环境下也能锁定目标频段。
            </div>
            <div className="tech__data">
              500 Hz /noise &lt; 1μV /SNR &gt; 70 dB
            </div>
          </div>
          <div className="tech">
            <div className="tech__icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="2.2" fill="#A5B4FC"/>
                <circle cx="3.5" cy="5" r="1.4" stroke="#A5B4FC" strokeWidth="1.2"/>
                <circle cx="3.5" cy="15" r="1.4" stroke="#A5B4FC" strokeWidth="1.2"/>
                <circle cx="16.5" cy="5" r="1.4" stroke="#A5B4FC" strokeWidth="1.2"/>
                <circle cx="16.5" cy="15" r="1.4" stroke="#A5B4FC" strokeWidth="1.2"/>
                <path d="M5 5.6 L 8 9 M5 14.4 L 8 11 M15 5.6 L 12 9 M15 14.4 L 12 11" stroke="#A5B4FC" strokeWidth="1"/>
              </svg>
            </div>
            <div className="tech__num">02 · INTELLIGENCE</div>
            <div className="tech__title">AI 算法</div>
            <div className="tech__desc">
              Mel 频谱 / STFT / CWT 多尺度时频特征，
              端侧轻量神经网络做事件分类与回归。
            </div>
            <div className="tech__data">
              AUC 0.92 /1.8 M params /ON-DEVICE
            </div>
          </div>
          <div className="tech">
            <div className="tech__icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 14 v 2.5" stroke="#5EEAD4" strokeWidth="1.4" strokeLinecap="round"/>
                <circle cx="10" cy="14" r="0.9" fill="#5EEAD4"/>
                <path d="M5 10 a 7 7 0 0 1 10 0" stroke="#5EEAD4" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
                <path d="M2 7 a 11 11 0 0 1 16 0" stroke="#5EEAD4" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.55"/>
              </svg>
            </div>
            <div className="tech__num">03 · DELIVERY</div>
            <div className="tech__title">BLE 通信</div>
            <div className="tech__desc">
              低功耗蓝牙固件 + 自研 OTA 协议，
              把硬件采集到的特征实时回传到手机或手表。
            </div>
            <div className="tech__data">
              BLE 5.0 /&lt;50 ms /OTA · SECURE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Team() {
  return (
    <section id="team" className="section section--light reveal">
      <div className="wrap">
        <div className="stage-head">
          <div className="stage-head__row">
            <div>
              <div className="t-eyebrow" style={{ marginBottom: 16, color: 'var(--light-fg-2)' }}>THE PEOPLE · 团队</div>
              <h2 className="t-h2" style={{ maxWidth: 760, margin: 0, color: 'var(--light-fg)' }}>
                小团队，<br/>做能打穿物理层的事。
              </h2>
            </div>
            <p className="stage-head__sub" style={{ alignSelf: 'flex-end', color: 'var(--light-fg-2)' }}>
              R + H = 冰雪消融。<br/>
              三三是 Somnil 的起点，调律是 Piano Tuner 的起点。<br/>
              产品都来自真实的人。
            </p>
          </div>
        </div>
        <div className="team-grid">
          <div className="team-card" style={{ background: '#fff', borderColor: 'var(--light-line)' }}>
            <div className="team-avatar" style={{ borderColor: '#B7BBC2', color: '#7B8089', background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(34,211,238,0.06))' }}>
              [PHOTO<br/>PLACEHOLDER]
            </div>
            <div>
              <div className="team-card__role" style={{ color: 'var(--light-fg-2)' }}>FOUNDER · CEO</div>
              <div className="team-card__name" style={{ color: 'var(--light-fg)' }}>覃刘浩然 · Qin Liuhaoran</div>
              <p className="team-card__bio" style={{ color: 'var(--light-fg-2)' }}>
                融谱智能科技创始人。从一台不准的钢琴开始，
                到一段无法入睡的夜晚结束，
                把每一个真实的人的痛点，做成可以工业化的产品。
              </p>
              <div className="team-card__meta" style={{ color: 'var(--light-fg-2)' }}>
                <span>RESEARCH · 声学硬件 / DSP / 嵌入式</span>
                <a href="mailto:contact@melspectrum.com" style={{ color: 'var(--light-fg)', borderColor: 'var(--light-line)' }}>
                  v0id@melspectrum.com
                </a>
              </div>
            </div>
          </div>
          <div className="team-card" style={{ background: '#fff', borderColor: 'var(--light-line)' }}>
            <div className="team-avatar" style={{ borderColor: '#B7BBC2', color: '#7B8089', background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(99,102,241,0.06))' }}>
              [PHOTO<br/>PLACEHOLDER]
            </div>
            <div>
              <div className="team-card__role" style={{ color: 'var(--light-fg-2)' }}>CO-FOUNDER · CTO</div>
              <div className="team-card__name" style={{ color: 'var(--light-fg)' }}>张希瑞 · Zhang Xirui</div>
              <p className="team-card__bio" style={{ color: 'var(--light-fg-2)' }}>
                Piano Tuner 联合创始人，与创始人在科创学院一同启动项目；
                主导算法，把声学信号变成精准的 Railsback 曲线拟合。
              </p>
              <div className="team-card__meta" style={{ color: 'var(--light-fg-2)' }}>
                <span>RESEARCH · 算法 / 信号处理 / AI</span>
                <a href="mailto:contact@melspectrum.com" style={{ color: 'var(--light-fg)', borderColor: 'var(--light-line)' }}>
                  contact@melspectrum.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="section reveal">
      <div className="wrap">
        <div className="stage-head">
          <div className="stage-head__row">
            <div className="t-eyebrow">GET IN TOUCH · 合作</div>
            <span className="t-eyebrow" style={{ color: 'var(--fg-4)' }}>一个邮箱 · 一个人 · 一封回复</span>
          </div>
        </div>
        <div className="contact-block">
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.18em', color: 'var(--fg-3)', textTransform: 'uppercase', marginBottom: 18 }}>
              MAIL
            </div>
            <a href="mailto:contact@melspectrum.com" className="contact-mail">
              v0id@melspectrum.com
            </a>
            <p style={{ color: 'var(--fg-3)', fontSize: 14, marginTop: 18, maxWidth: 380, lineHeight: 1.6 }}>
              不分赛道、不分类型，所有合作请求都汇集到这一个地址，
              由创始人本人回复。慢一点，但认真。
            </p>
          </div>
          <div className="contact-types">
            <div className="contact-types__row">
              <span className="k">投资合作</span>
              <span>种子轮 · 天使轮 · 战略投资</span>
            </div>
            <div className="contact-types__row">
              <span className="k">业务合作</span>
              <span>钢琴厂商 · 调律师 · 睡眠监测平台</span>
            </div>
            <div className="contact-types__row">
              <span className="k">学术交流</span>
              <span>声学信号处理 · 睡眠医学 · 嵌入式 AI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div>© 2026 融谱智能科技 · MELSPECTRUM TECHNOLOGY</div>
        <div style={{ display: 'flex', gap: 28 }}>
          <a href="https://pianotuner.top" target="_blank" rel="noreferrer">PIANOTUNER.TOP</a>
          <a href="https://somnil.top" target="_blank" rel="noreferrer">SOMNIL.TOP</a>
          <a href="mailto:contact@melspectrum.com">CONTACT</a>
        </div>
      </div>
    </footer>
  );
}