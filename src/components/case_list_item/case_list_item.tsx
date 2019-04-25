import * as React from "react";
import styled from "../../theme/index";
import { TCase } from "../../types";

interface ICaseListItemProps {
  case: TCase;
}

class CaseListItem extends React.PureComponent<ICaseListItemProps> {
  render() {
    return (
      <div>
        <div>{`Case: ${this.props.case.title}`}</div>
        <img src={this.props.case.thumbnail_img} />
      </div>
    );
  }
}

export default CaseListItem;
