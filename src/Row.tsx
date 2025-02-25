import "./Row.css";
import up from "./assets/up.png";
import down from "./assets/down.png";
import { useEffect, useState } from "react";
import { flip } from "lodash";
import steamdlelogo from "./assets/steamdlelogo.png";

interface RowStyle {
  "--lenthAnimation": string;
}

let lenthAnimation: string = "s";
let startAnimation: number = 0;

function Row(props) {
  //let game = ; //props[10].json(); //new Map(Object.entries(data));

  //console.log();

  console.log(props);
  let game = props.data.data2[props.app_id].data;
  let answers = props.data.colors;
  console.log(answers);

  let reviewData = props.data.data1;

  let price: string = game.is_free
    ? "Free"
    : game.price_overview != null
    ? game.price_overview.initial.toString()
    : "N/A";

  return (
    <div className="row">
      <>
        <div className="border-[#313236] rounded-xl border-6 grid grid-cols-6 gap-4">
          <div className="card border-2 rounded-xl border-solid">
            <div
              className="card-holder animation"
              style={
                {
                  "--lenthAnimation":
                    (startAnimation + 0.5).toString() + lenthAnimation,
                } as React.CSSProperties
              }
            >
              <img
                id="header"
                className=" card-back"
                src={game.header_image}
                alt="logo"
              />

              <img src={steamdlelogo} className="card-front" />
            </div>
          </div>

          <div className="card p-2 border-2 rounded-xl border-solid ele">
            <div
              className="card-holder animation"
              style={
                {
                  "--lenthAnimation":
                    (startAnimation + 1).toString() + lenthAnimation,
                  color: answers["release_date"] != "green" ? "red" : "green",
                } as React.CSSProperties
              }
            >
              <div className="card-back text-4xl">
                {answers["release_date"] == "N/A"
                  ? "N/A"
                  : game.release_date.date.slice(-4)}

                <img
                  className="center"
                  src={answers["release_date"] == "lower" ? down : null}
                />
                <img
                  className="center"
                  src={answers["release_date"] == "higher" ? up : null}
                />
              </div>

              <img src={steamdlelogo} className="card-front" />
            </div>
          </div>

          <div className="card pt-2 border-2 rounded-xl border-solid ele">
            <div
              className="card-holder animation"
              style={
                {
                  "--lenthAnimation":
                    (startAnimation + 1.5).toString() + lenthAnimation,
                  color: answers["developers"],
                } as React.CSSProperties
              }
            >
              <div className="card-back">
                {game.developers == undefined
                  ? "N/A"
                  : game.developers.map((temp) => temp).join(", ")}
              </div>

              <img src={steamdlelogo} className="card-front" />
            </div>
          </div>

          <div className="card pt-2 border-2 rounded-xl border-solid ele">
            <div
              className="card-holder animation"
              style={
                {
                  "--lenthAnimation":
                    (startAnimation + 2).toString() + lenthAnimation,
                  color: answers["price"] != "green" ? "red" : "green",
                } as React.CSSProperties
              }
            >
              <div className="card-back text-4xl">
                {answers["price"] == "N/A"
                  ? "N/A"
                  : game.is_free == true
                  ? "Free"
                  : "$" +
                    price.slice(0, price.length - 2) +
                    "." +
                    price.slice(price.length - 2)}
                <img
                  className="center"
                  src={answers["price"] == "lower" ? down : null}
                />
                <img
                  className="center"
                  src={answers["price"] == "higher" ? up : null}
                />
              </div>

              <img src={steamdlelogo} className="card-front" />
            </div>
          </div>

          <div className="card pt-2 border-2 rounded-xl border-solid ele">
            <div
              className="card-holder animation"
              style={
                {
                  "--lenthAnimation":
                    (startAnimation + 2.5).toString() + lenthAnimation,
                  color: answers["genres"],
                } as React.CSSProperties
              }
            >
              <div className="card-back">
                {game.genres == undefined
                  ? "N/A"
                  : game.genres.map((temp) => temp.description).join(", ")}
              </div>

              <img src={steamdlelogo} className="card-front" />
            </div>
          </div>

          <div className="card pt-2  border-2 rounded-xl border-solid ele">
            <div
              className="card-holder animation"
              style={
                {
                  "--lenthAnimation":
                    (startAnimation + 3).toString() + lenthAnimation,
                  color: answers["reviews"],
                } as React.CSSProperties
              }
            >
              <div className="card-back">
                {reviewData
                  ? reviewData.query_summary.review_score_desc
                  : "N/A"}
              </div>
              <img src={steamdlelogo} className="card-front" />
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Row;
