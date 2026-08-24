import { CheckCircle } from "@/components/ui/icons";

type ProjectCapabilitiesProps = {
  heading: string;
  items: readonly string[];
};

/** A checklist — distinct from the feature bento so the page reads as varied. */
export function ProjectCapabilities({ heading, items }: ProjectCapabilitiesProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {heading}
      </h3>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-foreground/75">
            <CheckCircle className="mt-0.5 shrink-0 text-base text-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
