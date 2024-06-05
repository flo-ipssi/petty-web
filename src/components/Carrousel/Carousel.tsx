import React, { FC } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const responsive = {
  0: { items: 1 },
  568: { items: 1 },
  1024: { items: 2 },
};

interface AliceProps {
  items: any;
}

const Carousel: FC<AliceProps> = ({ items }) => {
  const gallery = items.map(
    (
      item: { id: React.Key | null | undefined; file: { url: string } },
      index: any
    ) => (
      <div
        className="item h-64 m-auto"
        style={{
          backgroundImage: `url(${item.file.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        data-value={index}
        key={item.id}
      />
    )
  );

  return (
    
    <AliceCarousel
      mouseTracking
      items={gallery}
      responsive={responsive}
      controlsStrategy="alternate"
    />
  );
};

export default Carousel;
