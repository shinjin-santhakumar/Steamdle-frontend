import "./victory.css";
import { useEffect, useState } from "react";
import CountdownTimer from "./CountdownTimer";

function Victory(props) {
  const local = "http://127.0.0.1:5000";
  const server = "https://shinjinsos.pythonanywhere.com";

  const [timeUntilNextDay, setTimeUntilNextDay] = useState(null);

  useEffect(() => {
    fetch(local + "/getTimeUntilNextDay", {
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
  return (
    <div className="victory ">
      <div className="victory-body text-red-500 rounded-xl text-7xl font-mono p-10">
        <button className="bg-white" onClick={handleClick}>
          {" "}
          Close{" "}
        </button>
        <div>Congrats you got the game!</div>
        <div className="text-body"> The next day will be available in </div>
        {timeUntilNextDay != null && (
          <CountdownTimer initialTime={timeUntilNextDay} />
        )}
      </div>
    </div>
  );
}

export default Victory;
