import { Container, Typography, Alert, Link } from "@mui/material"

const ComponentLayout = ({ name, mdnLink, children }: any) => {
  return (
    <Container>
      <Typography
        align="center"
        sx={{ mt: 4 }}
        variant="h4"
        component="h1"
        gutterBottom
      >
        {name}
      </Typography>
      {children}
      <Alert severity="info" sx={{ mt: 4 }}>
        Read more about {name}{" "}
        <Link href={mdnLink} target="_blank" rel="noopener">
          here
        </Link>
      </Alert>
    </Container>
  )
}

export default ComponentLayout
