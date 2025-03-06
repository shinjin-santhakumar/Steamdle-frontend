import { useState, useEffect } from "react";
import "./hint.css";
import { ComponentProps } from "react";

function Hint(props: ComponentProps<any>) {
  //const local = "http://127.0.0.1:5000";
  const server = "https://shinjinsos.pythonanywhere.com";

  const [movie, setMovie] = useState<string>("");

  const [showButton, setShowButton] = useState(true);

  const handleClick = () => {
    setShowButton(false);
  };

  useEffect(() => {
    fetch(server + "/getHint", {
      method: "GET",
    })
      .then((response) => response.text())
      .then((data) => setMovie(data));

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  //console.log("len " + props.rowLen);

  return (
    <>
      {props.rowLen > 0 ? (
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
              Play Trailer ({props.rowLen > 2 ? 2 : props.rowLen} / 2)
            </button>
          ) : (
            <video
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
