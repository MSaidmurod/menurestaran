// r-r-d
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
//
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Menyu from "./components/Menyu";
import Idpage from "./components/Idpage";

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout />}>
        <Route path="/" index element={<Home />} />
        <Route path="/menu/:rest_id/:table_id" index element={<Idpage />} />
        <Route index path="/menu/:rest_id/:tabl_id/:id" element={<Menyu />} />
      </Route>
    )
  );
  return <RouterProvider router={routes} />;
}

export default App;
