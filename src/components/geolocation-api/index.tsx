import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Stack,
  Alert,
  AlertTitle,
  Link,
  Button,
  Divider,
} from "@mui/material";

const GeoLocationAPI = () => {
  const isSupported = "geolocation" in navigator;
  const [locations, setLocations] =
    useState<GeolocationPosition[] | null>(null);
  const [error, setError] = useState<string>("");
  const [watchId, setWatchId] = useState<number | null>(null);

  const handleClick = async () => {
    await navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  };

  const handleSuccess = (location: any) => {
    const newLocation = locations ? locations.concat(location) : [location];
    setLocations(newLocation);
  };

  const handleError = () => {
    setError("Error in retrieving location");
  };

  const handleLocationWatch = async () => {
    const watchId = await navigator.geolocation.watchPosition(handleSuccess);
    setWatchId(watchId);
  };

  const clearWatchId = async () => {
    if (watchId) await navigator.geolocation.clearWatch(watchId);
    setWatchId(null);
  };

  if (!isSupported)
    return (
      <Container>
        <Stack direction="column">
          <Alert severity="error" sx={{ mt: 4 }}>
            <AlertTitle>Error</AlertTitle>
            Sorry! Geolocation API is not supported on your browser
          </Alert>
          <Typography sx={{ mt: 2 }}>
            You can read more about contact picker api{" "}
            <Link href="https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API">
              here
            </Link>
          </Typography>
        </Stack>
      </Container>
    );

  return (
    <Container>
      <Box>
        <Typography
          align="center"
          sx={{ mt: 4 }}
          variant="h4"
          component="h1"
          gutterBottom
        >
          Geolocation API
        </Typography>
        <Divider />
        <Typography sx={{ mt: 4 }}>
          Click on the button to find your current location
        </Typography>
        {watchId ? (
          <Button onClick={clearWatchId} variant="contained">
            Stop watching
          </Button>
        ) : (
          <Stack direction="row">
            <Box sx={{ height: 3, mr: 3 }}>
              <Button onClick={handleClick} variant="contained">
                Find My location
              </Button>
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Box sx={{ height: 3 }}>
              <Button onClick={handleLocationWatch} variant="contained">
                Watch my location
              </Button>
            </Box>
          </Stack>
        )}
      </Box>
      {locations &&
        locations.map((location, key) => {
          return (
            <Box sx={{ mt: 4 }}>
              <Divider sx={{ mt: 4 }} />
              <Typography>
                {" "}
                {`Current position -> Latitude: ${
                  location?.coords?.latitude
                }° , Longitude: ${
                  location.coords.longitude
                } °, Location retrived at ${new Date(
                  location.timestamp
                ).toLocaleString()}`}
              </Typography>
              <Button
                onClick={() => {
                  setLocations(null);
                  clearWatchId();
                }}
              >
                clear
              </Button>
            </Box>
          );
        })}
      {error && (
        <Stack direction="column">
          <Alert severity="error" sx={{ mt: 4 }}>
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        </Stack>
      )}
    </Container>
  );
};

export default GeoLocationAPI;
