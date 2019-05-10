import React from "react";
import ReactDOM from "react-dom";
import FindCasesBar from "./find_cases_bar";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FindCasesBar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
