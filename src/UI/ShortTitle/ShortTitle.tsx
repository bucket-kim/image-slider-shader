import { FC } from "react";
import ShortTitleStyledContainer from "./ShortTitleStyledContainer";

interface ShortTitleProps {
  title: string;
}

const ShortTitle: FC<ShortTitleProps> = ({ title }) => {
  return (
    <ShortTitleStyledContainer>
      <h1>{title}</h1>
    </ShortTitleStyledContainer>
  );
};

export default ShortTitle;
