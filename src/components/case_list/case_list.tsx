import * as React from "react";

import styled from "../../theme/index";
import { get } from "../../helpers/fetcher.js";
import CaseListItem from "../case_list_item/case_list_item";

type CaseObject = {
  title: string;
  description: string;
  id: number;
  thumbnail_img: string;
};
interface ICaseListProps {
  cases: Array<CaseObject>;
}

class CaseList extends React.PureComponent<ICaseListProps> {
  render() {
    return (
      <div>
        {this.props.cases.map((item: CaseObject) => (
          <CaseListItem case={item} />
        ))}
      </div>
    );
  }
}

export default CaseList;
