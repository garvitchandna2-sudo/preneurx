import React, { useEffect, useRef } from "react";
import "./PrizePool.css";

// Importing images from src/assets
import grandNike from "../assets/grandNike.png";
import grandAlexa from "../assets/grandAlexa.png";
import prize2 from "../assets/2prize.png";
import prize3 from "../assets/3prize.png";
import prize4 from "../assets/4prize.png";
import prize5 from "../assets/5pize.png";

const seniorImages = [grandNike, prize2, prize3, prize4, prize5];
const juniorImages = [grandAlexa, prize2, prize3, prize4, prize5]; // change if different

const PrizePool = () => {
  const seniorRef = useRef(null);
  const juniorRef = useRef(null);

  const createLoopingImages = (container, images) => {
    if (container.current) {
      for (let i = 0; i < 3; i++) {
        images.forEach((img, index) => {
          const imageElement = document.createElement("img");
          imageElement.src = img;
          imageElement.alt = `Prize ${index + 1}`;
          imageElement.className = "w-48 h-auto rounded-md inline-block mr-4";
          container.current.appendChild(imageElement);
        });
      }
    }
  };

  const startAutoScroll = (ref) => {
    let scrollSpeed = 0.5;
    let isHovered = false;

    ref.current.addEventListener("mouseenter", () => (isHovered = true));
    ref.current.addEventListener("mouseleave", () => (isHovered = false));

    const scrollLoop = () => {
      if (!isHovered && ref.current) {
        ref.current.scrollLeft += scrollSpeed;
        if (ref.current.scrollLeft >= ref.current.scrollWidth / 2) {
          ref.current.scrollLeft = 0;
        }
      }
      requestAnimationFrame(scrollLoop);
    };

    scrollLoop();
  };

  useEffect(() => {
    createLoopingImages(seniorRef, seniorImages);
    createLoopingImages(juniorRef, juniorImages);
    startAutoScroll(seniorRef);
    startAutoScroll(juniorRef);
  }, []);

  return (
    <div className="bg-white">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mt-4 text-transparent bg-clip-text fancy-gradient bg-gradient-to-r from-[#083ca0] to-black">
        PRENEURX TALENT CLASH WINNERS
      </h1>

      <h3 className="text-2xl font-bold text-center mt-3 mb-2 text-[#616161]">
        SENIOR CHAMPIONS
      </h3>
      <div className="marquee-wrapper1 bg-gray-100 py-4" ref={seniorRef}></div>

      <h3 className="text-2xl font-bold text-center mt-3 mb-3 text-[#616161]">
        JUNIOR BLAZERS
      </h3>
      <div className="marquee-wrapper1 bg-gray-100 py-4" ref={juniorRef}></div>

      <div className="flex justify-center mt-6">
        {/* <a
  href="https://drive.google.com/file/d/1AsLMl2fZvA2qurMzAg2ZH7OC0zjK5rIv/view?usp=sharing"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-[#083ca0] text-white font-semibold px-4 py-2 rounded-lg hover:bg-black hover:text-white transition-all duration-300"
>
  View Full Prize List
</a> */}


<button
  onClick={() => {
    window.open("https://drive.google.com/file/d/1wFJ5jqvZjnMd2tYpCHWb8ptMYGy-RqSQ/view?usp=drive_link", "_blank");
  }}
  className="bg-[#083ca0] text-white font-semibold px-4 py-2 rounded-lg hover:bg-black hover:text-white transition-all duration-300 mt-2 mb-4"
>
  View Full Prize List
</button>



        
      </div>
    </div>
  );
};

export default PrizePool;
