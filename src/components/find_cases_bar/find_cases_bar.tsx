import * as React from "react";
import styled from "../../theme";
import { TCase } from "../../types";
import BeautyBtn from "../beauty_btn/beauty_btn";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";

type TFindCasesProps = {
  query: string;
  occurred_after: string;
  occurred_before: string;
};

interface IFindCasesBarProps {
  query: string;
  occurred_after: string;
  occurred_before: string;
  findCases(props: TFindCasesProps): void;
}
interface IFindCasesBarState {
  query: string;
  occurred_after: string;
  occurred_before: string;
}

const QueryInput = styled.input`
  display: flex;
  width: ${(props: any) => props.width};
  padding: 5px 10px;
  border: 3px solid black;
  font-family: inherit;
  font-size: 20px;
  outline: none;
`;
const DateInput = styled.div`
  display: flex;
  width: ${(props: any) => props.width};
  padding: 5px 10px;
  border: 3px solid black;
  font-family: inherit;
  font-size: 20px;
  outline: none;
`;
const FindCasesBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const DateInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 20%;
`;

class FindCasesBar extends React.PureComponent<
  IFindCasesBarProps,
  IFindCasesBarState
> {
  static propTypes: { [key in keyof IFindCasesBarProps]: any } = {
    query: PropTypes.string,
    occurred_after: PropTypes.string,
    occurred_before: PropTypes.string,
    findCases: PropTypes.func
  };
  state = {
    query: this.props.query,
    occurred_after: this.props.occurred_after,
    occurred_before: this.props.occurred_before
  };

  render() {
    return (
      <FindCasesBarWrapper>
        <QueryInput
          width="40%"
          value={this.state.query}
          placeholder="Search case descriptions"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            this.setState({ query: e.target.value })
          }
        />

        <DateInputWrapper>
          <DatePicker
            customInput={<QueryInput width="80%" placeholder="from" />}
            selected={new Date(this.state.occurred_after || "0")}
            onChange={e => {
              e = e || new Date();
              this.setState({ occurred_after: e.toString() });
            }}
          />
          <img src="https://icongr.am/material/calendar-multiselect.svg" />
        </DateInputWrapper>
        <DateInputWrapper>
          <DatePicker
            customInput={<QueryInput width="80%" />}
            selected={new Date(this.state.occurred_before || "0")}
            onChange={e => {
              e = e || new Date();
              this.setState({ occurred_before: e.toString() });
            }}
          />
          <img src="https://icongr.am/material/calendar-multiselect.svg" />
        </DateInputWrapper>
        <BeautyBtn
          value="Find Cases"
          doAction={() => {
            this.props.findCases({
              query: this.state.query,
              occurred_after: this.state.occurred_after,
              occurred_before: this.state.occurred_before
            });
          }}
        />
      </FindCasesBarWrapper>
    );
  }
}

export default FindCasesBar;
