import * as React from "react";

import styled from "../../theme/index";
import { get } from "../../helpers/fetcher.js";

type CaseObgect = {
  title: string;
  description: string;
  id: number;
  thumbnail_img: string;
};
interface ICaseListItemProps {
  case: CaseObgect;
}

class CaseListItem extends React.PureComponent<ICaseListItemProps> {
  render() {
    return (
      <div>
        lool
        <div>{`Case: ${this.props.case.title}`}</div>
        <img src={this.props.case.thumbnail_img} />
      </div>
    );
  }
}

export default CaseListItem;
