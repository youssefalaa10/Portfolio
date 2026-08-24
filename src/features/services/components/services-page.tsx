"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";

import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  Cpu,
  Database,
  DotFilled,
  Layout,
  Lightbulb,
  Monitor,
  Shield,
  Sliders,
  Smartphone,
  Terminal,
} from "@/components/ui/icons";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PillButton } from "@/components/ui/pill-button";
import { Shell } from "@/components/ui/shell";
import { SERVICES_VIDEO } from "@/core/config/assets";
import type { Locale } from "@/core/i18n/config";
import type { Dictionary } from "@/core/i18n/dictionaries";
import { SPRING } from "@/core/motion/springs";
import { fadeUp, ONCE_IN_VIEW } from "@/core/motion/variants";
import { useRequestModal } from "@/features/contact/components/request-modal-provider";

type ServicesPageProps = {
  locale: Locale;
  copy: Dictionary["services"];
};

export function ServicesPage({ locale, copy }: ServicesPageProps) {
  const { open } = useRequestModal();
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const typewriterRef = useRef<HTMLSpanElement | null>(null);

  const page = copy.page;

  const particles = useMemo(
    () => [
      { left: "12%", size: 3, duration: "5.5s", delay: "0s" },
      { left: "28%", size: 2, duration: "4.2s", delay: "1.4s" },
      { left: "48%", size: 3.5, duration: "6.1s", delay: "2.1s" },
      { left: "72%", size: 2.5, duration: "4.8s", delay: "0.8s" },
      { left: "88%", size: 3, duration: "5.2s", delay: "3.2s" },
    ],
    [],
  );

  // Parallax on hero video
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (heroVideoRef.current) {
        heroVideoRef.current.style.transform = `translateY(${y * 0.25}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Terminal typewriter
  useEffect(() => {
    const sequences = [
      "flutter build ios --release --tree-shake-icons",
      "next build --turbopack --target=production",
      "test --all-suites --coverage --strict",
      "deploy --environment=cloud-production --ssl=enforced",
    ];
    let sequenceIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let timeout: NodeJS.Timeout | undefined;

    const tick = () => {
      const el = typewriterRef.current;
      if (!el) return;

      const current = sequences[sequenceIndex];

      if (!deleting) {
        characterIndex += 1;
        el.textContent = current.slice(0, characterIndex);
        if (characterIndex >= current.length) {
          deleting = true;
          timeout = setTimeout(tick, 1800);
          return;
        }
        timeout = setTimeout(tick, 70);
      } else {
        characterIndex -= 1;
        el.textContent = current.slice(0, Math.max(characterIndex, 0));
        if (characterIndex <= 0) {
          deleting = false;
          sequenceIndex = (sequenceIndex + 1) % sequences.length;
        }
        timeout = setTimeout(tick, deleting ? 35 : 100);
      }
    };

    timeout = setTimeout(tick, 800);
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
    }
  };

  const getNodeIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Smartphone className="text-2xl text-[#38bdf8]" />;
      case 1:
        return <Monitor className="text-2xl text-[#ffb03a]" />;
      case 2:
        return <Sliders className="text-2xl text-[#00f0ff]" />;
      default:
        return <Database className="text-2xl text-[#cf8047]" />;
    }
  };

  const getArchIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Terminal className="text-2xl text-[#38bdf8]" />;
      case 1:
        return <Lightbulb className="text-2xl text-[#ffb03a]" />;
      case 2:
        return <Layout className="text-2xl text-slate-300" />;
      default:
        return <Shield className="text-2xl text-[#00f0ff]" />;
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#080b0e] text-slate-200 selection:bg-[#ffb03a] selection:text-[#080b0e]">
      {/* Ambient background matrix */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0 terminal-grid opacity-30" />
        <div className="absolute left-[15%] top-[15%] h-[45vw] w-[45vw] rounded-full blur-3xl ambient-lamp opacity-60" />
        <div className="absolute bottom-[10%] right-[5%] h-[35vw] w-[35vw] rounded-full bg-[#38bdf8]/5 blur-[120px]" />
        {particles.map((p, i) => (
          <div
            key={i}
            className="particle-drift absolute rounded-full bg-[#38bdf8] shadow-[0_0_12px_rgba(56,189,248,0.6)]"
            style={{
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* HERO SECTION WITH VIDEO */}
      <header className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pb-20 pt-32 lg:min-h-screen">
        <div className="absolute inset-0 z-0">
          <video
            ref={heroVideoRef}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover opacity-35 mix-blend-screen transition-transform duration-100 ease-out"
            style={{ willChange: "transform" }}
          >
            <source src={SERVICES_VIDEO.src} type={SERVICES_VIDEO.type} />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#080b0e] via-[#080b0e]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080b0e]/70 via-transparent to-[#080b0e]" />
        </div>

        <Shell className="relative z-10 mx-auto w-full">
          <div className="max-w-3xl space-y-8 text-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING.reveal, delay: 0.1 }}
              className="inline-flex items-center gap-3 rounded-control border border-[#222c37] bg-[#11161b]/90 px-4 py-1.5 backdrop-blur-md"
            >
              <DotFilled className="animate-pulse text-[#ffb03a]" />
              <span className="font-mono text-xs uppercase tracking-widest text-slate-300">
                {page.badge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING.reveal, delay: 0.2 }}
              className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {page.title} <br />
              <span className="bg-gradient-to-r from-[#38bdf8] via-[#ffb03a] to-[#cf8047] bg-clip-text text-transparent">
                {page.titleHighlight}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING.reveal, delay: 0.3 }}
              className="max-w-2xl text-base font-light leading-relaxed text-slate-400 sm:text-lg"
            >
              {page.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING.reveal, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#console"
                className="keycap-glow inline-flex items-center gap-2 rounded-control bg-[#38bdf8] px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#080b0e] transition-all hover:bg-[#00f0ff]"
              >
                <Terminal className="text-base" />
                {page.ctaTerminal}
              </a>

              <button
                type="button"
                onClick={() => open()}
                className="inline-flex items-center gap-2 rounded-control border border-[#38bdf8]/40 bg-[#11161b]/80 px-7 py-3.5 font-mono text-xs font-medium uppercase tracking-wider text-slate-200 backdrop-blur-sm transition-all hover:border-[#38bdf8] hover:text-white"
              >
                <span>{page.hardware.cta}</span>
                <ArrowRight className="text-sm rtl:-scale-x-100" />
              </button>
            </motion.div>
          </div>
        </Shell>
      </header>

      {/* CONFIGURED NODES / SERVICES CARDS */}
      <section
        id="nodes"
        className="relative z-10 border-t border-[#222c37] py-24 lg:py-32"
      >
        <Shell className="flex flex-col gap-16">
          <div className="flex flex-col items-start justify-between gap-6 border-b border-[#222c37]/60 pb-10 md:flex-row md:items-end">
            <div>
              <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-[#ffb03a]">
                {page.nodes.eyebrow}
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {page.nodes.title}
              </h2>
            </div>
            <p className="max-w-md text-sm font-light text-slate-400">
              {page.nodes.description}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {page.nodes.items.map((node, index) => (
              <motion.div
                key={node.id}
                variants={fadeUp(1.5)}
                initial="hidden"
                whileInView="visible"
                viewport={ONCE_IN_VIEW}
                transition={{ delay: index * 0.08 }}
                className="group relative flex flex-col justify-between rounded-card border border-[#222c37] bg-[#11161b]/80 p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#38bdf8]/50 hover:bg-[#161d24]"
              >
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="flex size-12 items-center justify-center rounded-control border border-white/10 bg-white/5">
                      {getNodeIcon(index)}
                    </div>
                    <span className="font-mono text-xs text-slate-500">
                      {node.id} / NODE
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-xs font-medium uppercase tracking-wider text-[#38bdf8]">
                      {node.category}
                    </span>
                    <h3 className="mt-1 text-2xl font-bold text-white transition-colors group-hover:text-[#38bdf8]">
                      {node.title}
                    </h3>
                  </div>

                  <p className="text-sm font-light leading-relaxed text-slate-400">
                    {node.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {node.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-pill border border-[#222c37] bg-[#080b0e] px-3 py-1 font-mono text-[11px] text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-[#222c37]/60 pt-4 font-mono text-xs">
                  <span className="text-slate-500">{node.status}</span>
                  <button
                    type="button"
                    onClick={() => open()}
                    className="inline-flex items-center gap-1 text-[#ffb03a] transition-colors hover:text-white"
                  >
                    <span>Request Node</span>
                    <ArrowUpRight className="text-sm rtl:-scale-x-100" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </Shell>
      </section>

      {/* INTERACTIVE SANDBOX MATRIX (TERMINAL CONSOLE) */}
      <section
        id="console"
        className="relative z-10 border-y border-[#222c37] bg-[#080b0e]/90 py-24 lg:py-32"
      >
        <Shell className="space-y-12">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-[#38bdf8]">
              {page.console.eyebrow}
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              {page.console.title}
            </h2>
          </div>

          <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-card-sm border border-[#222c37] bg-[#080b0e] shadow-2xl">
            <div className="flex select-none items-center justify-between border-b border-[#222c37] bg-[#11161b] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-red-500/60" />
                <span className="size-2.5 rounded-full bg-yellow-500/60" />
                <span className="size-2.5 rounded-full bg-green-500/60" />
                <span className="ms-2 font-mono text-xs text-slate-400">
                  youssef_matrix_core.sh
                </span>
              </div>
              <span className="font-mono text-[10px] text-slate-500">
                STATUS // ONLINE
              </span>
            </div>

            <div className="min-h-[300px] space-y-4 bg-gradient-to-b from-[#080b0e] to-[#11161b]/30 p-6 font-mono text-xs sm:text-sm">
              <div className="flex items-start gap-2">
                <span className="text-[#38bdf8]">youssef@core:~$</span>
                <span className="text-slate-300">
                  init --container=production_engine
                </span>
              </div>

              <div className="space-y-1 text-slate-500">
                <div>
                  [ OK ] Calibrating 60 FPS Flutter state-machine render
                  pipelines...
                </div>
                <div>
                  [ OK ] Mounting Next.js App Router edge caching layer...
                </div>
                <div>
                  [ OK ] Initializing Firebase Firestore & security rules...
                </div>
                <div>
                  [ OK ] Enforcing pixel-perfect editorial design tokens...
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-[#38bdf8]">youssef@core:~$</span>
                <span className="text-slate-300">
                  cat engineering_ethos.txt
                </span>
              </div>

              <div className="rounded-control border border-[#ffb03a]/20 bg-[#ffb03a]/5 p-4 leading-relaxed text-[#ffb03a]">
                {page.console.philosophy}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <span className="text-[#38bdf8]">youssef@core:~$</span>
                <span ref={typewriterRef} className="cursor-blink text-white" />
              </div>
            </div>
          </div>
        </Shell>
      </section>

      {/* ARCHITECTURE SECTION */}
      <section id="architecture" className="relative z-10 py-24 lg:py-32">
        <Shell>
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-5">
              <span className="block font-mono text-xs uppercase tracking-widest text-[#ffb03a]">
                {page.architecture.eyebrow}
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {page.architecture.title}
              </h2>
              <p className="font-light leading-relaxed text-slate-400">
                {page.architecture.description}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                {page.architecture.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="border-s-2 border-[#38bdf8] ps-4"
                  >
                    <div className="font-mono text-2xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-slate-500">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {page.architecture.cards.map((card, index) => (
                <div
                  key={card.title}
                  className="rounded-card-sm border border-[#222c37] bg-[#161d24]/70 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#ffb03a]/40"
                >
                  <div className="mb-4">{getArchIcon(index)}</div>
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {card.title}
                  </h3>
                  <p className="text-xs font-light leading-relaxed text-slate-400 sm:text-sm">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Shell>
      </section>

      {/* HARDWARE SPECIFICATIONS & SLA */}
      <section
        id="hardware"
        className="relative z-10 border-t border-[#222c37] bg-[#11161b]/40 py-24 lg:py-32"
      >
        <Shell>
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-6">
              <span className="block font-mono text-xs uppercase tracking-widest text-[#38bdf8]">
                {page.hardware.eyebrow}
              </span>
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                {page.hardware.title}
              </h2>
              <p className="font-light leading-relaxed text-slate-400">
                {page.hardware.description}
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => open()}
                  className="inline-flex items-center gap-2 rounded-control bg-white px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest text-[#080b0e] transition-colors hover:bg-[#ffb03a]"
                >
                  <span>{page.hardware.cta}</span>
                  <ArrowRight className="text-sm rtl:-scale-x-100" />
                </button>
              </div>
            </div>

            <div className="relative lg:col-span-6">
              <div className="relative space-y-4 rounded-card border border-[#222c37] bg-[#080b0e] p-8 font-mono text-xs shadow-2xl">
                <div className="flex justify-between border-b border-[#222c37]/60 pb-3 text-slate-500">
                  <span>SPECIFICATION MATRIX</span>
                  <span>RELEASE 4.0</span>
                </div>
                {page.hardware.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center justify-between border-b border-[#222c37]/40 pb-2.5 text-xs"
                  >
                    <span className="text-slate-400">{spec.label}</span>
                    <span className="font-medium text-white">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Shell>
      </section>

      {/* SUBSCRIBE TO CORE LOGS */}
      <section
        id="subscribe"
        className="relative z-10 border-t border-[#222c37] py-24 text-center"
      >
        <Shell className="max-w-3xl space-y-6">
          <Cpu className="mx-auto animate-pulse text-4xl text-[#38bdf8]" />
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {page.subscribe.title}
          </h2>
          <p className="mx-auto max-w-lg text-sm font-light leading-relaxed text-slate-400">
            {page.subscribe.description}
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 rounded-control border border-green-500/30 bg-green-500/10 px-6 py-3 font-mono text-xs text-green-400">
              <CheckCircle className="text-base" />
              <span>Node linked successfully. Telemetry feed connected.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="mx-auto flex max-w-md flex-col items-center gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder={page.subscribe.placeholder}
                className="w-full rounded-control border border-[#222c37] bg-[#161d24] px-5 py-3.5 font-mono text-xs text-white placeholder:text-slate-600 focus:border-[#38bdf8] focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="w-full shrink-0 rounded-control bg-[#38bdf8] px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-[#080b0e] transition-colors hover:bg-[#00f0ff] sm:w-auto"
              >
                {page.subscribe.cta}
              </button>
            </form>
          )}
        </Shell>
      </section>
    </div>
  );
}
