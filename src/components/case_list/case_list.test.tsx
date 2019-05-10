import React from "react";
import ReactDOM from "react-dom";
import CaseList from "./case_list";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CaseList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
