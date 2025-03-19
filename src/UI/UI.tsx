import { useCallback, useEffect } from "react";
import { sliderState } from "../States/sliderState";
import Arrow from "./Arrow/Arrow";
import Description from "./Description/Description";
import ShortTitle from "./ShortTitle/ShortTitle";
import Subtitle from "./Subtitle/Subtitle";
import UIStyledContainer from "./UIStyledContainer";

const UI = () => {
  const {
    currSlide,
    items,
    nextSlide,
    prevSlide,
    direction,
    setIsAnimating,
    setMounted,
  } = sliderState();

  let prevIdx = direction === "next" ? currSlide - 1 : currSlide + 1;

  if (prevIdx === items.length) {
    prevIdx = 0;
  } else if (prevIdx === -1) {
    prevIdx = items.length - 1;
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  const leftClick = useCallback(() => {
    prevSlide();
    setIsAnimating(true);
  }, []);
  const rightClick = useCallback(() => {
    nextSlide();
    setIsAnimating(true);
  }, []);

  return (
    <UIStyledContainer>
      <div className="slider-container">
        <ShortTitle prevIdx={prevIdx} />
        <Arrow direction="left" onClick={leftClick} />
        <Arrow direction="right" onClick={rightClick} />
        <Subtitle prevIdx={prevIdx} />
        <Description prevIdx={prevIdx} />
      </div>
    </UIStyledContainer>
  );
};

export default UI;
