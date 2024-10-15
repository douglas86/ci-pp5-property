import { Routes, Route, BrowserRouter } from "react-router-dom";
import { router } from "../utils/index";

import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/templates/Layout";
import useRefreshToken from "../hooks/useRefreshToken";

const App = () => {
  useRefreshToken();

  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          {router.map(({ id, path, page }) => (
            <Route key={id} path={path} element={page} />
          ))}
        </Routes>
      </BrowserRouter>
    </Layout>
  );
};

export default App;
