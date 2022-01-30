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

function App() {
  return (
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
  );
}

export default App;
