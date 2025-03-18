import { FC } from "react";
import DescriptionStyledContainer from "./DescriptionStyledContainer";

interface DescriptionProps {
  description: string;
}

const Description: FC<DescriptionProps> = ({ description }) => {
  return (
    <DescriptionStyledContainer>
      <p>{description}</p>
    </DescriptionStyledContainer>
  );
};

export default Description;
