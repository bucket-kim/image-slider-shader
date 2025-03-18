import styled from "styled-components";

const ShortTitleStyledContainer = styled.div`
  width: 12rem;
  left: 1rem;
  position: absolute;
  top: -12rem;
  @media (min-width: 768px) {
    width: 18rem;
    left: 0;
    transform: translateX(-50%);
  }
  h1 {
    position: relative;
    overflow: hidden;
    font-size: 5rem;
    height: 4rem;
    line-height: 4rem;
    font-weight: bold;
    color: white;
    display: block;
    -webkit-font-smoothing: antialiased;

    @media (min-width: 768px) {
      font-size: 11rem;
      height: 9rem;
      line-height: 9rem;
    }
  }
`;

export default ShortTitleStyledContainer;
