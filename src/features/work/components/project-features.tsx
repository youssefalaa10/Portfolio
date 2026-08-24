import { Cpu, Gauge, Layers, Layout, Shield, Smartphone } from "@/components/ui/icons";

const ICONS = [Layers, Cpu, Shield, Smartphone, Layout, Gauge] as const;

type ProjectFeaturesProps = {
  heading: string;
  items: readonly string[];
};

/** Bento-style feature grid — reuses the same icon set as About's principle cards. */
export function ProjectFeatures({ heading, items }: ProjectFeaturesProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {heading}
      </h3>
      <ul className="grid gap-4 sm:grid-cols-2">
        {items.map((item, index) => {
          const Icon = ICONS[index % ICONS.length];

          return (
            <li
              key={item}
              className="flex items-start gap-4 rounded-card-sm border border-line bg-surface p-5"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-control bg-white text-lg text-accent shadow-sm">
                <Icon />
              </span>
              <span className="pt-1.5 text-sm text-foreground/75">{item}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
