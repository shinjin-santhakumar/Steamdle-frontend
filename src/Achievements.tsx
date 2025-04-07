import { useState, useEffect } from "react";
import "./Achievements.css";
import { ComponentProps } from "react";
import server from "./global.tsx";

interface props {
  rowLen: number;
}

function Achievements(props: props) {
  const [Achievements, setAchievements] = useState([]);
  const [currImg, setCurrImg] = useState<ComponentProps<any>>(null);
  const [currIndex, setCurrIndex] = useState(0);
  const [showButton, setShowButton] = useState(true);
  const [noAcheivements, setNoAcheivements] = useState(false);

  useEffect(() => {
    console.log("Achievements updated: " + Achievements);

    if (typeof Achievements == "string") {
      setNoAcheivements(true);
    } else if (Achievements.length > 0) {
      setCurrImg(Achievements[currIndex]);
    }
  }, [Achievements]);

  useEffect(() => {
    setCurrImg(Achievements[currIndex]);
  }, [currIndex]);

  const handleClick = () => {
    fetch(server + "/getAchievement", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setAchievements(data));
    setShowButton(false);
  };

  return (
    <>
      <div className="mb-2">
        {showButton ? (
          <button
            className={
              props.rowLen < 2
                ? `bg-slate-400 rounded-xl p-3 cursor-not-allowed`
                : `bg-slate-800 rounded-xl p-3 hover:bg-slate-700`
            }
            onClick={handleClick}
            disabled={props.rowLen < 2}
          >
            Show Achievements ({props.rowLen > 2 ? 2 : props.rowLen} / 2)
          </button>
        ) : !noAcheivements ? (
          <>
            <button
              className={`achievements rounded-l-lg ${
                currIndex == 0 ? "bg-gray-800" : "bg-sky-950 hover:bg-sky-800"
              }`}
              onClick={() => {
                setCurrIndex(currIndex > 0 ? currIndex - 1 : currIndex);
              }}
            >
              prev
            </button>
            <img
              className="achievements"
              src={currImg?.path}
              alt="achievement"
            />
            <button
              className={`achievements rounded-r-lg ${
                currIndex == Achievements.length - 1
                  ? "bg-gray-800"
                  : "bg-sky-950 hover:bg-sky-800"
              }`}
              onClick={() => {
                setCurrIndex(
                  currIndex < Achievements.length - 1
                    ? currIndex + 1
                    : currIndex
                );
              }}
            >
              {" "}
              next{" "}
            </button>
          </>
        ) : (
          <div> No Achievements </div>
        )}
      </div>
    </>
  );
}

export default Achievements;
