// 3rd parties
import { Routes, Route, BrowserRouter } from "react-router-dom";

// atomic design
import Layout from "../components/templates/Layout";

// utils and custom hooks
import { router } from "../utils/index";
import useTokens from "../hooks/useTokens";

// styling
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * The Main structure part responsible for routing and the use of authentication tokens
 * Layout template will also be called from here as I can only wrap around the app from here
 * @returns {JSX.Element}
 * @constructor
 */
const App = () => {
  // fetches Profile data from server if you are logged in
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
