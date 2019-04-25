import * as React from "react";
import styled from "../../theme/index";
import { get } from "../../helpers/fetcher.js";
import CaseListItem from "../case_list_item/case_list_item";
import CaseList from "../case_list/case_list";
import { TCase } from "../../types";

interface IIndexPageState {
  cases: Array<TCase>;
}

class IndexPage extends React.PureComponent<{}, IIndexPageState> {
  state: IIndexPageState = {
    cases: []
  };

  componentDidMount() {
    get(
      "https://bikewise.org:443/api/v2/incidents?page=1&per_page=10&proximity_square=100"
    ).then(response => {
      console.log("cases:", response.incidents);
      this.setState({
        cases: response.incidents.map((item: any) => {
          return {
            title: item.title,
            description: item.description,
            id: item.id,
            thumbnail_img: item.media.image_url_thumb
          };
        })
      });
    });
  }

  render() {
    return (
      <div>
        <CaseList cases={this.state.cases} />
      </div>
    );
  }
}

export default IndexPage;