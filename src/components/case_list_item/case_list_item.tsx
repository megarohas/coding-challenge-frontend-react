import * as React from "react";
import styled from "../../theme/index";
import { TCase } from "../../types";

interface ICaseListItemProps {
  case: TCase;
}

const CaseListItemWrapper = styled.div`
  display: flex;
  padding: 20px 10px;
  border: 3px solid black;
  margin-bottom: 20px;
`;
const CaseImg = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 15px;
  min-width: 100px;
  min-height: 100px;
`;

class CaseListItem extends React.PureComponent<ICaseListItemProps> {
  render() {
    const _case: TCase = this.props.case;
    return (
      <CaseListItemWrapper>
        <CaseImg src={_case.thumbnail_img} alt="N/A" />
        <div>
          <a href={`/case/${_case.id}`}>{`Case: ${_case.title}`}</a>
          <div>{`Desc: ${_case.description}`}</div>
        </div>
      </CaseListItemWrapper>
    );
  }
}

export default CaseListItem;
