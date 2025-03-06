import "./banner.css";

function Banner() {
  return (
    <div className="banner">
      <div className="bannerOverflow border-[#313236] rounded-xl border-6 grid grid-cols-6 gap-4">
        <h1> Game </h1>
        <h1> Release Date </h1>
        <h1> Developer </h1>
        <h1> Price </h1>
        <h1> Genre </h1>
        <h1> Reviews </h1>
      </div>
    </div>
  );
}

export default Banner;
