import { motion } from "framer-motion";
import { FC, useRef } from "react";
import { sliderState } from "../../States/sliderState";
import ShortTitleStyledContainer from "./ShortTitleStyledContainer";

const TEXT_TRANSITION_HEIGHT = 150;

interface ShortTitleProps {
  prevIdx: number;
}

const ShortTitle: FC<ShortTitleProps> = ({ prevIdx }) => {
  const spanRefs = useRef<HTMLSpanElement[]>([]);

  const { currSlide, items, direction, isAnimating, mounted } = sliderState();

  // useEffect(() => {
  //   spanRefs.current.forEach((span, idx) => {
  //     if (!span) return;

  //     // Set initial positions - only current slide is visible at position 0
  //     gsap.set(span, {
  //       y: idx === currSlide ? 0 : TEXT_TRANSITION_HEIGHT,
  //     });
  //   });
  // }, []);

  // useEffect(() => {
  //   // Skip if component just mounted or not currently animating
  //   if (!mounted || !isAnimating) return;

  //   // Kill any existing animations
  //   spanRefs.current.forEach((span) => {
  //     if (!span) return;
  //     gsap.killTweensOf(span);
  //   });

  //   // Reset position of the current slide for animation
  //   if (spanRefs.current[currSlide]) {
  //     gsap.set(spanRefs.current[currSlide], {
  //       y:
  //         direction === "prev"
  //           ? -TEXT_TRANSITION_HEIGHT
  //           : TEXT_TRANSITION_HEIGHT,
  //     });
  //   }

  //   // Animate current slide to position 0
  //   if (spanRefs.current[currSlide]) {
  //     gsap.to(spanRefs.current[currSlide], {
  //       y: 0,
  //       duration: 0.8,
  //       ease: "back.out(0.2)", // Spring effect with bounce
  //       delay: 0.4,
  //     });
  //   }

  //   // Animate previous slide out of view
  //   if (spanRefs.current[prevIdx] && prevIdx !== currSlide) {
  //     gsap.to(spanRefs.current[prevIdx], {
  //       y:
  //         direction === "prev"
  //           ? TEXT_TRANSITION_HEIGHT
  //           : -TEXT_TRANSITION_HEIGHT,
  //       duration: 0.8,
  //       ease: "back.out(0.2)",
  //       delay: 0.2,
  //     });
  //   }
  // }, [currSlide, prevIdx, direction, isAnimating, mounted]);

  return (
    <ShortTitleStyledContainer>
      <h1>
        {items.map((_item, idx) => (
          <motion.span
            className="char"
            key={idx}
            ref={(el) => {
              if (!el) return;
              spanRefs.current[idx] = el;
            }}
            animate={
              idx === currSlide ? "current" : idx === prevIdx ? "prev" : "next"
            }
            variants={{
              current: {
                translateY: 0,
                transition: {
                  duration: 0.8,
                  from:
                    direction === "prev"
                      ? -TEXT_TRANSITION_HEIGHT
                      : TEXT_TRANSITION_HEIGHT,
                  type: "spring",
                  bounce: 0.2,
                  delay: 0.4,
                },
              },
              prev: {
                translateY:
                  direction === "prev"
                    ? TEXT_TRANSITION_HEIGHT
                    : -TEXT_TRANSITION_HEIGHT,
                transition: {
                  type: "spring",
                  bounce: 0.2,
                  delay: 0.2,
                  from: direction === "start" ? -TEXT_TRANSITION_HEIGHT : 0,
                },
              },
              next: {
                translateY: TEXT_TRANSITION_HEIGHT,
                transition: {
                  from: TEXT_TRANSITION_HEIGHT,
                },
              },
            }}
          >
            {items[idx].short}
          </motion.span>
        ))}
      </h1>
    </ShortTitleStyledContainer>
  );
};

export default ShortTitle;
