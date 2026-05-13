import "./index.css";

function App() {
  const fetchData = async () => {
    const url = "http://localhost:5000/api/users";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
    } catch (error) {
      return error;
    }
  };
  fetchData();

  return <div className=""></div>;
}

export default App;
