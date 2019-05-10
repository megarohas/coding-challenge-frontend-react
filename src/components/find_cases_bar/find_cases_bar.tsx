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
const DateInput = styled.input`
  display: flex;
  width: ${(props: any) => props.width};
  padding: 3px 10px;
  border: 3px solid black;
  font-family: inherit;
  font-size: 20px;
  outline: none;
  margin-left: 5px;
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

  public static defaultProps = {
    query: "",
    occurred_after: "0",
    occurred_before: "0",
    findCases: () => {}
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
          From
          <DateInput
            width="80%"
            type="date"
            onChange={(e: any) => {
              e = e || new Date();
              let value: string = Date.parse(e.target.value)
                .toString()
                .substr(0, Date.parse(e.target.value).toString().length - 3);

              this.setState({
                occurred_after: value
              });
            }}
          />
        </DateInputWrapper>
        <DateInputWrapper>
          To
          <DateInput
            width="80%"
            type="date"
            onChange={(e: any) => {
              e = e || new Date();
              let value: string = Date.parse(e.target.value)
                .toString()
                .substr(0, Date.parse(e.target.value).toString().length - 3);

              this.setState({
                occurred_before: value
              });
            }}
          />
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
