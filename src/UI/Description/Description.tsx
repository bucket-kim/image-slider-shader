import { motion } from "framer-motion";
import { FC, useRef } from "react";
import { sliderState } from "../../States/sliderState";
import DescriptionStyledContainer from "./DescriptionStyledContainer";

interface DescriptionProps {
  prevIdx: number;
}

const Description: FC<DescriptionProps> = ({ prevIdx }) => {
  const spanRef = useRef<HTMLSpanElement[]>([]);

  const { currSlide, items } = sliderState();

  // useEffect(() => {
  //   spanRef.current.forEach((span, idx) => {
  //     if (!span) return;
  //     gsap.set(span, {
  //       opacity: idx === currSlide ? 1 : 0,
  //     });
  //   });
  // }, []);
  // // Animation effect that only runs when slide changes and isAnimating is true
  // useEffect(() => {
  //   // Skip if component just mounted or not currently animating
  //   if (!mounted || !isAnimating) return;

  //   // Kill any existing animations
  //   spanRef.current.forEach((span) => {
  //     if (!span) return;
  //     gsap.killTweensOf(span);
  //   });

  //   // Fade out previous slide
  //   if (spanRef.current[prevIdx] && prevIdx !== currSlide) {
  //     gsap.to(spanRef.current[prevIdx], {
  //       opacity: 0,
  //       duration: 0.8,
  //       ease: "power2.inOut",
  //     });
  //   }

  //   // Fade in current slide
  //   if (spanRef.current[currSlide]) {
  //     gsap.to(spanRef.current[currSlide], {
  //       opacity: 1,
  //       duration: 1.2,
  //       ease: "power2.inOut",
  //       delay: 0.4,
  //       onComplete: () => {
  //         // Animation is done, allow new animations
  //         setIsAnimating(false);
  //       },
  //     });
  //   }
  // }, [currSlide, prevIdx, isAnimating, mounted]);

  return (
    <DescriptionStyledContainer>
      <p>
        {items.map((item, idx) => (
          <motion.span
            className="description"
            key={idx}
            ref={(el) => {
              if (!el) return;
              spanRef.current[idx] = el;
            }}
            animate={
              idx === currSlide ? "current" : idx === prevIdx ? "prev" : "next"
            }
            initial={{
              opacity: 0,
            }}
            variants={{
              current: {
                opacity: 1,
                transition: {
                  duration: 1.2,
                  delay: 0.6,
                  from: 0,
                },
              },
            }}
          >
            {item.description}
          </motion.span>
        ))}
      </p>
    </DescriptionStyledContainer>
  );
};

export default Description;
