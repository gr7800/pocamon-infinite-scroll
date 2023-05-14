// This code defines the routes for the main application
import { Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import Lazyloading from "../pages/LazyLoading";
import Notfound from "../pages/Notfound";


// Defining the main routes using the React Router Routes component
export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />}></Route>
      <Route path="/lazyloading" element={<Lazyloading />}></Route>
      <Route path="*" element={<Notfound />}></Route>
    </Routes>
  );
}