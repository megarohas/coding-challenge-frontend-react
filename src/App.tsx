import * as React from "react";
import "./App.css";
import styled from "./theme/index";


interface IHelloBlockProps {
  color: string
}

const HelloBlock = styled.div`
  padding:10px;
  margin:5px;
  width:20%;
  ${(props:IHelloBlockProps) => `
    background: palevioletred;
    color: ${props.color};
  `}
`;

class App extends React.PureComponent {
  render() {
    return (
      <div className="App">
        <HelloBlock color="pink">Hello Pure World</HelloBlock>
      </div>
    );
  }
}

export default App;
