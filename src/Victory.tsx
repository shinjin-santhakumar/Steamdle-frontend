import "./Victory.css";
import { useEffect, useState } from "react";
import CountdownTimer from "./CountdownTimer";
import { ComponentProps } from "react";
import server from "./global.tsx";

function Victory(props: ComponentProps<any>) {
  //const local = "http://127.0.0.1:5000";
  const [isCopied, setIsCopied] = useState(false);

  const [timeUntilNextDay, setTimeUntilNextDay] = useState<number>();

  useEffect(() => {
    fetch(server + "/getTimeUntilNextDay", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setTimeUntilNextDay(Math.trunc(data));
      });
  });

  useEffect(() => {
    console.log(timeUntilNextDay);
  }, [timeUntilNextDay]);

  const handleClick = () => {
    console.log("clicked");
    props.stateChanger(true);
  };

  const copyToClipboard = async () => {
    const copyColors: { [key: string]: string } = {
      green: "🟩",
      yellow: "🟨",
      red: "🟥",
    };

    let colorArray = "\n";

    for (let i = localStorage.length - 1; i >= 0; i--) {
      const item = localStorage.getItem("rowCache" + i);

      if (item !== null) {
        let currData = JSON.parse(item);
        let currItem = currData.data.colors;

        colorArray += `${
          currItem["release_date"] != "green" &&
          currItem["release_date"] != "yellow"
            ? copyColors["red"]
            : copyColors[currItem["release_date"]]
        }`;

        colorArray += `${
          currItem["developers"] != "green" &&
          currItem["developers"] != "yellow"
            ? copyColors["red"]
            : copyColors[currItem["developers"]]
        }`;

        colorArray += `${
          currItem["price"] != "green" && currItem["price"] != "yellow"
            ? copyColors["red"]
            : copyColors[currItem["price"]]
        }`;

        colorArray += `${
          currItem["genres"] != "green" && currItem["genres"] != "yellow"
            ? copyColors["red"]
            : copyColors[currItem["genres"]]
        }`;

        colorArray += `${
          currItem["reviews"] != "green" && currItem["reviews"] != "yellow"
            ? copyColors["red"]
            : copyColors[currItem["reviews"]]
        }`;

        colorArray += "\n";
      }
    }

    try {
      await navigator.clipboard.writeText(
        `Daily Steamdle in ` +
          props.rowLen +
          ` guesses` +
          colorArray +
          `https://steamdle-frontend.vercel.app/`
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
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

        <button
          className="bg-stone-950 hover:bg-stone-900 rounded-xl text-3xl cursor-pointer text-gray-100 p-4"
          onClick={copyToClipboard}
        >
          {isCopied ? "Copied!" : "Share"}
        </button>
      </div>
    </div>
  );
}

export default Victory;
