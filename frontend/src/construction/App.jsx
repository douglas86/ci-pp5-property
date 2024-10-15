// 3rd parties
import { Routes, Route, BrowserRouter } from "react-router-dom";

// atomic design
import Layout from "../components/templates/Layout";

// utilities and custom hooks
import { router } from "../utils/index";
import useTokens from "../hooks/useTokens";

// styling
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  // fetches Profile data from server
  useTokens();

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
