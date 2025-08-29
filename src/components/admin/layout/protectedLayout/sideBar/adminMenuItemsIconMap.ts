import {
  FaDatabase,
  FaPlateWheat,
  FaUnity,
  FaUserLarge,
} from "react-icons/fa6";
import { RiDashboardFill } from "react-icons/ri";

const adminMenuItemsIconMap = {
  RiDashboardFill,
  FaUserLarge,
  FaUnity,
  FaDatabase,
  FaPlateWheat,
};

export type AdminMenuItemsIconMapType = keyof typeof adminMenuItemsIconMap;

export default adminMenuItemsIconMap;
