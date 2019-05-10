import * as React from "react";
import styled from "../../theme";
import { TCase } from "../../types";
import { RouteComponentProps } from "react-router-dom";
import { get } from "../../helpers/fetcher.js";
//@ts-ignore
import GoogleMap from "google-map-react";
import PropTypes from "prop-types";

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
  is_loaded: boolean;
  is_error: boolean;
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
  width: 100%;
`;
const CaseImgWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 300px;
  margin-top: 30px;
`;
const ImgDescWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const DescWrapper = styled.div`
  width: 100%;
  margin-left: 30px;
`;
const MapWrapper = styled.div`
  width: 100%;
  height: 300px;
`;
type TMapMarker = {
  text: string;
  lat: number;
  lng: number;
};

class Case extends React.PureComponent<ICaseProps, ICaseState> {
  static propTypes: { [key in keyof ICaseProps]: any } = {
    match: PropTypes.object,
    params: PropTypes.object,
    id: PropTypes.string
  };

  public static defaultProps = {
    match: { params: { id: "" } },
    params: { id: "" },
    id: ""
  };

  state = {
    title: "",
    address: "",
    description: "",
    occurred_at: "",
    img: "",
    coordinates: [52.517038, 13.401267],
    is_loaded: false,
    is_error: false
  };
  componentDidMount() {
    let id: string = this.props.match.params.id;
    get(`https://bikewise.org:443/api/v2/incidents/${id}`).then(response => {
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

  renderGoogleMap() {
    return (
      <MapWrapper>
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
      </MapWrapper>
    );
  }
  render() {
    return (
      <CaseWrapper>
        {this.renderGoogleMap()}
        <h1>{this.state.title}</h1>
        <h3>{`Stolen ${this.state.occurred_at} at ${this.state.address}`}</h3>
        <ImgDescWrapper>
          <CaseImgWrapper>
            <CaseImg src={this.state.img} alt="N/A" />
          </CaseImgWrapper>
          <DescWrapper>
            <h1>DESCRIPTION OF INCEDENT</h1>
            <h3>{this.state.description}</h3>
          </DescWrapper>
        </ImgDescWrapper>
      </CaseWrapper>
    );
  }
}

export default Case;
