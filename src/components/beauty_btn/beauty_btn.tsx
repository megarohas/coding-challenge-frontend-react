import * as React from "react";
import styled from "../../theme";

interface IBeautyBtnProps {
  value: string;
  doAction(): void;
}
const BeautyBtnWrapper = styled.div`
  border: 3px solid black;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 8px;
  box-shadow: 3px 3px 0px rgba(0, 0, 0, 1);
  font-size: 20px;
  user-select: none;
  cursor: pointer;
  &:active {
    background-color: black;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 1);
    color: white;
  }
`;

class BeautyBtn extends React.PureComponent<IBeautyBtnProps> {
  render() {
    return (
      <BeautyBtnWrapper
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
