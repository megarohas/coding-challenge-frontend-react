import * as React from "react";
import styled from "../../theme";

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

class Header extends React.PureComponent {
  render() {
    return (
      <HeaderWrapper>
        <img style={{ height: "60px" }} src="/fav.ico" />{" "}
        <div style={{ marginLeft: "20px" }}>
          <div style={{ fontSize: "55px", marginBottom: "-20px" }}>
            Police Department of Berlin
          </div>
          <div style={{ fontSize: "30px" }}>Stolen bykes</div>
        </div>
      </HeaderWrapper>
    );
  }
}

export default Header;
