import { useContext } from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { ColorModeContext } from "./theme/color-mode-context";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

function App() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          color: "text.primary",
          borderRadius: 1,
          p: 3,
        }}
      >
        {theme.palette.mode} mode
        <IconButton
          sx={{ ml: 1 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Box>
      <Box
        p={2}
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Web API's
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CallIcon />
            </ListItemIcon>
            <ListItemText>
              <Link to="contact-api">Contact API</Link>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText>
              <Link to="geolocation-api">Geolocation API</Link>
            </ListItemText>
          </ListItem>
        </List>
      </Box>
    </Container>
  );
}

export default App;
