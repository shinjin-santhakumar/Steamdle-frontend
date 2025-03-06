import "./victory.css";
import { useEffect, useState } from "react";
import CountdownTimer from "./CountdownTimer";

function Victory(props) {
  const local = "http://127.0.0.1:5000";
  const server = "https://shinjinsos.pythonanywhere.com";

  const [timeUntilNextDay, setTimeUntilNextDay] = useState(null);
  const [scrollableHeight, setScrollableHeight] = useState(0);

  useEffect(() => {
    fetch(server + "/getTimeUntilNextDay", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setTimeUntilNextDay(Math.trunc(data));
      });
  }, []);

  useEffect(() => {
    console.log(timeUntilNextDay);
  }, [timeUntilNextDay]);

  const handleClick = () => {
    console.log("clicked");
    props.stateChanger(true);
  };

  useEffect(() => {
    const calculateScrollableHeight = () => {
      // Ensure document.body exists before accessing offsetHeight
      if (document.body) {
        setScrollableHeight(document.body.offsetHeight - window.innerHeight);
      }
    };

    // Calculate initially and on window resize
    calculateScrollableHeight();
    window.addEventListener("resize", calculateScrollableHeight);

    // Clean up the event listener
    return () =>
      window.removeEventListener("resize", calculateScrollableHeight);
  }, []);

  return (
    <div className="victory">
      <div className="victory-body text-red-500 rounded-xl text-7xl font-mono p-10">
        <button
          className="closing-button bg-stone-950 hover:bg-stone-900 rounded-xl text-3xl cursor-pointer text-gray-100"
          onClick={handleClick}
        >
          X
        </button>
        <div className="text-white">Congrats you got the game!</div>
        <div className="text-body text-white">
          {" "}
          The next day will be available in{" "}
        </div>
        {timeUntilNextDay != null && (
          <CountdownTimer initialTime={timeUntilNextDay} />
        )}
      </div>
    </div>
  );
}

export default Victory;
