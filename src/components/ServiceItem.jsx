import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";

function ServiceItem({ name, price, image, onClick }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="serviceItem" onClick={onClick}>
      {!imgLoaded && (
        <>
          <Skeleton height={160} width="100%" borderRadius="12px" />
          <Skeleton height={15} width="100%" />
          <Skeleton height={15} width="20%" style={{ alignSelf: "flex-start" }} />
        </>
      )}

      <img
        src={image}
        alt={name}
        onLoad={() => setImgLoaded(true)}
        style={{
          width: "100%",
          borderRadius: "12px",
          display: imgLoaded ? "block" : "none",
        }}
      />

      {imgLoaded && (
        <section className='serviceText'>
          <p className='serviceName'>{name}</p>
          <p className='servicePrice' style={{ alignSelf: "flex-start" }}>${price}</p>
        </section>
      )}
    </div>
  );
}

export default ServiceItem;

