import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";

function App() {
  return (
    <Container maxWidth="md">
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
        </List>
      </Box>
    </Container>
  );
}

export default App;
