import gsap from "gsap";
import { FC, useEffect, useRef } from "react";
import { sliderState } from "../../States/sliderState";
import ShortTitleStyledContainer from "./ShortTitleStyledContainer";

const TEXT_TRANSITION_HEIGHT = 150;

interface ShortTitleProps {
  prevIdx: number;
}

const ShortTitle: FC<ShortTitleProps> = ({ prevIdx }) => {
  const spanRefs = useRef<HTMLSpanElement[]>([]);

  const { currSlide, items, direction, isAnimating, mounted } = sliderState();

  useEffect(() => {
    spanRefs.current.forEach((span, idx) => {
      if (!span) return;

      // Set initial positions - only current slide is visible at position 0
      gsap.set(span, {
        y: idx === currSlide ? 0 : TEXT_TRANSITION_HEIGHT,
      });
    });
  }, []);

  useEffect(() => {
    // Skip if component just mounted or not currently animating
    if (!mounted || !isAnimating) return;

    // Kill any existing animations
    spanRefs.current.forEach((span) => {
      if (!span) return;
      gsap.killTweensOf(span);
    });

    // Reset position of the current slide for animation
    if (spanRefs.current[currSlide]) {
      gsap.set(spanRefs.current[currSlide], {
        y:
          direction === "prev"
            ? -TEXT_TRANSITION_HEIGHT
            : TEXT_TRANSITION_HEIGHT,
      });
    }

    // Animate current slide to position 0
    if (spanRefs.current[currSlide]) {
      gsap.to(spanRefs.current[currSlide], {
        y: 0,
        duration: 0.8,
        ease: "back.out(0.2)", // Spring effect with bounce
        delay: 0.4,
      });
    }

    // Animate previous slide out of view
    if (spanRefs.current[prevIdx] && prevIdx !== currSlide) {
      gsap.to(spanRefs.current[prevIdx], {
        y:
          direction === "prev"
            ? TEXT_TRANSITION_HEIGHT
            : -TEXT_TRANSITION_HEIGHT,
        duration: 0.8,
        ease: "back.out(0.2)",
        delay: 0.2,
      });
    }
  }, [currSlide, prevIdx, direction, isAnimating, mounted]);

  return (
    <ShortTitleStyledContainer>
      <h1>
        {items.map((_item, idx) => (
          <span
            className="char"
            key={idx}
            ref={(el) => {
              if (!el) return;
              spanRefs.current[idx] = el;
            }}
          >
            {items[idx].short}
          </span>
        ))}
      </h1>
    </ShortTitleStyledContainer>
  );
};

export default ShortTitle;
