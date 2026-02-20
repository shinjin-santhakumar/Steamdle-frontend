import { useState, useEffect, useRef } from "react";
import "./hint.css";
import { ComponentProps } from "react";
import server from "./global.tsx";
import shaka from "shaka-player";

interface ReusableStreamPlayerProps {
  url: string;
}

const H264StreamPlayer: React.FC<ReusableStreamPlayerProps> = ({ url }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<shaka.Player | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    shaka.polyfill.installAll();

    if (!videoRef.current) return;

    const player = new shaka.Player(videoRef.current);
    playerRef.current = player;

    // Listen for errors and update the UI
    player.addEventListener("error", (event: any) => {
      console.error("Shaka Error:", event.detail);
      setError(`Playback Error: ${event.detail.code}`);
    });

    const loadVideo = async () => {
      try {
        setError(null);
        // Process the URL before loading
        const safeH264Url = url;
        console.log("Loading safe H.264 URL:", safeH264Url);

        await player.load(safeH264Url);
      } catch (err: any) {
        console.error("Error loading manifest", err);
        //setError(`Failed to load: ${err.code || "Unknown"}`);
      }
    };

    loadVideo();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [url]);

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    maxWidth: "900px",
    margin: "20px auto",
    overflow: "hidden",
    borderRadius: "12px",
    backgroundColor: "#000",
    boxShadow: "0 8px 25px rgba(0,0,0,0.6)",
  };

  const videoStyle: React.CSSProperties = {
    width: "100%",
    display: "block",
    filter: "blur(8px) brightness(0.7)",
    transition: "filter 0.4s ease",
  };

  return (
    <div style={containerStyle}>
      {error && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            background: "rgba(255,0,0,0.8)",
            color: "white",
            padding: "10px",
            zIndex: 10,
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}
      <video
        ref={videoRef}
        style={videoStyle}
        controls
        autoPlay
        muted
        onMouseEnter={(e) =>
          (e.currentTarget.style.filter = "blur(0px) brightness(1)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.filter = "blur(8px) brightness(0.7)")
        }
      />
    </div>
  );
};

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
            <H264StreamPlayer url={movie} />
            // <video
            //   key={movie}
            //   className="video"
            //   width="500"
            //   height="300"
            //   autoPlay
            //   muted
            //   loop
            // >
            //   <source src={movie} type="video/mp4" />
            // </video>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Hint;
