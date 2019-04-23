import * as React from "react";
import styled from "./theme/index";
import {
  BrowserRouter as Router,
  Route,
  Link,
  RouteComponentProps
} from "react-router-dom";

interface ICaseProps {
  id: string;
}
//
// const HelloBlock = styled.div`
//   padding: 10px;
//   margin: 5px;
//   width: 20%;
//   ${(props: IHelloBlockProps) => `
//     background: palevioletred;
//     color: ${props.color};
//   `}
// `;

const Index = () => {
  return <h2>Home</h2>;
};

const Case = ({ match }: RouteComponentProps<ICaseProps>) => {
  return <h2>This is a page for case with ID: {match.params.id} </h2>;
};

function AppRouter() {
  return (
    <div>
      <Router>
        <Route path="/" exact component={Index} />
        <Route path="/case/:id" component={Case} />
      </Router>
    </div>
  );
}

class App extends React.PureComponent {
  render() {
    return <div className="App">{AppRouter()}</div>;
  }
}

export default App;
