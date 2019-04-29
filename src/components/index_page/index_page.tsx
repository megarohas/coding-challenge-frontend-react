import * as React from "react";
import styled from "../../theme";
import { get } from "../../helpers/fetcher.js";
import CaseListItem from "../case_list_item/case_list_item";
import CaseList from "../case_list/case_list";
import CaseCount from "../case_count/case_count";
import FindCasesBar from "../find_cases_bar/find_cases_bar";
import { TCase } from "../../types";
import { parseIncedents } from "../../helpers/parse_incedents";
import { genParams } from "../../helpers/fetcher";

interface IIndexPageState {
  cases: Array<TCase>;
  all_cases: Array<TCase>;
  per_page: number;
  query: string;
  occurred_after: string;
  occurred_before: string;
  page: number;
  proximity: string;
  incident_type: string;
}

type TCaseRequestProps = {
  query: string;
  per_page: number;
  occurred_before: string;
  occurred_after: string;
  page: number;
  proximity: string;
  incident_type: string;
};

class IndexPage extends React.PureComponent<{}, IIndexPageState> {
  state: IIndexPageState = {
    cases: [],
    all_cases: [],
    per_page: 1000000000000000000,
    query: "",
    occurred_before: "",
    occurred_after: "",
    page: 1,
    proximity: "52.517038,13.401267",
    incident_type: "theft"
  };

  getCases(props: TCaseRequestProps) {
    get(`https://bikewise.org:443/api/v2/incidents?${genParams(props)}`).then(
      response => {
        console.log("cases:", response.incidents);
        this.setState({
          cases: parseIncedents(response.incidents),
          all_cases: parseIncedents(response.incidents)
        });
      }
    );
  }

  componentDidMount() {
    this.getCases({
      query: "",
      per_page: this.state.per_page,
      occurred_before: "",
      occurred_after: "",
      page: 1,
      proximity: this.state.proximity,
      incident_type: this.state.incident_type
    });
  }

  render() {
    return (
      <React.Fragment>
        <FindCasesBar
          query={this.state.query}
          occurred_after={this.state.occurred_after}
          occurred_before={this.state.occurred_before}
          findCases={({ query, occurred_after, occurred_before }) => {
            this.setState(
              { query, occurred_after, occurred_before, page: 1 },
              () =>
                this.getCases({
                  query: this.state.query,
                  per_page: this.state.per_page,
                  occurred_before: this.state.occurred_before,
                  occurred_after: this.state.occurred_after,
                  page: 1,
                  proximity: this.state.proximity,
                  incident_type: this.state.incident_type
                })
            );
          }}
        />
        <CaseCount case_count={this.state.all_cases.length} />
        <CaseList cases={this.state.cases} />
      </React.Fragment>
    );
  }
}

export default IndexPage;
