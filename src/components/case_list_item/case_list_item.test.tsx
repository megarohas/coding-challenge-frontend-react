import React from "react";
import ReactDOM from "react-dom";
import CaseListItem from "./case_list_item";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CaseListItem />, div);
  ReactDOM.unmountComponentAtNode(div);
});
