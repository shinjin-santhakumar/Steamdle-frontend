import "./Row.css";
import up from "./assets/up.png";
import down from "./assets/down.png";
import steamdlelogo from "./assets/steamdlelogo.png";
import "./Card.tsx";
import Card from "./Card.tsx";

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

  let price: string;

  if (game.is_free == true) price = "Free";
  else if (game.price_overview != null) {
    let temp = game.price_overview.initial.toString();
    price =
      "$" + temp.slice(0, temp.length - 2) + "." + temp.slice(temp.length - 2);
  } else price = "N/A";

  return (
    <div className="row rounded-xl">
      <>
        <div className="border-[#313236] rounded-xl border-6 grid grid-cols-6 gap-4">
          <Card
            animationDelay={0.5}
            color={answers["victory"] ? "green" : "red"}
            cardInfo={game.header_image}
            type="image"
          />

          <Card
            animationDelay={1}
            color={answers["release_date"]}
            cardInfo={game.release_date}
            type="release_date"
          />

          <Card
            animationDelay={1.5}
            color={answers["developers"]}
            cardInfo={game.developers}
            type="developers"
          />

          <Card
            animationDelay={2}
            color={answers["price"]}
            cardInfo={price}
            type="price"
          />

          <Card
            animationDelay={2.5}
            color={answers["genres"]}
            cardInfo={game.genres}
            type="genres"
          />

          <Card
            animationDelay={3}
            color={answers["reviews"]}
            cardInfo={
              reviewData ? reviewData.query_summary.review_score_desc : "N/A"
            }
            type="reviews"
          />
        </div>
      </>
    </div>
  );
}

export default Row;
