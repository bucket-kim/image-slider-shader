import { sliderState } from "../States/sliderState";
import Arrow from "./Arrow/Arrow";
import Description from "./Description/Description";
import ShortTitle from "./ShortTitle/ShortTitle";
import Subtitle from "./Subtitle/Subtitle";
import UIStyledContainer from "./UIStyledContainer";

const UI = () => {
  const { currSlide, items, nextSlide, prevSlide } = sliderState();

  return (
    <UIStyledContainer>
      <div className="slider-container">
        <ShortTitle title={items[currSlide].short} />
        <Arrow direction="left" onClick={prevSlide} />
        <Arrow direction="right" onClick={nextSlide} />
        <Subtitle title={items[currSlide].title} />
        <Description description={items[currSlide].description} />
      </div>
    </UIStyledContainer>
  );
};

export default UI;
