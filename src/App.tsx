import * as React from "react";
import styled from "./theme/index";
import { get } from "./helpers/fetcher.js";
import IndexPage from "./components/index_page/index_page";
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

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
const AppWrapper = styled.div`
  padding: 0% 10%;
`;

const Index = () => {
  return <h2>Home</h2>;
};

const Case = ({ match }: RouteComponentProps<ICaseProps>) => {
  return <h2>This is a page for case with ID: {match.params.id} </h2>;
};

const Header = (
  <HeaderWrapper>
    <img style={{ height: "60px" }} src="/fav.ico" />{" "}
    <div style={{ marginLeft: "20px" }}>
      <div style={{ fontSize: "55px", marginBottom: "-20px" }}>
        Police Department of Berlin
      </div>
      <div style={{ fontSize: "30px" }}>Stolen bykes</div>
    </div>
  </HeaderWrapper>
);

const AppRouter = (
  <div>
    <Router>
      <Route path="/" exact component={IndexPage} />
      <Route path="/case/:id" component={Case} />
    </Router>
  </div>
);

class App extends React.PureComponent {
  componentDidMount() {
    get(
      "https://bikewise.org:443/api/v2/incidents?page=1&per_page=10&proximity_square=100"
    ).then(console.log);
  }
  render() {
    return (
      <AppWrapper>
        {Header}
        {AppRouter}
      </AppWrapper>
    );
  }
}

export default App;
