import "./Row.css";
import Card from "./Card.tsx";

import { ComponentProps } from "react";

function Row(props: ComponentProps<any>) {
  //let game = ; //props[10].json(); //new Map(Object.entries(data));
  //console.log();

  console.log(props);
  let game = props.data.info;
  let answers = props.data.colors;
  console.log(game.release_date);

  let price: string;

  if (game.price == "Free") price = "Free";
  else if (game.price == "N/A") price = "N/A";
  else {
    let temp: string = `${game.price}`;
    console.log(typeof temp);
    price =
      "$" + temp.slice(0, temp.length - 2) + "." + temp.slice(temp.length - 2);
  }

  return (
    <div className="row-container">
      <div className="row rounded-xl">
        <div className="border-[#313236] rounded-xl border-6 grid grid-cols-6 gap-4 xs:gap-40">
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
            cardInfo={game.reviews}
            type="reviews"
          />
        </div>
      </div>
    </div>
  );
}

export default Row;
