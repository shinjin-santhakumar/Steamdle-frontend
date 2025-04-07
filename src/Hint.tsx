import { useState, useEffect } from "react";
import "./hint.css";
import { ComponentProps } from "react";
import server from "./global.tsx";

function Hint(props: ComponentProps<any>) {
  const [movie, setMovie] = useState<string>("");

  const [showButton, setShowButton] = useState(true);

  const [noVideo, setNoVideo] = useState(false);

  const handleClick = () => {
    fetch(server + "/getHint", {
      method: "GET",
    })
      .then((response) => response.text())
      .then((data) => setMovie(data));

    setShowButton(false);
  };

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  useEffect(() => {
    if (movie == "No video") {
      setNoVideo(true);
    }
  }, [movie]);

  return (
    <>
      {props.rowLen > 2 ? (
        <div className="mb-2">
          {showButton ? (
            <button
              className={
                props.rowLen < 4
                  ? `bg-slate-400 rounded-xl p-3 cursor-not-allowed`
                  : `bg-slate-800 rounded-xl p-3 hover:bg-slate-700`
              }
              onClick={handleClick}
              disabled={props.rowLen < 4}
            >
              Play Trailer ({props.rowLen > 4 ? 4 : props.rowLen} / 4)
            </button>
          ) : noVideo ? (
            <div> No Trailer </div>
          ) : (
            <video
              key={movie}
              className="video"
              width="500"
              height="300"
              autoPlay
              muted
              loop
            >
              <source src={movie} type="video/mp4" />
            </video>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Hint;
