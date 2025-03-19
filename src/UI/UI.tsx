import { useEffect } from "react";
import { sliderState } from "../States/sliderState";
import Arrow from "./Arrow/Arrow";
import Description from "./Description/Description";
import ShortTitle from "./ShortTitle/ShortTitle";
import Subtitle from "./Subtitle/Subtitle";
import UIStyledContainer from "./UIStyledContainer";

const UI = () => {
  const { currSlide, items, nextSlide, prevSlide, direction } = sliderState();

  let prevIdx = direction === "next" ? currSlide - 1 : currSlide + 1;
  useEffect(() => {
    if (prevIdx === items.length) {
      prevIdx = 0;
    } else if (prevIdx === -1) {
      prevIdx = items.length - 1;
    }

    console.log(prevIdx);
  }, [direction, prevIdx]);

  return (
    <UIStyledContainer>
      <div className="slider-container">
        <ShortTitle title={items[currSlide].short} />
        <Arrow direction="left" onClick={prevSlide} />
        <Arrow direction="right" onClick={nextSlide} />
        <Subtitle prevIdx={prevIdx} />
        <Description description={items[currSlide].description} />
      </div>
    </UIStyledContainer>
  );
};

export default UI;
