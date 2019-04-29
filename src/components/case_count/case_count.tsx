import * as React from "react";
import styled from "../../theme";

interface ICaseCountProps {
  case_count: number;
}

const CaseCountWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 25px;
  margin-bottom: 20px;
`;

class CaseCount extends React.PureComponent<ICaseCountProps> {
  render() {
    return (
      <CaseCountWrapper>{`Total cases: ${
        this.props.case_count
      }`}</CaseCountWrapper>
    );
  }
}

export default CaseCount;
