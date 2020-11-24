import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: '#1e91b3'
    },
    secondary: {
      main: '#000a0d'
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[500]
    }
  },
  shadows,
  typography
});

export default theme;
