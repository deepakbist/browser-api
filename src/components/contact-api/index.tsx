import { Button, Container, Typography, Stack, Box } from "@mui/material";
import { useEffect, useState } from "react";

const ContactPicker = () => {
  const [isContactApiSupported, setContactApiSupported] =
    useState<boolean>(true);
  useEffect(() => {
    const supported = "contacts" in navigator;
    if (!supported) setContactApiSupported(false);
  });
  if (!isContactApiSupported) {
    return (
      <Box>
        <Typography variant="h5">
          Sorry contact picker is not supported on your device
        </Typography>
      </Box>
    );
  }
  return (
    <Container>
      <Stack direction="row" spacing={2}>
        <Button>Click on the button to select contact details</Button>
      </Stack>
    </Container>
  );
};

export default ContactPicker;
