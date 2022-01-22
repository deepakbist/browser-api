import { Button, Typography, Box, Stack } from "@mui/material";
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
    const props = ["name", "tel", "icon"];
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
        <Box sx={{ mt: 3 }}>
          <Typography>Selected Contacts: </Typography>
          {contacts.map((contact) => (
            <Stack sx={{ mt: 3 }} direction="row">
              {contact?.name && <Typography>Name: {contact.name} </Typography>}
              {contact?.tel && (
                <Typography sx={{ ml: 2 }}>Tel: {contact.tel}</Typography>
              )}
            </Stack>
          ))}
        </Box>
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
