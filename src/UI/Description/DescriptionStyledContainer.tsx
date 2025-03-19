import styled from "styled-components";

const DescriptionStyledContainer = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 2rem;
  color: white;

  @media (min-width: 768px) {
    right: auto;
    left: 100%;
    top: 100%;
    margin-top: -2.5rem;
    bottom: auto;
  }

  p {
    color: white;
    width: 16rem;
    font-size: 1rem;
    font-weight: 100;
    margin-left: 1rem;
    position: relative;

    .description {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      display: block;
    }
  }
`;

export default DescriptionStyledContainer;
