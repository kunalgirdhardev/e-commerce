import { useState } from "react";

function ProductGallery({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const displayImages =
    images.length > 0 ? images : ["https://via.placeholder.com/800"];

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl bg-border-subtle aspect-square group">
        <img
          src={displayImages[activeIndex]}
          alt="Product"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {displayImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {displayImages.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                activeIndex === index
                  ? "border-accent"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;
