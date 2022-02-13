import { useContext } from "react"
import { Container, Box, IconButton, Divider, Stack } from "@mui/material"
import { ColorModeContext } from "./theme/color-mode-context"
import { useTheme } from "@mui/material/styles"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import { Outlet, useNavigate, useLocation } from "react-router-dom"

const Layout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  return (
    <Container maxWidth="md">
      <Stack direction="row">
        {location.pathname !== "/" && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBackIosIcon />
            </IconButton>
          </Box>
        )}

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
      </Stack>

      <Divider />
      <Outlet />
    </Container>
  )
}

export default Layout
