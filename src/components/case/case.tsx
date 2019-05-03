import * as React from "react";
import styled from "../../theme";
import { TCase } from "../../types";
import { RouteComponentProps } from "react-router-dom";
import { get } from "../../helpers/fetcher.js";
//@ts-ignore
import GoogleMap from "google-map-react";

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
  coordinates: Array<number>;
}

const CaseWrapper = styled.div`
  margin-bottom: 100px;
`;
const Marker = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: red;
  opacity: 0.5;
`;
const CaseImg = styled.img`
  width: 50%;
`;
type TMapMarker = {
  text: string;
  lat: number;
  lng: number;
};

class Case extends React.PureComponent<ICaseProps, ICaseState> {
  state = {
    title: "",
    address: "",
    description: "",
    occurred_at: "",
    img: "",
    coordinates: [52.517038, 13.401267]
  };
  componentDidMount() {
    let id: string = this.props.match.params.id;
    get(`https://bikewise.org:443/api/v2/incidents/${id}`).then(response => {
      //console.log(response);
      const _date: Date = new Date(response.incident.occurred_at * 1000);
      this.setState({
        title: response.incident.title,
        address: response.incident.address,
        description: response.incident.description,
        occurred_at: _date.toDateString(),
        img: response.incident.media.image_url
      });
      get(
        `https://bikewise.org:443/api/v2/locations?proximity_square=100&incident_type=theft&proximity=52.517038,13.401267`
      ).then(response => {
        response.features
          .filter((item: any) => item.properties.id == id)
          .forEach((item: any) => {
            this.setState({
              coordinates: item.geometry.coordinates.reverse()
            });
          });
      });
    });
  }
  render() {
    return (
      <CaseWrapper>
        <div style={{ width: "100%", height: "300px" }}>
          <GoogleMap
            bootstrapURLKeys={{
              key: "AIzaSyDaxTbb824BrjJMUfBeCc5Cxv6sbuwYnhs"
            }}
            center={this.state.coordinates}
            defaultZoom={11}
          >
            <Marker
              lat={this.state.coordinates[0]}
              lng={this.state.coordinates[1]}
              text=""
            />
          </GoogleMap>
        </div>
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
