import { Routes, Route, BrowserRouter } from "react-router-dom";
import { router } from "../utils/index";

import "../styles/App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {router.map(({ id, path, page }) => (
          <Route key={id} path={path} element={page} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
