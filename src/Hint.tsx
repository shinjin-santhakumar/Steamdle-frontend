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

  console.log("len " + props.rowLen);

  return (
    <div>
      {props.rowLen > 3 &&
        (showButton ? (
          <button onClick={handleClick}>Play Trailer</button>
        ) : (
          <video
            className="video"
            width="500"
            height="300"
            autoplay="autoplay"
            muted
          >
            <source src={movie} type="video/mp4" />
          </video>
        ))}
    </div>
  );
}

export default Hint;
