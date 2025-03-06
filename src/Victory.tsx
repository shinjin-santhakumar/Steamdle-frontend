import "./Victory.css";
import { useEffect, useState } from "react";
import CountdownTimer from "./CountdownTimer";
import { ComponentProps } from "react";

function Victory(props: ComponentProps<any>) {
  //const local = "http://127.0.0.1:5000";
  const server = "https://shinjinsos.pythonanywhere.com";

  const [timeUntilNextDay, setTimeUntilNextDay] = useState<number>();

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
