import { useState, useEffect } from "react";
import { ComponentProps } from "react";
import server from "./global.tsx";

function DescriptionHint(props: ComponentProps<any>) {
  const [DescriptionHint, setDescriptionHint] = useState<string>();
  const [showButton, setShowButton] = useState<boolean>(true);

  function handleClick() {
    fetch(server + "/getDescription", {
      method: "GET",
    })
      .then((response) => response.text())
      .then((data) => setDescriptionHint(data));
  }

  useEffect(() => {
    console.log("DescriptionHint updated: " + DescriptionHint);
  }, [DescriptionHint]);

  return (
    <>
      {props.rowLen > 4 ? (
        <div className="mb-2">
          {showButton ? (
            <button
              className={
                props.rowLen < 6
                  ? `bg-slate-400 rounded-xl p-3 cursor-not-allowed`
                  : `bg-slate-800 rounded-xl p-3 hover:bg-slate-700`
              }
              onClick={() => {
                setShowButton(false);
                handleClick();
              }}
              disabled={props.rowLen < 6}
            >
              Show Description ({props.rowLen > 6 ? 6 : props.rowLen} / 6)
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
