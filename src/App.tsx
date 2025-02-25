import "./App.css";
import { useState, useEffect } from "react";
import Row from "./Row.tsx";
import { useMemo } from "react";
import Hint from "./Hint.tsx";
import SearchBar from "./Search.tsx";
import steamdlelogo from "./assets/steamdlelogo.png";

function App() {
  const [data, setData] = useState(null);
  const [app_id, setApp_id] = useState(null);

  const [rowList, setRowList] = useState([]);

  useMemo(() => {
    if (!data) return <p>Loading...</p>;
    setRowList([<Row data={data} app_id={app_id} key={app_id} />, ...rowList]);
  }, [data]);

  return (
    <div className="App">
      <img className="logo" src={steamdlelogo} />
      <Hint rowLen={rowList.length} />

      <SearchBar stateChanger={[setData, setApp_id]} />
      <header className="App-header">{rowList}</header>
    </div>
  );
}

export default App;
