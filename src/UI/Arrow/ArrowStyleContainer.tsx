import styled from "styled-components";

interface ArrowStyleContainerProps {
  direction: "left" | "right";
}

const ArrowStyleContainer = styled.button<ArrowStyleContainerProps>`
  border: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: auto;
  cursor: pointer;
  background: transparent;
  ${(props) =>
    props.direction === "left"
      ? `
     left: 1rem;
    @media (min-width: 768px) {
      left: -3.5rem;
    }
  `
      : `
     right: 1rem;
    @media (min-width: 768px) {
      right: -3.5rem;
    }
  `}

  svg {
    width: 2rem;
    height: 2rem;
    stroke: white;
    transition: opacity 300ms ease-in-out;

    &:hover {
      opacity: 0.5;
    }
  }
`;

export default ArrowStyleContainer;
