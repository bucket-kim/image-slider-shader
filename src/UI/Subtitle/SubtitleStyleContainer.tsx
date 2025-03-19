import styled from "styled-components";

const SubtitleStyleContainer = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 2rem;
  color: white;

  @media (min-width: 768px) {
    right: auto;
    left: 100%;
    margin-left: -5rem;
  }

  h2 {
    font-weight: bold;
    color: transparent;
    -webkit-text-stroke: 0.5px #fff;
    display: block;
    overflow: hidden;
    position: relative;
    width: 50vw;
    font-size: 3rem;
    height: 4rem;
    -webkit-font-smoothing: antialiased;

    .subtitle-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      text-align: right;
      @media (min-width: 768px) {
        text-align: left;
      }
      .char {
        display: inline-block;
      }
    }

    @media (min-width: 768px) {
      font-size: 6rem;
      height: 7rem;
    }
  }
`;

export default SubtitleStyleContainer;
