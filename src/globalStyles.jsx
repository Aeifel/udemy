import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
    :root{
        --textPrimary:#1C1D1F;
        --textSecondary:#A435F0;
        --dark:#0056D2;
        --bgColor:#FFFFFF;
        --grayLight:#F7F9FA;
        --backgroundLight:#FFFFFF;
        --blueLight:#EBF3FF;
        --blueMedium:#5624D0;
        --blueDark:#0056D2;
    }
  body {
    margin: 0;
    padding: 0;
background:var(--bgColor);     
  }
`;
export default GlobalStyle;