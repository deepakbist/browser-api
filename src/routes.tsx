import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ContactPicker from "./components/contact-api";
import Geolocation from "./components/geolocation-api";
import NotFound from "./components/not-found";

const route = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<App />} />
        <Route path="/contact-api" element={<ContactPicker />} />
        <Route path="/geolocation-api" element={<Geolocation />} />
      </Routes>
    </BrowserRouter>
  );
};

export default route;
