import './index.css'
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import MoviesBoard from "./components/MoviesBoard";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <MoviesBoard />
  </StrictMode>
);
