import {
  Button,
  Typography,
  Box,
  Stack,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useEffect, useState } from "react";

const ContactPicker = () => {
  const [isContactApiSupported, setContactApiSupported] =
    useState<boolean>(true);

  const [contacts, setContacts] = useState<null | any[]>(null);

  const [errorInGettingContact, setErrorInGettingContact] =
    useState<boolean>(false);

  useEffect(() => {
    const supported = "contacts" in navigator && "ContactsManager" in window;
    if (!supported) setContactApiSupported(false);
  });

  const handleClick = async () => {
    setErrorInGettingContact(false);
    const props = ["name", "email", "tel", "address", "icon"];
    const opts = { multiple: true };
    try {
      // @ts-ignore navigator contacts error
      const contacts = await navigator?.contacts.select(props, opts);
      if (contacts) setContacts(contacts);
      //   handleResults(contacts);
    } catch (err) {
      console.error("error in picking contacts", err);
      setErrorInGettingContact(true);
      // Handle any errors here.
    }
  };

  if (!isContactApiSupported) {
    return (
      <Box>
        <Typography variant="h5" sx={{ mt: 3 }}>
          Sorry contact picker is not supported on your device
        </Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="body1" sx={{ fontWeight: 700 }}>
        Click on the button to select contact details
      </Typography>
      <Button sx={{ mt: 2 }} variant="contained" onClick={handleClick}>
        Click Me
      </Button>

      {contacts && contacts.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Telephone</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>icon</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact, i) => (
                <TableRow key={i}>
                  <TableCell>
                    {contact.name ? contact.name.join(", ") : ""}
                  </TableCell>
                  <TableCell>
                    {contact.tel ? contact.tel.join(", ") : ""}
                  </TableCell>
                  <TableCell>
                    {contact.email ? contact.email.join(", ") : ""}
                  </TableCell>
                  <TableCell>
                    {contact.address ? contact.address.join(", ") : ""}
                  </TableCell>
                  <TableCell>
                    {contact.icon ? contact.icon.join(", ") : ""}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {errorInGettingContact && (
        <Typography sx={{ mt: 3, color: "red" }}>
          Error occured in getting Contact details
        </Typography>
      )}
    </Box>
  );
};

export default ContactPicker;
