import { motion } from "framer-motion";
import { FC, useEffect, useRef } from "react";
import { item } from "../../States/sliderStateTypes";
import SubtitleStyleContainer from "./SubtitleStyleContainer";
const TEXT_TRANSITION_HEIGHT = 100;

interface SubtitleProps {
  items: item[];
  prevIdx: number;
  currSlide: number;
  direction: string;
}

const Subtitle: FC<SubtitleProps> = ({
  items,
  prevIdx,
  currSlide,
  direction,
}) => {
  const itemRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    itemRef.current.map((item) => console.log(item));
  }, []);

  return (
    <SubtitleStyleContainer>
      <h2>
        {items.map((item, idx) => (
          <motion.div
            className="subtitle-container"
            key={idx}
            ref={(el) => {
              if (!el) return;
              itemRef.current[idx] = el;
            }}
            animate={
              idx === currSlide ? "current" : idx === prevIdx ? "prev" : "next"
            }
            variants={{
              current: {
                transition: {
                  delay: 0.4,
                  staggerChildren: 0.06,
                },
              },
            }}
          >
            {item.title.split("").map((char, idx) => (
              <motion.span
                key={idx}
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
                    },
                  },
                  prev: {
                    translateY:
                      direction === "prev"
                        ? TEXT_TRANSITION_HEIGHT
                        : -TEXT_TRANSITION_HEIGHT,
                    transition: {
                      duration: 0.8,
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
                {char}
              </motion.span>
            ))}
          </motion.div>
        ))}
      </h2>
    </SubtitleStyleContainer>
  );
};

export default Subtitle;
