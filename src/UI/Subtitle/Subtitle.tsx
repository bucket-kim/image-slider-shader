import gsap from "gsap";
import { FC, useEffect, useRef } from "react";
import { sliderState } from "../../States/sliderState";
import SubtitleStyleContainer from "./SubtitleStyleContainer";
const TEXT_TRANSITION_HEIGHT = 150;

interface SubtitleProps {
  prevIdx: number;
}

const Subtitle: FC<SubtitleProps> = ({ prevIdx }) => {
  const itemRef = useRef<HTMLDivElement[]>([]);

  const { currSlide, items, direction, isAnimating, mounted } = sliderState();

  useEffect(() => {
    itemRef.current.forEach((item, idx) => {
      if (!item) return;

      const chars = item.querySelectorAll(".char");

      gsap.set(chars, {
        y: idx === currSlide ? 0 : TEXT_TRANSITION_HEIGHT,
      });
    });
  }, []);

  useEffect(() => {
    if (!mounted || !isAnimating) return;

    itemRef.current.forEach((item) => {
      if (!item) return;

      const chars = item.querySelectorAll(".char");

      gsap.killTweensOf(chars);
    });

    if (itemRef.current[currSlide]) {
      const currentChars =
        itemRef.current[currSlide]?.querySelectorAll(".char");

      gsap.to(currentChars, {
        y: 0,
        duration: 0.8,
        stagger: 0.06,
        delay: 0.4,
        ease: "back.out(0.2)",
      });
    }

    // Animate previous slide characters
    if (itemRef.current[prevIdx]) {
      const prevChars = itemRef.current[prevIdx]?.querySelectorAll(".char");

      gsap.to(prevChars, {
        y:
          direction === "prev"
            ? TEXT_TRANSITION_HEIGHT
            : -TEXT_TRANSITION_HEIGHT,
        duration: 0.8,
        ease: "power1.out",
      });
    }
  }, [currSlide, prevIdx, direction, mounted, isAnimating]);

  return (
    <SubtitleStyleContainer>
      <h2>
        {items.map((item, idx) => (
          <div
            className="subtitle-container"
            key={idx}
            ref={(el) => {
              if (!el) return;
              itemRef.current[idx] = el;
            }}
            // animate={
            //   idx === currSlide ? "current" : idx === prevIdx ? "prev" : "next"
            // }
            // variants={{
            //   current: {
            //     transition: {
            //       delay: 0.4,
            //       staggerChildren: 0.06,
            //     },
            //   },
            // }}
          >
            {item.title.split("").map((char, idx) => (
              <span
                className="char"
                key={idx}

                // variants={{
                //   current: {
                //     translateY: 0,
                //     transition: {
                //       duration: 0.8,
                //       from:
                //         direction === "prev"
                //           ? -TEXT_TRANSITION_HEIGHT
                //           : TEXT_TRANSITION_HEIGHT,
                //       type: "spring",
                //       bounce: 0.2,
                //     },
                //   },
                //   prev: {
                //     translateY:
                //       direction === "prev"
                //         ? TEXT_TRANSITION_HEIGHT
                //         : -TEXT_TRANSITION_HEIGHT,
                //     transition: {
                //       duration: 0.8,
                //       from: direction === "start" ? -TEXT_TRANSITION_HEIGHT : 0,
                //     },
                //   },
                //   next: {
                //     translateY: TEXT_TRANSITION_HEIGHT,
                //     transition: {
                //       from: TEXT_TRANSITION_HEIGHT,
                //     },
                //   },
                // }}
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </h2>
    </SubtitleStyleContainer>
  );
};

export default Subtitle;
