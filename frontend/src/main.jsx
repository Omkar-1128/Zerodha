import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import AppRoutes from "./AppRoutes";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CookiesProvider>
      <AppRoutes />
    </CookiesProvider>
  </BrowserRouter>
);
