import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import DetailPage from "./pages/DetailPage";
import TypePage from "./pages/TypePage";
import PokeSearchBar from "./components/PokeSearchBar";
import { ThemeProvider } from "./contexts/themeContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Homepage /> },
      {
        path: "/pokemon/:id",
        element: <DetailPage />,
      },
      {
        path: "/type",
        element: <TypePage />,
      },
      {
        path: "search",
        element: <PokeSearchBar />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
