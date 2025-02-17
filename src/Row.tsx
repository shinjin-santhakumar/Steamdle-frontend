import "./Row.css";
import up from "./assets/up.png";

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

  //console.log(props);
  // console.log(data1);
  // console.log();

  return (
    <div className="row">
      <>
        <div className="border-indigo-500 border-6 grid grid-cols-6 gap-7 h-24">
          <img
            id="header"
            className="pt-2 border-2 border-solid"
            style={
              {
                "--lenthAnimation":
                  (startAnimation + 1).toString() + lenthAnimation,
              } as React.CSSProperties
            }
            src={game.header_image}
            alt="logo"
          />

          <div
            className="pt-2 border-2 border-solid ele"
            style={
              {
                "--lenthAnimation":
                  (startAnimation + 1.5).toString() + lenthAnimation,
                color: answers["release_date"],
              } as React.CSSProperties
            }
          >
            {game.release_date.date.slice(-4)}
            {/* <img id="bg_date" src={up} /> */}
          </div>

          <div
            className="pt-2 border-2 border-solid ele"
            style={
              {
                "--lenthAnimation":
                  (startAnimation + 2).toString() + lenthAnimation,
                color: answers["developers"],
              } as React.CSSProperties
            }
          >
            {game.developers.map((temp) => temp).join(", ")}
          </div>

          <div
            className="pt-2 border-2 border-solid ele"
            style={
              {
                "--lenthAnimation":
                  (startAnimation + 2.5).toString() + lenthAnimation,
                color: answers["price"],
              } as React.CSSProperties
            }
          >
            {game.is_free == true
              ? "Free"
              : game.price_overview.final_formatted}
          </div>

          <div
            className="pt-2 border-2 border-solid ele"
            style={
              {
                "--lenthAnimation":
                  (startAnimation + 3).toString() + lenthAnimation,
                color: answers["genres"],
              } as React.CSSProperties
            }
          >
            {game.genres.map((temp) => temp.description).join(", ")}
          </div>

          <div
            className="pt-2 border-2 border-solid ele"
            style={
              {
                "--lenthAnimation":
                  (startAnimation + 0.5).toString() + lenthAnimation,
                color: answers["reviews"],
              } as React.CSSProperties
            }
          >
            {reviewData.query_summary.review_score_desc}
          </div>
        </div>
      </>
    </div>
  );
}

export default Row;
