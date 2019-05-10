import * as React from "react";
import styled from "../../theme";
import { TCase } from "../../types";
import PropTypes from "prop-types";

interface ICaseListItemProps {
  case: TCase;
}

const CaseListItemWrapper = styled.div`
  display: flex;
  padding: 20px 10px;
  border: 3px solid black;
  margin-bottom: 20px;
`;
const CaseListItemInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const CaseImg = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 15px;
  min-width: 100px;
  min-height: 100px;
`;

class CaseListItem extends React.PureComponent<ICaseListItemProps> {
  static propTypes: { [key in keyof ICaseListItemProps]: any } = {
    case: PropTypes.object
  };

  public static defaultProps = {
    case: {
      title: "",
      description: "",
      id: 0,
      thumbnail_img: "",
      address: "",
      occurred_at: 0
    }
  };
  render() {
    const _case: TCase = this.props.case;
    const _date: Date = new Date(_case.occurred_at * 1000);
    return (
      <CaseListItemWrapper>
        <CaseImg src={_case.thumbnail_img} alt="N/A" />
        <CaseListItemInfoWrapper>
          <div>
            <a href={`/case/${_case.id}`}>{`Case: ${_case.title}`}</a>
            <div>{`Desc: ${_case.description}`}</div>
          </div>
          <div style={{ marginTop: "10px" }}>
            {`${_date.toDateString()} - ${_case.address}`}
          </div>
        </CaseListItemInfoWrapper>
      </CaseListItemWrapper>
    );
  }
}

export default CaseListItem;
