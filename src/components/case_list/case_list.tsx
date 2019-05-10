import * as React from "react";
import styled from "../../theme";
import { TCase } from "../../types";
import CaseListItem from "../case_list_item/case_list_item";
import PropTypes from "prop-types";

interface ICaseListProps {
  cases: Array<TCase>;
}

class CaseList extends React.PureComponent<ICaseListProps> {
  static propTypes: { [key in keyof ICaseListProps]: any } = {
    cases: PropTypes.array
  };

  public static defaultProps = {
    cases: []
  };
  render() {
    return (
      <React.Fragment>
        {this.props.cases.map((item: TCase) => (
          <CaseListItem case={item} key={`case_list_item_${item.id}`} />
        ))}
      </React.Fragment>
    );
  }
}

export default CaseList;
