import React from "react";
import ReactDOM from "react-dom";
import Case from "./case";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Case />, div);
  ReactDOM.unmountComponentAtNode(div);
});
