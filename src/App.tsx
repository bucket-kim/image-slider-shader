import { Fragment } from "react/jsx-runtime";
import "./App.css";
import R3F from "./R3F/R3F";
import UI from "./UI/UI";

function App() {
  return (
    <Fragment>
      <section
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <UI />
        <R3F />
      </section>
    </Fragment>
  );
}

export default App;
