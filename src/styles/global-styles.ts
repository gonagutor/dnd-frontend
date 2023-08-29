import { createGlobalStyle } from 'styled-components';
import AsphaltLightTexture from '../app/assets/textures/asfalt-light.png';
import BedgeGrungeTexture from '../app/assets/textures/bedge-grunge.png';
import BeigePaperTexture from '../app/assets/textures/beige-paper.png';
import BlackFeltTexture from '../app/assets/textures/black-felt.png';
import GravelTexture from '../app/assets/textures/gravel.png';

export const GlobalStyle = createGlobalStyle`
  :root{
    --font-normal: 'Helvetica Neue', Helvetica, Arial, sans-serif;

    --background-dark:#65563f;
    --background-darker: #362016;
    --background-darkest: #0b0906;
    --background-light: #deca9d;
    --background-lightest: #b1ada6;
    --background-selected: #3620163E;

    --text-lightest: #e7d8b0;
    --text-lighter: #d3bb7c
    --text-light: #b4a099;
    --text-dark: #301005;

    --gradient-dark: linear-gradient(180deg, var(--background-darker) 0%, var(--background-dark) 50%, var(--background-darkest) 100%);
    --gradient-light: linear-gradient(180deg, var(--background-darker) 0%, var(--background-light) 50%, var(--background-lightest) 100%);

    --texture-asphalt-light: url(${AsphaltLightTexture});
    --texture-bedge-grunge: url(${BedgeGrungeTexture});
    --texture-beige-paper: url(${BeigePaperTexture});
    --texture-black-felt: url(${BlackFeltTexture});
    --texture-gravel: url(${GravelTexture});
    --texture: var(--texture-bedge-grunge);

    --border-radius-xxs: 1rem;
    --border-radius-xs: 2rem;
    --border-radius-s: 4rem;
    --border-radius-m: 8rem;
    --border-radius-l: 16rem;
  }
  
  html,
  body {
    height: 100%;
    width: 100%;

    font-family: var(--font-normal);
    background: var(--texture), var(--gradient-light);
    color: var(--text-lightest);
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }
`;
