import * as React from "react";
import styled from "../../theme";
import BeautyBtn from "../beauty_btn/beauty_btn";
import PropTypes from "prop-types";

interface IPaginatorProps {
  page: number;
  total_pages: number;
  setPage(page: number): void;
}

const PaginatorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 25px;
  margin-bottom: 100px;
`;

class Paginator extends React.PureComponent<IPaginatorProps> {
  static propTypes: { [key in keyof IPaginatorProps]: any } = {
    page: PropTypes.number,
    total_pages: PropTypes.number,
    setPage: PropTypes.func
  };

  renderPage(props: IPaginatorProps) {
    return (
      <BeautyBtn
        inActive={props.page === this.props.page}
        value={props.page.toString()}
        doAction={() => {
          props.setPage(props.page);
        }}
      />
    );
  }

  generateIndexes() {
    let pages = [];
    if (this.props.total_pages === 0) {
      return [];
    } else if (this.props.total_pages === 1) {
      return [1];
    } else if (this.props.total_pages === 2) {
      return [1, 2];
    } else if (this.props.total_pages === 3) {
      return [1, 2, 3];
    } else if (this.props.total_pages === this.props.page) {
      return [this.props.page - 2, this.props.page - 1, this.props.page];
    } else if (this.props.page === 1) {
      return [this.props.page, this.props.page + 1, this.props.page + 2];
    } else {
      return [this.props.page - 1, this.props.page, this.props.page + 1];
    }
    return [];
  }

  renderPages() {
    let pages = new Array(3).fill(3);

    let indexes: Array<number> = [];
    indexes = this.generateIndexes();
    return (
      indexes.map((item: number) => {
        return (
          <div key={item}>
            {" "}
            {this.renderPage({
              page: item,
              total_pages: this.props.total_pages,
              setPage: this.props.setPage
            })}
          </div>
        );
      }) || []
    );
  }
  render() {
    return (
      <PaginatorWrapper>
        <BeautyBtn
          inActive={this.props.page === 1}
          value="<< First"
          doAction={() => {
            this.props.setPage(1);
          }}
        />
        <BeautyBtn
          inActive={this.props.page === 1}
          value="< Prev"
          doAction={() => {
            if (this.props.page - 1 >= 1)
              this.props.setPage(this.props.page - 1);
          }}
        />
        {this.renderPages()}
        <BeautyBtn
          inActive={this.props.page === this.props.total_pages}
          value="Next >"
          doAction={() => {
            if (this.props.page + 1 <= this.props.total_pages)
              this.props.setPage(this.props.page + 1);
          }}
        />
        <BeautyBtn
          inActive={this.props.page === this.props.total_pages}
          value="Last >>"
          doAction={() => {
            this.props.setPage(this.props.total_pages);
          }}
        />
      </PaginatorWrapper>
    );
  }
}

export default Paginator;
