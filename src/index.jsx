import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App/App";
import authService from "./shared/services/auth.service";

const Index = () => {
  authService.useUserAuth();

  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

async function startApp() {
  const container = document.getElementById("root");
  const root = createRoot(container);
  root.render(<Index />);
}

if (import.meta.env.VITE_WITH_SERVER) {
  console.log("Running with api server");
  authService.refreshToken().finally(startApp);
} else {
  console.log("No api server");
  startApp();
}
