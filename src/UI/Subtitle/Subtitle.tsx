import { FC } from "react";
import SubtitleStyleContainer from "./SubtitleStyleContainer";

interface SubtitleProps {
  title: string;
}

const Subtitle: FC<SubtitleProps> = ({ title }) => {
  return (
    <SubtitleStyleContainer>
      <h2>{title}</h2>
    </SubtitleStyleContainer>
  );
};

export default Subtitle;
