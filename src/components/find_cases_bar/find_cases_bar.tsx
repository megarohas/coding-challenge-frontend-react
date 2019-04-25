import * as React from "react";
import styled from "../../theme";
import { TCase } from "../../types";

interface IFindCasesBarProps {
  query: string;
  occurred_after: number;
  occurred_before: number;
  findCases(): void;
}

const QueryInput = styled.input`
  display: flex;
  width: ${(props: any) => props.width};
  padding: 5px 10px;
  border: 3px solid black;
  font-family: inherit;
  font-size: 20px;
  box-shadow: 3px 3px 0px rgba(0, 0, 0, 1); /* Параметры тени */
`;
const FindCasesBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

class FindCasesBar extends React.PureComponent<IFindCasesBarProps> {
  render() {
    return (
      <FindCasesBarWrapper>
        <QueryInput width="40%" placeholder="Search case descriptions" />
        <QueryInput width="10%" placeholder="from" />
        <img src="https://icongr.am/material/calendar-multiselect.svg" />
        <QueryInput width="10%" placeholder="to" />
        <img src="https://icongr.am/material/calendar-multiselect.svg" />
      </FindCasesBarWrapper>
    );
  }
}

export default FindCasesBar;
