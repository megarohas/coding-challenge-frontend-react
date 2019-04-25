import * as React from "react";
import styled from "./theme/index";
import { get } from "./helpers/fetcher.js";
import IndexPage from "./components/index_page/index_page";
import Header from "./components/header/header";
import {
  BrowserRouter as Router,
  Route,
  Link,
  RouteComponentProps
} from "react-router-dom";

interface ICaseProps {
  id: string;
}

// ${(props: IHelloBlockProps) => `
//   background: palevioletred;
//   color: ${props.color};
// `}
const AppWrapper = styled.div`
  padding: 0% 10%;
`;

const Case = ({ match }: RouteComponentProps<ICaseProps>) => {
  return <h2>This is a page for case with ID: {match.params.id} </h2>;
};

const AppRouter = (
  <div>
    <Router>
      <Route path="/" exact component={IndexPage} />
      <Route path="/case/:id" component={Case} />
    </Router>
  </div>
);

class App extends React.PureComponent {
  render() {
    return (
      <AppWrapper>
        <Header />
        {AppRouter}
      </AppWrapper>
    );
  }
}

export default App;
