import * as React from "react";
import styled from "./theme";
import { get } from "./helpers/fetcher.js";
import IndexPage from "./components/index_page/index_page";
import Header from "./components/header/header";
import Case from "./components/case/case";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const AppWrapper = styled.div`
  padding: 0% 10%;
`;

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
