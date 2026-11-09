import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";
import { Provider } from "react-redux";
import { MemoryRouter, RouterProvider, createMemoryRouter } from "react-router";
import { createRoutes } from "@/app/routes";
import { makeStore, type AppStore } from "@/app/store";

/** Renders a component with a fresh store and an in-memory router. */
export function renderWithProviders(
  ui: ReactElement,
  { store = makeStore(), route = "/" }: { store?: AppStore; route?: string } = {},
) {
  const user = userEvent.setup();
  const result = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </Provider>,
  );
  return { ...result, store, user };
}

/** Renders the real app routes (layout, lazy pages) at `path`. */
export function renderApp(path: string, store: AppStore = makeStore()) {
  const user = userEvent.setup();
  const router = createMemoryRouter(createRoutes(store), { initialEntries: [path] });
  const result = render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  );
  return { ...result, store, router, user };
}
