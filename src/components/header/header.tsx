import * as React from "react";
import styled from "../../theme";

const HeaderWrapper = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: black;
  text-decoration: none;
`;
const HeaderTextWrapper = styled.div`
  margin-left: 20px;
`;
const HeaderBigText = styled.div`
  margin-bototm: -20px;
  font-size: 55px;
`;
const HeaderLittleText = styled.div`
  font-size: 30px;
`;
const HeaderLogo = styled.img`
  height: 60px;
`;

class Header extends React.PureComponent {
  render() {
    return (
      <HeaderWrapper href="/">
        <HeaderLogo src="/fav.ico" />
        <HeaderTextWrapper>
          <HeaderBigText>Police Department of Berlin</HeaderBigText>
          <HeaderLittleText>Stolen bykes</HeaderLittleText>
        </HeaderTextWrapper>
      </HeaderWrapper>
    );
  }
}

export default Header;
