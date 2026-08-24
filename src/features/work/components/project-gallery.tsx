import Image from "next/image";

import { cn } from "@/core/utils/cn";

import type { ProjectCategory } from "../data/projects";

type ProjectGalleryProps = {
  images: readonly string[];
  label: string;
  category: ProjectCategory;
};

/**
 * A horizontally-scrolling strip of case-study screenshots. Renders nothing
 * when a project has no extra gallery shots beyond its cover — an empty
 * section is worse than no section.
 *
 * Aspect ratio follows the project's category: mobile screenshots are phone
 * captures (portrait), web screenshots are browser captures (landscape) — one
 * fixed ratio for both would badly crop whichever category it did not fit.
 */
export function ProjectGallery({ images, label, category }: ProjectGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      <span className="text-micro font-medium uppercase tracking-[0.08em] text-foreground/45">
        {label}
      </span>
      <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {images.map((src) => (
          <div
            key={src}
            className={cn(
              "relative shrink-0 overflow-hidden rounded-card-sm border border-line bg-surface",
              category === "mobile"
                ? "aspect-[9/18] w-56 sm:w-64"
                : "aspect-[16/10] w-80 sm:w-96",
            )}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(min-width: 640px) 24rem, 16rem"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
