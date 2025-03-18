import { FC } from "react";
import ArrowStyleContainer from "./ArrowStyleContainer";

interface ArrowProps {
  direction: string;
  onClick: () => void;
}

const Arrow: FC<ArrowProps> = ({ direction, onClick }) => {
  return (
    <ArrowStyleContainer
      direction={direction as "left" | "right"}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={4}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={
            direction === "left"
              ? "M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              : "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          }
        />
      </svg>
    </ArrowStyleContainer>
  );
};

export default Arrow;
