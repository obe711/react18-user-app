import { Routes, Route } from "react-router-dom";
import RequireAuth from "../shared/routing/RequireAuth";
import publicRoutes from "../shared/routing/public.routes";
import protectedRoutes from "../shared/routing/protected.routes";
import "./App.css";

function App() {
  return (
    <Routes>
      {publicRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            <route.layout>
              <route.element />
            </route.layout>
          }
        />
      ))}
      {protectedRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            <RequireAuth>
              <route.layout>
                <route.element />
              </route.layout>
            </RequireAuth>
          }
        />
      ))}
    </Routes>
  );
}

export default App;
