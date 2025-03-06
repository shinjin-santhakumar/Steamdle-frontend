import { useState, useEffect } from "react";

function DescriptionHint(props) {
  const [DescriptionHint, setDescriptionHint] = useState(null);
  const [showButton, setShowButton] = useState(true);

  const local = "http://127.0.0.1:5000";
  const server = "https://shinjinsos.pythonanywhere.com";

  useEffect(() => {
    fetch(server + "/getDescription", {
      method: "GET",
    })
      .then((response) => response.text())
      .then((data) => setDescriptionHint(data));
  }, []);

  useEffect(() => {
    console.log("DescriptionHint updated: " + DescriptionHint);
  }, [DescriptionHint]);

  return (
    <>
      {props.rowLen > 2 ? (
        <div className="mb-2">
          {showButton ? (
            <button
              className={
                props.rowLen < 1
                  ? `bg-slate-400 rounded-xl p-3 cursor-not-allowed`
                  : `bg-slate-800 rounded-xl p-3 hover:bg-slate-700`
              }
              onClick={() => setShowButton(false)}
              disabled={props.rowLen < 3}
            >
              Show Description ({props.rowLen > 3 ? 3 : props.rowLen} / 3)
            </button>
          ) : (
            <div>{DescriptionHint != null && DescriptionHint}</div>
          )}
        </div>
      ) : null}
    </>
  );
}

export default DescriptionHint;
