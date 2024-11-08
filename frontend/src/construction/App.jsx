// 3rd parties
import { Routes, Route, BrowserRouter } from "react-router-dom";

// atomic design
import Layout from "../components/templates/Layout";

// custom hooks and utils
import { router } from "../utils/index";

// styling
import styles from "../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * The Main structure part responsible for routing and the use of authentication tokens
 * Layout template will also be called from here as I can only wrap around the app from here
 * @returns {JSX.Element}
 * @constructor
 */
const App = () => {
  return (
    <div className={styles.app}>
      {/*routing for app*/}
      <BrowserRouter>
        {/*layout template for header and footer*/}
        <Layout>
          <Routes>
            {router.map(({ id, path, page }) => (
              <Route key={id} path={path} element={page} />
            ))}
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
