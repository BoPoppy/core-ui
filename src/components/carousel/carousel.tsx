import { Children, forwardRef, useState } from "react";
import { cn } from "../../lib/cn";

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controlled active slide index. */
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  /** Hide the prev/next arrows. */
  hideArrows?: boolean;
}

const Arrow = ({ dir }: { dir: "prev" | "next" }) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
    <path
      d={dir === "prev" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Carousel — a simple slide track with dots and arrows. Each child is a slide.
 */
export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  ({ className, index, defaultIndex = 0, onIndexChange, hideArrows, children, ...props }, ref) => {
    const slides = Children.toArray(children);
    const [internal, setInternal] = useState(defaultIndex);
    const active = index ?? internal;

    const go = (next: number) => {
      const clamped = (next + slides.length) % slides.length;
      if (index === undefined) setInternal(clamped);
      onIndexChange?.(clamped);
    };

    const arrowClass =
      "grid size-9 place-items-center rounded-full bg-surface/90 text-fg shadow-2 backdrop-blur cursor-pointer transition-transform hover:scale-105";

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-lg border-solid [border-width:var(--line-w)] [border-color:var(--card-line-color)] pop:border-fg",
          className,
        )}
        aria-roledescription="carousel"
        {...props}
      >
        <div
          className="flex transition-transform duration-300 ease-[var(--ease-smooth)]"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="w-full flex-none"
              aria-roledescription="slide"
              aria-hidden={i !== active}
            >
              {slide}
            </div>
          ))}
        </div>

        {!hideArrows && slides.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => go(active - 1)}
              className={cn(arrowClass, "absolute start-3 top-1/2 -translate-y-1/2")}
            >
              <Arrow dir="prev" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => go(active + 1)}
              className={cn(arrowClass, "absolute end-3 top-1/2 -translate-y-1/2")}
            >
              <Arrow dir="next" />
            </button>
          </>
        )}

        {slides.length > 1 && (
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === active}
                onClick={() => go(i)}
                className={cn(
                  "size-2 rounded-full transition-all",
                  i === active ? "w-5 bg-accent" : "bg-surface/70 hover:bg-surface",
                )}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
);
Carousel.displayName = "Carousel";
