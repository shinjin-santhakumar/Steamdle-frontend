import { useState, useEffect } from "react";
import "./Hint.css";

function Hint(props) {
  const [movie, setMovie] = useState(null);

  fetch("http://127.0.0.1:5000/getHint", {
    method: "GET",
  })
    .then((response) => response.text())
    .then((data) => setMovie(data));

  useEffect(() => {
    console.log("movie updated: " + movie);
  }, [movie]);

  const [showButton, setShowButton] = useState(true);

  const handleClick = () => {
    setShowButton(false);
  };

  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  console.log("len " + props.rowLen);

  return (
    <div className="mb-4">
      {props.rowLen > 3 &&
        (showButton ? (
          <button
            className="bg-slate-800 rounded-xl p-3 hover:bg-slate-700"
            onClick={handleClick}
          >
            Play Trailer
          </button>
        ) : (
          <video className="video" width="500" height="300" autoPlay muted loop>
            <source src={movie} type="video/mp4" />
          </video>
        ))}
    </div>
  );
}

export default Hint;
