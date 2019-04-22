//@ts-ignore
import * as styledComponents from "styled-components";

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  IThemeInterface
>;

export interface IThemeInterface {
  color: string;
}

export const theme = {
  color: "black"
};

export default styled;
export { css, injectGlobal, keyframes, ThemeProvider };
