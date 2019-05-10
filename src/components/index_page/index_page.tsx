import * as React from "react";
import styled from "../../theme";
import { get } from "../../helpers/fetcher.js";
import CaseListItem from "../case_list_item/case_list_item";
import CaseList from "../case_list/case_list";
import CaseCount from "../case_count/case_count";
import FindCasesBar from "../find_cases_bar/find_cases_bar";
import Paginator from "../paginator/paginator";
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
  total_pages: number;
  proximity: string;
  incident_type: string;
  is_loading: boolean;
  is_error: boolean;
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

type TPaginateCasesProps = {
  cases: Array<TCase>;
  page: number;
  per_page: number;
};
type TCalculateTotalPagesProps = {
  cases: Array<TCase>;
  per_page: number;
};

function paginateCases(props: TPaginateCasesProps) {
  let max: number = props.per_page * props.page - 1;
  let min: number = props.per_page * props.page - props.per_page;
  let inRange = (index: number) => index <= max && index >= min;
  return props.cases.filter((item: TCase, index: number) => inRange(index));
}

function calcTotalPages(props: TCalculateTotalPagesProps) {
  return Math.ceil(props.cases.length / props.per_page);
}

class IndexPage extends React.PureComponent<{}, IIndexPageState> {
  state: IIndexPageState = {
    cases: [],
    all_cases: [],
    per_page: 5,
    total_pages: 1,
    query: "",
    occurred_before: "",
    occurred_after: "",
    page: 1,
    proximity: "52.517038,13.401267",
    incident_type: "theft",
    is_loading: true,
    is_error: false
  };

  getCases(props: TCaseRequestProps) {
    this.setState({ is_loading: true });
    get(`https://bikewise.org:443/api/v2/incidents?${genParams(props)}`)
      .then(response => {
        let _cases: Array<TCase> = parseIncedents(response.incidents);
        this.setState({
          is_loading: false,
          total_pages: calcTotalPages({
            cases: _cases,
            per_page: this.state.per_page
          }),
          cases: paginateCases({
            cases: _cases,
            page: this.state.page,
            per_page: this.state.per_page
          }),
          all_cases: _cases
        });
      })
      .catch(err => {
        this.setState({ is_error: true });
      });
  }

  componentDidMount() {
    this.getCases({
      query: "",
      per_page: 1000000000000000000,
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
                  per_page: 1000000000000000000,
                  occurred_before: this.state.occurred_before,
                  occurred_after: this.state.occurred_after,
                  page: 1,
                  proximity: this.state.proximity,
                  incident_type: this.state.incident_type
                })
            );
          }}
        />
        {this.state.is_error ? (
          <div>Error </div>
        ) : this.state.is_loading ? (
          <div>Loading ... </div>
        ) : this.state.all_cases.length == 0 ? (
          <div>No results</div>
        ) : (
          <React.Fragment>
            <CaseCount case_count={this.state.all_cases.length} />
            <CaseList cases={this.state.cases} />
            <Paginator
              page={this.state.page}
              total_pages={this.state.total_pages}
              setPage={(page: number) =>
                this.setState({
                  page,
                  cases: paginateCases({
                    cases: this.state.all_cases,
                    page: page,
                    per_page: this.state.per_page
                  })
                })
              }
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default IndexPage;
