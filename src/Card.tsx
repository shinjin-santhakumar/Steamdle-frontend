import steamdlelogo from "./assets/steamdlelogo.png";
import up from "./assets/up.png";
import down from "./assets/down.png";

let lenthAnimation: string = "s";
let startAnimation: number = 0;

function Card({ animationDelay, color, cardInfo, type }) {
  function isValidURL(string) {
    try {
      new URL(string);
      return true;
    } catch (error) {
      return false;
    }
  }

  const textColor = color != "green" ? "red" : "green";
  const borderColor = color != "green" ? "border-red-500" : "border-green-500";

  return (
    <div className={`card p-2 border-2 rounded-xl border-solid ${borderColor}`}>
      <div
        className="card-holder animation "
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
          <div className="card-back text-4xl">
            {cardInfo == "N/A" ? "N/A" : cardInfo.date.slice(-4)}

            <img className="center" src={color == "lower" ? down : null} />
            <img className="center" src={color == "higher" ? up : null} />
          </div>
        ) : null}

        {type == "developers" ? (
          <div className="card-back text-2xl">
            {cardInfo == undefined
              ? "N/A"
              : cardInfo.map((temp) => temp).join(", ")}
          </div>
        ) : null}

        {type == "price" ? (
          <div className="card-back text-4xl">
            {cardInfo}
            <img className="center" src={color == "lower" ? down : null} />
            <img className="center" src={color == "higher" ? up : null} />
          </div>
        ) : null}

        {type == "genres" ? (
          <div className="card-back text-2xl">
            {cardInfo == undefined
              ? "N/A"
              : cardInfo.map((temp) => temp.description).join(", ")}
          </div>
        ) : null}

        {type == "reviews" ? (
          <div className="card-back text-2xl">{cardInfo}</div>
        ) : null}

        <img src={steamdlelogo} className="card-front" />
      </div>
    </div>
  );
}

export default Card;
