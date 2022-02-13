import { componentMapperInterface } from "./types"

//--------------------components------------------------
import ContactPicker from "./components/contact-api"
import Geolocation from "./components/geolocation-api"
import DragAndDrop from "./components/drag-and-drop"

//--------------------icons------------------------
import CallIcon from "@mui/icons-material/Call"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import PanToolIcon from "@mui/icons-material/PanTool"

export const componentMapper: componentMapperInterface[] = [
  {
    component: ContactPicker,
    name: "Contact API",
    url: "contact-api",
    icon: CallIcon,
    mdnLink:
      "https://developer.mozilla.org/en-US/docs/Web/API/Contact_Picker_API",
  },
  {
    component: Geolocation,
    name: "Geolocation API",
    url: "geolocation-api",
    icon: LocationOnIcon,
    mdnLink: "https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API",
  },
  {
    component: DragAndDrop,
    name: "Drag And Drop API",
    url: "drag-and-drop",
    icon: PanToolIcon,
    mdnLink:
      "https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API",
  },
]
