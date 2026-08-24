import {
  Cpu,
  Database,
  Flutter,
  Layers,
  Layout,
  Sliders,
  Smartphone,
  Gauge,
  Terminal,
} from "@/components/ui/icons";
import { cn } from "@/core/utils/cn";

type PhoneFrameProps = {
  /** Announced to assistive tech in place of the decorative contents. */
  label: string;
  className?: string;
};

/**
 * High-fidelity Flutter device frame rendered in CSS & vector graphics.
 *
 * Drawn with the project's semantic color tokens (`accent`, `accent-from`, `accent-to`,
 * `surface`, `ink`, `line`, etc.) so it stays razor sharp at any DPI, scales proportionally
 * with the rem grid, and presents a polished, authentic mobile application experience.
 */
export function PhoneFrame({ label, className }: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "group relative aspect-[9/18.8] w-full rounded-[2.85rem] bg-ink p-[0.45rem]",
        "shadow-[0_3rem_6rem_-1.5rem_color-mix(in_oklab,var(--color-accent)_28%,transparent),0_1.5rem_4rem_-1rem_color-mix(in_oklab,var(--color-ink)_55%,transparent)]",
        "ring-1 ring-black/40",
        className,
      )}
    >
      {/* Glass. A single diagonal specular band plus a top sheen: this is what
          separates "device" from "rounded rectangle", and it costs two gradients
          and no JavaScript. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[0.45rem] z-30 overflow-hidden rounded-[2.4rem]"
      >
        <div className="absolute -inset-y-1/4 -start-1/3 w-2/3 rotate-[18deg] bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-white/10 to-transparent" />
      </div>

      {/* Outer chassis highlights & metallic perimeter rim */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[2.85rem] ring-1 ring-inset ring-white/20"
      />

      {/* Side Hardware Buttons */}
      <span
        aria-hidden
        className="absolute -start-[0.16rem] top-[18%] h-[3.8%] w-[0.16rem] rounded-s-sm bg-ink/85"
      />
      <span
        aria-hidden
        className="absolute -start-[0.16rem] top-[25%] h-[6.8%] w-[0.16rem] rounded-s-sm bg-ink/85"
      />
      <span
        aria-hidden
        className="absolute -start-[0.16rem] top-[33.5%] h-[6.8%] w-[0.16rem] rounded-s-sm bg-ink/85"
      />
      <span
        aria-hidden
        className="absolute -end-[0.16rem] top-[26%] h-[9.2%] w-[0.16rem] rounded-e-sm bg-ink/85"
      />

      {/* Screen Container */}
      <div className="relative h-full w-full overflow-hidden rounded-[2.45rem] bg-ink select-none">
        <span className="sr-only">{label}</span>

        {/* Ambient Top Glow from Hero Card */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-12 inset-x-0 h-44 bg-gradient-to-b from-accent/25 via-accent/10 to-transparent blur-2xl"
        />

        {/* Diagonal Screen Glass Reflection */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-full rotate-45 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
        />

        <div aria-hidden className="relative z-10 flex h-full w-full flex-col justify-between p-[5.5%] pb-[4.5%]">
          {/* TOP STATUS BAR & DYNAMIC ISLAND */}
          <div className="space-y-2">
            {/* Status Bar Row */}
            <div className="flex items-center justify-between px-2 pt-0.5 text-[9.5px] font-semibold tracking-tight text-white/80">
              <span className="font-mono">9:41</span>

              {/* Dynamic Island */}
              <div className="relative flex h-[1.15rem] w-[34%] items-center justify-between rounded-pill bg-black px-2 shadow-inner ring-1 ring-white/10">
                {/* Camera lens glint */}
                <span className="size-2 rounded-full bg-white/10 ring-1 ring-white/20">
                  <span className="block size-0.5 rounded-full bg-accent/60 m-auto mt-0.5" />
                </span>
                {/* Active Indicator Dot */}
                <span className="size-1.5 rounded-full bg-accent-from animate-pulse shadow-[0_0_6px_var(--color-accent-from)]" />
              </div>

              {/* Icons (Signal, Wifi, Battery) */}
              <div className="flex items-center gap-1 text-[10px]">
                <svg className="size-2.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z" opacity="0.3" />
                  <path d="M12 3v19l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z" />
                </svg>
                <div className="flex h-2.5 w-4 items-center rounded-[2.5px] border border-white/60 p-0.5">
                  <div className="h-full w-full rounded-[1px] bg-white" />
                </div>
              </div>
            </div>

            {/* In-App Navigation Bar */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <div className="grid size-7 place-items-center rounded-control bg-accent/20 border border-accent/40 text-accent-from text-xs shadow-sm">
                  <Flutter className="text-sm" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-white">Flutter App</span>
                    <span className="rounded-pill bg-accent-from/20 px-1.5 py-0.2 font-mono text-[7.5px] font-medium text-accent-from border border-accent-from/30">
                      60 FPS
                    </span>
                  </div>
                  <span className="block text-[8.5px] font-mono text-white/50">v3.24 • Production</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <div className="grid size-6 place-items-center rounded-pill bg-white/10 border border-white/10 text-white/80 text-[10px]">
                  <Gauge className="size-3 text-accent-from" />
                </div>
              </div>
            </div>
          </div>

          {/* MAIN APPLICATION CONTENT AREA */}
          <div className="flex flex-1 flex-col justify-between py-2 space-y-2">
            {/* HERO DASHBOARD CARD */}
            <div className="relative overflow-hidden rounded-[1.2rem] bg-gradient-to-br from-accent-from via-accent to-accent-to p-3 text-white shadow-lg ring-1 ring-white/20">
              {/* Background Geometric Mesh Accent */}
              <div
                aria-hidden
                className="pointer-events-none absolute -end-6 -top-6 size-24 rounded-full bg-white/15 blur-xl"
              />

              <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-white animate-ping" />
                    <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-white/90">
                      Active Instance
                    </span>
                  </div>
                  <span className="rounded-pill bg-white/20 px-2 py-0.5 font-mono text-[8px] font-medium text-white backdrop-blur-sm">
                    +24.8%
                  </span>
                </div>

                <div>
                  <div className="font-mono text-[16px] font-bold tracking-tight text-white">
                    $48,920.00
                  </div>
                  <div className="text-[8.5px] text-white/80">99.98% Realtime Sync SLA</div>
                </div>

                {/* Micro Action Pills */}
                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  {[
                    { label: "Deploy", icon: Terminal },
                    { label: "Sync", icon: Database },
                    { label: "Stats", icon: Sliders },
                    { label: "Nodes", icon: Cpu },
                  ].map((act) => (
                    <div
                      key={act.label}
                      className="flex flex-col items-center justify-center rounded-[0.65rem] bg-black/20 p-1 border border-white/10 text-white/90 hover:bg-black/30 transition-colors"
                    >
                      <act.icon className="size-2.5 mb-0.5 text-white" />
                      <span className="text-[7.5px] font-medium">{act.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* TWO STAT TILES */}
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-[1rem] bg-white/[0.09] p-2.5 border border-white/10 shadow-sm">
                <div className="flex items-center justify-between text-[8px] text-white/60 font-mono">
                  <span>FRAME RATE</span>
                  <span className="text-accent-from">100%</span>
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="font-mono text-[13px] font-bold text-white">60.0</span>
                  <span className="text-[8px] font-mono text-accent-from">FPS</span>
                </div>
                <div className="mt-1.5 flex h-1 w-full overflow-hidden rounded-pill bg-white/10">
                  <div className="h-full w-full rounded-pill bg-gradient-to-r from-accent-from to-accent" />
                </div>
              </div>

              <div className="rounded-[1rem] bg-white/[0.09] p-2.5 border border-white/10 shadow-sm">
                <div className="flex items-center justify-between text-[8px] text-white/60 font-mono">
                  <span>MEMORY FOOTPRINT</span>
                  <span className="text-accent-from">32MB</span>
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="font-mono text-[13px] font-bold text-white">Zero</span>
                  <span className="text-[8px] text-white/60">Leaks</span>
                </div>
                <div className="mt-1.5 flex h-1 w-full overflow-hidden rounded-pill bg-white/10">
                  <div className="h-full w-[35%] rounded-pill bg-accent-from" />
                </div>
              </div>
            </div>

            {/* LIVE MODULE FEED ROWS */}
            <div className="space-y-1.5">
              {[
                {
                  title: "State Machine (Riverpod)",
                  subtitle: "Immutable unidirectional flow",
                  badge: "Ready",
                  icon: Layers,
                  color: "text-accent-from bg-accent-from/15",
                },
                {
                  title: "Local Database (Isar)",
                  subtitle: "Encrypted offline persistence",
                  badge: "Synced",
                  icon: Database,
                  color: "text-accent-from bg-accent-from/15",
                },
                {
                  title: "Platform Bridge (Swift/Kotlin)",
                  subtitle: "Direct native hardware channels",
                  badge: "Active",
                  icon: Smartphone,
                  color: "text-accent bg-accent/15",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-[0.8rem] bg-white/[0.07] p-2 border border-white/5 hover:border-white/15 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className={cn("grid size-5.5 place-items-center rounded-[0.5rem] border border-white/10 text-[9px]", item.color)}>
                      <item.icon className="size-3" />
                    </div>
                    <div>
                      <div className="text-[8.5px] font-semibold text-white/95">{item.title}</div>
                      <div className="text-[7px] text-white/50">{item.subtitle}</div>
                    </div>
                  </div>

                  <span className="rounded-pill bg-white/10 px-1.5 py-0.5 font-mono text-[7px] font-medium text-white/80 border border-white/10">
                    {item.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* FLOATING BOTTOM DOCK */}
          <div className="relative flex items-center justify-around rounded-pill bg-white/[0.09] p-1.5 border border-white/15 shadow-xl backdrop-blur-md">
            {[
              { label: "Home", icon: Layout, active: true },
              { label: "Modules", icon: Layers, active: false },
              { label: "Terminal", icon: Terminal, active: false },
              { label: "Settings", icon: Sliders, active: false },
            ].map((tab) => (
              <div
                key={tab.label}
                className={cn(
                  "relative flex items-center justify-center size-6 rounded-pill transition-all",
                  tab.active
                    ? "bg-accent-from text-white shadow-[0_0_10px_var(--color-accent-from)]"
                    : "text-white/40 hover:text-white/80",
                )}
              >
                <tab.icon className="size-3" />
              </div>
            ))}
          </div>

          {/* Home Indicator Bar */}
          <div className="mx-auto mt-1 h-0.8 w-24 rounded-pill bg-white/30" />
        </div>
      </div>
    </div>
  );
}
