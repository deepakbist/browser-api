import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ContactPicker from "./components/contact-api";
import Geolocation from "./components/geolocation-api";
import NotFound from "./components/not-found";
import Layout from "./Layout";

const route = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="contact-api" element={<ContactPicker />} />
          <Route path="geolocation-api" element={<Geolocation />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default route;
