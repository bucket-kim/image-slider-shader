import styled from "styled-components";

const UIStyledContainer = styled.div`
  display: grid;
  place-content: center;
  height: 100%;
  user-select: none;
  overflow: hidden;
  pointer-events: none;
  position: relative;
  z-index: 10;
  .slider-container {
    height: auto;
    width: 100vw;
    aspect-ratio: 1 / 1;
    max-height: 75vh;
    position: relative;
    max-width: 100vw;

    @media (min-width: 768px) {
      width: auto;
      height: 75vh;
      aspect-ratio: 3 / 4;
    }
  }
`;

export default UIStyledContainer;
