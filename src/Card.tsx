import steamdlelogo from "./assets/steamdlelogo.png";
import up from "./assets/up.png";
import down from "./assets/down.png";
import { ComponentProps } from "react";

let lenthAnimation: string = "s";
let startAnimation: number = 0;

function Card({
  animationDelay,
  color,
  cardInfo,
  type,
}: {
  animationDelay: number;
  color: string;
  cardInfo: ComponentProps<any>;
  type: string;
}) {
  let textColor = "text-black";

  let borderColor;

  let backgroundColor;

  if (color != "green") {
    //textColor = "text-red-500";
    borderColor = "border-red-500";
    backgroundColor = "bg-red-950";
  } else {
    //textColor = "text-green-500";
    borderColor = "border-green-500";
    backgroundColor = "bg-green-950";
  }

  if (color == "yellow") {
    //textColor = "text-yellow-500";
    borderColor = "border-yellow-500";
    backgroundColor = "bg-yellow-600";
  }

  return (
    <div className={`card border-2 rounded-xl border-solid ${borderColor} `}>
      <div
        className={`card-holder animation rounded-xl  ${backgroundColor}`}
        style={
          {
            "--lenthAnimation":
              (startAnimation + animationDelay).toString() + lenthAnimation,
            color: textColor,
          } as React.CSSProperties
        }
      >
        {type == "image" ? (
          <img
            id="header"
            className=" card-back rounded-xl "
            src={cardInfo}
            alt="logo"
          />
        ) : null}

        {type == "release_date" ? (
          <div className="card-back text-4xl rounded-xl pt-2">
            {color == "N/A" ? "N/A" : cardInfo.date.slice(-4)}

            <img className="center" src={color == "lower" ? down : ""} />
            <img className="center" src={color == "higher" ? up : ""} />
          </div>
        ) : null}

        {type == "developers" ? (
          <div className="card-back text-2xl rounded-xl pt-2">
            {color == "N/A"
              ? "N/A"
              : cardInfo.map((temp: string) => temp).join(", ")}
          </div>
        ) : null}

        {type == "price" ? (
          <div className="card-back text-4xl rounded-xl pt-2">
            {cardInfo}
            <img className="center" src={color == "lower" ? down : ""} />
            <img className="center" src={color == "higher" ? up : ""} />
          </div>
        ) : null}

        {type == "genres" ? (
          <div className="card-back text-2xl rounded-xl pt-2">
            {cardInfo == "N/A"
              ? "N/A"
              : cardInfo
                  .map((temp: ComponentProps<any>) => temp.description)
                  .join(", ")}
          </div>
        ) : null}

        {type == "reviews" ? (
          <div className="card-back text-2xl rounded-xl pt-2">{cardInfo}</div>
        ) : null}

        <img src={steamdlelogo} className="card-front" />
      </div>
    </div>
  );
}

export default Card;
