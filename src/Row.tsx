import "./Row.css";

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

  let db_data = props.data.data1[0];

  //console.log(props);

  return (
    <div className="row">
      <>
        {/* <h1 className="text-3xl font-bold underline"> Hello world! </h1> */}
        <div className="grid grid-cols-6 gap-7">
          <div
            className="p-8 box border-2 border-solid"
            style={
              {
                "--lenthAnimation":
                  (startAnimation + 0.5).toString() + lenthAnimation,
              } as React.CSSProperties
            }
          >
            {game.name}
          </div>

          <img
            className="p-8 box border-2 border-solid img"
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
            className="p-8 box border-2 border-solid"
            style={
              {
                "--lenthAnimation":
                  (startAnimation + 1.5).toString() + lenthAnimation,
              } as React.CSSProperties
            }
          >
            {game.release_date.date}
          </div>

          <div
            className="p-8 box border-2 border-solid"
            style={
              {
                "--lenthAnimation":
                  (startAnimation + 2).toString() + lenthAnimation,
              } as React.CSSProperties
            }
          >
            {game.developers[0]}
          </div>

          <div
            className="p-8 box border-2 border-solid"
            style={
              {
                "--lenthAnimation":
                  (startAnimation + 2.5).toString() + lenthAnimation,
              } as React.CSSProperties
            }
          >
            {game.is_free == true
              ? "Free"
              : game.price_overview.final_formatted}
          </div>

          <div
            className="p-8 box border-2 border-solid"
            style={
              {
                "--lenthAnimation":
                  (startAnimation + 3).toString() + lenthAnimation,
              } as React.CSSProperties
            }
          >
            {db_data.genres}
          </div>
        </div>
        {/* <ul>
            <li key={game.app_id}></li>
            
            <li key={game.app_id}>{}</li>
        </ul> */}

        {/* <li key={game.app_id}>{game.review_score_description}</li>` */}
        {/* <li key={game.app_id}>{game.developer}</li>
        <li key={game.app_id}>{game.publisher}</li>
        <li key={game.app_id}>{game.price}</li>
        <li key={game.app_id}>{}</li> */}
      </>
    </div>
  );
}

export default Row;
