import { useContext } from "react";
import { CanvasContext } from "../context/CanvasProvider";

export const useCanvasContext = () => useContext(CanvasContext);
