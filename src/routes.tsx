import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ContactPicker from "./components/contact-api";

const route = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contact-api" element={<ContactPicker />} />
      </Routes>
    </BrowserRouter>
  );
};

export default route;
