import { useState, useEffect } from "react";
import "./Achievements.css";

function Achievements() {
  const [Achievements, setAchievements] = useState([]);
  const [currImg, setCurrImg] = useState(null);
  const [currIndex, setCurrIndex] = useState(0);

  const local = "http://127.0.0.1:5000";
  const server = "https://shinjinsos.pythonanywhere.com";

  useEffect(() => {
    fetch(local + "/getAchievement", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setAchievements(data));
  }, []);

  useEffect(() => {
    console.log("Achievements updated: " + Achievements);
    if (Achievements.length > 0) {
      setCurrImg(Achievements[currIndex]);
    }
  }, [Achievements]);

  useEffect(() => {
    setCurrImg(Achievements[currIndex]);
  }, [currIndex]);

  return (
    <>
      {/* {Achievements.map((achievement, index) => (
        <img className="achievements" src={achievement.path} />
      ))} */}

      <div>
        <button
          className="achievements"
          onClick={() => {
            setCurrIndex(currIndex > 0 ? currIndex - 1 : currIndex);
          }}
        >
          {" "}
          prev{" "}
        </button>
        <img className="achievements" src={currImg?.path} />
        <button
          className="achievements"
          onClick={() => {
            setCurrIndex(
              currIndex < Achievements.length - 1 ? currIndex + 1 : currIndex
            );
          }}
        >
          {" "}
          next{" "}
        </button>
      </div>
    </>
  );
}

export default Achievements;
