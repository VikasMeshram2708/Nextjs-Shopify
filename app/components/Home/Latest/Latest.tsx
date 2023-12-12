import React from "react";

const Card = () => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          Shoes!
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div>
      </div>
    </div>
  );
};
const Latest = () => {
  return (
    <section className="mt-5">
      <h1 className="text-center text-xl md:text-3xl mb-2 md:mb-5">Popular Nearby Searches</h1>
      <div className="container mx-auto grid grid-cols-3 ">
        {Array.from({ length: 5 }).map((item, i) => {
          return (
            <div key={i}>
              <Card />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Latest;
