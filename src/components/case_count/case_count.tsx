import * as React from "react";
import styled from "../../theme";
import PropTypes from "prop-types";

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
  static propTypes: { [key in keyof ICaseCountProps]: any } = {
    case_count: PropTypes.number
  };

  public static defaultProps = {
    case_count: 0
  };

  render() {
    return (
      <CaseCountWrapper>{`Total cases: ${
        this.props.case_count
      }`}</CaseCountWrapper>
    );
  }
}

export default CaseCount;
