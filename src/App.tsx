import { createElement } from "react"
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { Link } from "react-router-dom"
import { componentMapper } from "./componentMapper"

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
        {componentMapper.map((component) => (
          <ListItem key={component.name}>
            <ListItemIcon>{createElement(component.icon)}</ListItemIcon>
            <ListItemText>
              <Link to={component.url}>{component.name}</Link>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default App
