import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./index.css"
import "./components/Header"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom"
import Header from "./components/Header"
import Shops from "./routes/shops"
import Cart from "./routes/cart"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <div className="flex flex-col h-full">
          <Header
            pages={[
              {
                name: "Shops",
                url: "/",
              },
              {
                name: "Cart",
                url: "/cart",
              },
            ]}
          />
          <Outlet />
        </div>
      }
    >
      <Route path="/" element={<Shops />}></Route>
      <Route path="/cart" element={<Cart items={[]} />}></Route>
    </Route>,
  ),
)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
