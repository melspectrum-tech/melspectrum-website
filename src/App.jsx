import React, { useEffect } from 'react';
import { Nav, Hero, Strip, Pillars, ProductTuner, ProductSomnil, Tech, Team, Contact, Footer } from './components/Sections';
import { useTweaks, TweaksPanel, TweakSection, TweakToggle } from './tweaks/TweaksPanel';

const TWEAK_DEFAULTS = {
  showStrip: true,
  showPillars: true,
  lightTeam: true,
  tunerFirst: true,
};

export default function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Reveal-on-scroll
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.04 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [tweaks.showStrip, tweaks.showPillars, tweaks.tunerFirst]);

  // Toggle team section background mode
  useEffect(() => {
    const team = document.getElementById('team');
    if (!team) return;
    if (tweaks.lightTeam) team.classList.add('section--light');
    else team.classList.remove('section--light');
  }, [tweaks.lightTeam]);

  return (
    <>
      <Nav />
      <Hero />
      {tweaks.showStrip && <Strip />}
      {tweaks.showPillars && <Pillars />}
      <section id="products" style={{ paddingTop: 0 }} aria-label="Products">
        {tweaks.tunerFirst ? (
          <>
            <ProductTuner />
            <ProductSomnil />
          </>
        ) : (
          <>
            <ProductSomnil />
            <ProductTuner />
          </>
        )}
      </section>
      <Tech />
      <Team />
      <Contact />
      <Footer />
      <TweaksPanel title="Tweaks">
        <TweakSection label="Sections">
          <TweakToggle label="数据条 Marquee strip" value={tweaks.showStrip} onChange={v => setTweak('showStrip', v)} />
          <TweakToggle label="价值主张 Pillars" value={tweaks.showPillars} onChange={v => setTweak('showPillars', v)} />
          <TweakToggle label="Piano Tuner 在前" value={tweaks.tunerFirst} onChange={v => setTweak('tunerFirst', v)} />
        </TweakSection>
        <TweakSection label="Theme">
          <TweakToggle label="团队区浅色背景" value={tweaks.lightTeam} onChange={v => setTweak('lightTeam', v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}