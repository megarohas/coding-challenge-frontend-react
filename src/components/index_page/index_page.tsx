import * as React from "react";
import styled from "../../theme";
import { get } from "../../helpers/fetcher.js";
import CaseListItem from "../case_list_item/case_list_item";
import CaseList from "../case_list/case_list";
import FindCasesBar from "../find_cases_bar/find_cases_bar";
import { TCase } from "../../types";
import { parseIncedents } from "../../helpers/parse_incedents";
import { genParams } from "../../helpers/fetcher";

interface IIndexPageState {
  cases: Array<TCase>;
  per_page: number;
  query: string;
  occurred_after: number;
  occurred_before: number;
  page: number;
}

type TCaseRequestProps = {
  query: string;
  per_page: number;
  occurred_before: number;
  occurred_after: number;
  page: number;
};

class IndexPage extends React.PureComponent<{}, IIndexPageState> {
  state: IIndexPageState = {
    cases: [],
    per_page: 10,
    query: "",
    occurred_before: Date.now(),
    occurred_after: 0,
    page: 1
  };

  getCases(props: TCaseRequestProps) {
    get(`https://bikewise.org:443/api/v2/incidents?${genParams(props)}`).then(
      response => {
        console.log("cases:", response.incidents);
        this.setState({
          cases: parseIncedents(response.incidents)
        });
      }
    );
  }

  componentDidMount() {
    this.getCases({
      query: "",
      per_page: this.state.per_page,
      occurred_before: Date.now(),
      occurred_after: 0,
      page: 1
    });
  }

  render() {
    return (
      <React.Fragment>
        <FindCasesBar
          query={this.state.query}
          occurred_after={this.state.occurred_after}
          occurred_before={this.state.occurred_before}
          findCases={() => {
            console.log("findCases");
          }}
        />
        <CaseList cases={this.state.cases} />
      </React.Fragment>
    );
  }
}

export default IndexPage;
