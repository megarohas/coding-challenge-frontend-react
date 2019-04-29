import * as React from "react";
import styled from "../../theme";
import BeautyBtn from "../beauty_btn/beauty_btn";

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

  renderPages() {
    let pages = new Array(this.props.total_pages).fill(this.props.total_pages);
    console.log("pages", pages);
    console.log("pages", pages);
    return pages.map((item: number, index: number) => {
      console.log("page");
      return this.renderPage({
        page: index + 1,
        total_pages: this.props.total_pages,
        setPage: this.props.setPage
      });
    });
  }
  render() {
    console.log("this.props", this.props);
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
