import * as React from "react";
import styled from "../../theme";
import { TCase } from "../../types";
import { RouteComponentProps } from "react-router-dom";
import { get } from "../../helpers/fetcher.js";

interface ICaseRouteParamTypes {
  id: string;
}

interface ICaseRouteParams extends ICaseRouteParamTypes {
  params: ICaseRouteParamTypes;
}

interface ICaseProps extends ICaseRouteParams {
  match: ICaseRouteParams;
}
interface ICaseState {
  title: string;
  address: string;
  description: string;
  occurred_at: string;
  img: string;
}

const CaseWrapper = styled.div``;
const CaseImg = styled.img`
  width: 50%;
`;

class Case extends React.PureComponent<ICaseProps, ICaseState> {
  state = {
    title: "",
    address: "",
    description: "",
    occurred_at: "",
    img: ""
  };
  componentDidMount() {
    let id: string = this.props.match.params.id;
    get(`https://bikewise.org:443/api/v2/incidents/${id}`).then(response => {
      console.log(response);
      const _date: Date = new Date(response.incident.occurred_at * 1000);
      this.setState({
        title: response.incident.title,
        address: response.incident.address,
        description: response.incident.description,
        occurred_at: _date.toDateString(),
        img: response.incident.media.image_url
      });
    });
  }
  render() {
    return (
      <CaseWrapper>
        <h1>{this.state.title}</h1>
        <h3>{`Stolen ${this.state.occurred_at} at ${this.state.address}`}</h3>
        <CaseImg src={this.state.img} alt="N/A" />
        <h1>DESCRIPTION OF INCEDENT</h1>
        <h3>{this.state.description}</h3>
      </CaseWrapper>
    );
  }
}

export default Case;
