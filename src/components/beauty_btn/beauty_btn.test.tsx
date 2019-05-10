import React from "react";
import ReactDOM from "react-dom";
import BeautyBtn from "./beauty_btn";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BeautyBtn />, div);
  ReactDOM.unmountComponentAtNode(div);
});
