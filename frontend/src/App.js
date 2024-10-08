import "./App.css";
import axios from "axios";

const App = () => {
  const fetchData = async (url) => {
    try {
      return await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      return e;
    }
  };

  fetchData("http://localhost:8000/")
    .then((res) => console.log("res", res.data))
    .catch((err) => console.log("err", err));

  return (
    <div>
      <h1>App</h1>
    </div>
  );
};

export default App;
