import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/fraunces/opsz-italic.css";
import "@fontsource-variable/manrope";
import "@fontsource/tiro-devanagari-sanskrit/400.css";
import App from "./App";
import Privacy from "./pages/Privacy";
import "./index.css";

// Two pages only, so a pathname check is enough (no router). Hosting rewrites /privacy to index.html:
// vercel.json on Vercel, public/.htaccess on Hostinger.
const isPrivacy = window.location.pathname.replace(/\/+$/, "") === "/privacy";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>{isPrivacy ? <Privacy /> : <App />}</React.StrictMode>
);
