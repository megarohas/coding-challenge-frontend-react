import * as React from "react";
import styled from "../../theme";
import PropTypes from "prop-types";

interface IBeautyBtnProps {
  value: string;
  doAction(): void;
  inActive?: boolean;
}
const BeautyBtnWrapper = styled.div`
  color:${(props: any) => (props.inActive ? "white;" : "black;")}
  background-color:${(props: any) => (props.inActive ? "black;" : "white;")}
  cursor: ${(props: any) => (props.inActive ? "not-allowed;" : "pointer;")}
  box-shadow: ${(props: any) =>
    props.inActive ? "none" : "3px 3px 0px rgba(0, 0, 0, 1);"}
  border: 3px solid black;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 8px;
  font-size: 20px;
  user-select: none;
  &:active {
    background-color: black;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 1);
    color: white;
  }
`;

class BeautyBtn extends React.PureComponent<IBeautyBtnProps> {
  static propTypes: { [key in keyof IBeautyBtnProps]: any } = {
    value: PropTypes.string,
    doAction: PropTypes.func,
    inActive: PropTypes.bool
  };
  public static defaultProps = {
    value: "",
    doAction: () => {},
    inActive: false
  };

  render() {
    return (
      <BeautyBtnWrapper
        inActive={this.props.inActive}
        onClick={() => {
          this.props.doAction();
        }}
      >
        {this.props.value}
      </BeautyBtnWrapper>
    );
  }
}

export default BeautyBtn;
