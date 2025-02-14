import "./App.css";
import { useState, useEffect } from "react";
import Row from "./Row.tsx";
import { useMemo } from "react";
import SearchBar from "./Search.tsx";

function App() {
  const [data, setData] = useState(null);
  const [app_id, setApp_id] = useState(null);

  const [rowList, setRowList] = useState([]);

  useMemo(() => {
    if (!data) return <p>Loading...</p>;
    setRowList([...rowList, <Row data={data} app_id={app_id} />]);
  }, [data]);

  return (
    <div className="App">
      <SearchBar stateChanger={[setData, setApp_id]} />
      <header className="App-header">{rowList}</header>
    </div>
  );
}

export default App;
