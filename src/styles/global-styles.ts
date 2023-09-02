import { createGlobalStyle } from 'styled-components';
import AsphaltLightTexture from '../app/assets/textures/asfalt-light.png';
import BedgeGrungeTexture from '../app/assets/textures/bedge-grunge.png';
import BeigePaperTexture from '../app/assets/textures/beige-paper.png';
import BlackFeltTexture from '../app/assets/textures/black-felt.png';
import GravelTexture from '../app/assets/textures/gravel.png';

export const GlobalStyle = createGlobalStyle`
  :root{
    --font-normal: 'Helvetica Neue', Helvetica, Arial, sans-serif;

    --background-dark: #65563fff;
    --background-dark-translucent: #65563f99;
    --background-darker: #362016ff;
    --background-darker-translucent: #36201699;
    --background-darkest: #0b0906ff;
    --background-darkest-translucent: #0b090699;
    --background-light: #deca9dff;
    --background-light-translucent: #deca9d99;
    --background-lightest: #b1ada6ff;
    --background-lightest-translucent: #b1ada699;

    --loader: #362016;
    --loader-text: #e7d8b0ff;
    --loader-translucent: #3620163d;

    --text-lightest: #e7d8b0ff;
    --text-lighter: #d3bb7cff;
    --text-light: #b4a099ff;
    --text-dark: #301005ff;

    --error: #cc0000;


    --gradient-dark: linear-gradient(180deg, var(--background-darker) 0%, var(--background-dark) 50%, var(--background-darkest) 100%);
    --gradient-linear-dark: linear-gradient(0deg, var(--background-darker) 0%, var(--background-darkest) 100%);
    --gradient-linear-dark-translucent: linear-gradient(0deg, var(--background-darker-translucent) 0%, var(--background-darkest-translucent) 100%);

    --gradient-light: linear-gradient(180deg, var(--background-darker) 0%, var(--background-light) 50%, var(--background-lightest) 100%);
    --gradient-linear-light: linear-gradient(180deg, var(--background-dark) -200%, var(--background-light) 200%);
    --gradient-linear-light-translucent: linear-gradient(180deg, var(--background-dark-translucent) -200%, var(--background-light-translucent) 200%);
    --blur: blur(2px);

    --texture-asphalt-light: url(${AsphaltLightTexture});
    --texture-bedge-grunge: url(${BedgeGrungeTexture});
    --texture-beige-paper: url(${BeigePaperTexture});
    --texture-black-felt: url(${BlackFeltTexture});
    --texture-gravel: url(${GravelTexture});
    --texture: var(--texture-gravel);

    --border-radius-xxs: 1rem;
    --border-radius-xs: 2rem;
    --border-radius-s: 4rem;
    --border-radius-m: 8rem;
    --border-radius-l: 16rem;
  }
  
  html,
  body {
    height: 100vh;
    width: 100vw;

    font-family: var(--font-normal);
    background: var(--texture), var(--gradient-light);
    background-repeat: round;
    color: var(--text-lightest);
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }
`;
