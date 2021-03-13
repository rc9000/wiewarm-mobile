import List from "./List.js";
import './App.css';
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

function App() {

  //https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=FDD835&secondary.color=C62828
  const themeInstance = createMuiTheme({
    palette: {
      primary: {
        main: '#fdd835',
      },
      secondary: {
        main: '#c62828',
      },
      background: {
        default: "#ffffff"
      }
    },
  });

  return (
    <Container maxWidth="lg">
      <ThemeProvider theme={themeInstance}>
      <Box color="primary.main" >
        <Typography variant="h1" gutterBottom>wiewarm.ch</Typography>
        <Typography variant="h2" color="primary.dark" gutterBottom>aktuelli Tämperature</Typography>
        <List maxitems="10"/>
      </Box>
    </ThemeProvider>
    </Container>
  );
}

export default App;
