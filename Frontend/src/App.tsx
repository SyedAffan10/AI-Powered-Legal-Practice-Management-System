import { Route, Routes } from "react-router";
import "./App.css";
import Layout from "./layout/layout";
import { agencyRoutes, agentRoutes, clientRoutes, routes } from "./routes";
import Login from "./pages/login";
import NotFound from "./components/not-found";
import Navigator from "./hooks/navigator";
import Loader from "./components/ui/loader";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigator />} />
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        {routes.map((r, idx) => (
          <Route key={idx} path={r.path} element={<r.component />} />
        ))}
        {agencyRoutes.map((r, idx) => (
          <Route key={idx} path={r.path} element={<r.component />} />
        ))}
        {clientRoutes.map((r, idx) => (
          <Route key={idx} path={r.path} element={<r.component />} />
        ))}
        {agentRoutes.map((r, idx) => (
          <Route key={idx} path={r.path} element={<r.component />} />
        ))}
      </Route>
      <Route />
      <Route path="*" element={<NotFound />} />
      <Route path="/loader" element={<Loader />} />
    </Routes>
  );
}

export default App;
