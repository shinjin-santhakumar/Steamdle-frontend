import "./banner.css";

function Banner() {
  return (
    <div className="banner">
      <div className="bannerOverflow border-[#313236] bg-[#313236] rounded-xl border-6 grid grid-cols-6 gap-4">
        <h1 className="bg-zinc-500 rounded-xl"> Game </h1>
        <h1 className="bg-zinc-500 rounded-xl"> Release Date </h1>
        <h1 className="bg-zinc-500 rounded-xl"> Developer </h1>
        <h1 className="bg-zinc-500 rounded-xl"> Price </h1>
        <h1 className="bg-zinc-500 rounded-xl"> Genre </h1>
        <h1 className="bg-zinc-500 rounded-xl"> Reviews </h1>
      </div>
    </div>
  );
}

export default Banner;
