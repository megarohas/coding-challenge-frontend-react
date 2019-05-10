import React from "react";
import ReactDOM from "react-dom";
import CaseCount from "./case_count";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CaseCount />, div);
  ReactDOM.unmountComponentAtNode(div);
});
