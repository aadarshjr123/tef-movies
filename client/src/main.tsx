import "@fontsource-variable/roboto-mono";
import "./styles/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router";
import { createRoutes } from "./app/routes";
import { makeStore } from "./app/store";
import { API_URL } from "./services/api";

// Open the connection to the API origin while the app's code is still loading.
const preconnect = Object.assign(document.createElement("link"), {
  rel: "preconnect",
  href: new URL(API_URL).origin,
  crossOrigin: "",
});
document.head.append(preconnect);

const store = makeStore();
const router = createBrowserRouter(createRoutes(store));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
