import "./App.css";
import { useState, useEffect } from "react";
import Row from "./Row.tsx";
import { useMemo } from "react";
import Hint from "./Hint.tsx";
import SearchBar from "./Search.tsx";
import steamdlelogo from "./assets/steamdlelogo.png";
import Victory from "./Victory.tsx";
import Achievements from "./Achievements.tsx";
import Banner from "./Banner.tsx";
import DescriptionHint from "./DescriptionHint.tsx";

interface data {
  colors: { [key: string]: boolean };
}

type rows = JSX.Element[];

function App() {
  const [data, setData] = useState<data>();
  const [app_id, setApp_id] = useState(null);
  const [rowList, setRowList] = useState<rows>([]);
  const [gameOver, setGameOver] = useState(false);
  const [closed, setClosed] = useState(false);
  const [currDay, setCurrDay] = useState<string>();

  function clearGameData() {
    setApp_id(null);
    setRowList([]);
    setGameOver(false);
    setClosed(false);
  }

  function loadGameData() {
    const rowlen = localStorage.getItem("rowlen");
    let rowLenNum;
    if (rowlen) {
      rowLenNum = JSON.parse(rowlen);
    } else {
      return;
    }

    let newArray = [];

    for (let i = 0; i < rowLenNum; i++) {
      const cachedRow = localStorage.getItem("rowCache" + i);
      if (cachedRow) {
        const { data, app_id } = JSON.parse(cachedRow);
        const row = <Row data={data} app_id={app_id} key={app_id} />;
        newArray.push(row);
      }
    }

    setRowList(newArray ? newArray.reverse() : []);
  }

  // Fetch the current day when the component mounts
  useEffect(() => {
    fetch("https://shinjinsos.pythonanywhere.com/getDay", {
      method: "GET",
    })
      .then((response) => response.text())
      .then((data) => {
        setCurrDay(data);

        if (data != localStorage.getItem("day")) {
          clearGameData();
          localStorage.clear();
          localStorage.setItem("day", data);
        } else {
          loadGameData();
        }
      });

    const gameOverCache = localStorage.getItem("gameOver");

    if (gameOverCache == "true") {
      setGameOver(true);
    }
  }, []);

  useMemo(() => {
    if (!data) return <p>Loading...</p>;
    if (data.colors["victory"]) {
      localStorage.setItem("gameOver", "true");
      setGameOver(true);
    }

    localStorage.setItem(
      "rowCache" + rowList.length,
      JSON.stringify({ data, app_id })
    );

    localStorage.setItem("rowlen", JSON.stringify(rowList.length + 1));

    setRowList([<Row data={data} app_id={app_id} key={app_id} />, ...rowList]);
  }, [data]);

  return (
    <div className="App bg-linear-to-r/srgb from-slate-800 to-slate-950">
      <img className="logo" src={steamdlelogo} />

      <Achievements rowLen={rowList.length} />
      <Hint rowLen={rowList.length} />
      <DescriptionHint rowLen={rowList.length} />

      {gameOver && !closed && (
        <Victory stateChanger={setClosed} rowLen={rowList.length} />
      )}
      {!gameOver && <SearchBar stateChanger={[setData, setApp_id]} />}
      <Banner />
      <header className="App-header ">{rowList}</header>
    </div>
  );
}

export default App;
