"use client";

import Image from "next/image";
import { useState } from "react";

const RoomGallery = () => {
  const images = [
    "/img/room1.png",
    "/img/room2.png",
    "/img/room3.png",
    "/img/room1.png",
    "/img/room2.png",
    "/img/room3.png"
  ];

  const [mainImage, setMainImage] = useState(images[0]); // Default main image
  const maxThumbnails = 3;
  const [showAll, setShowAll] = useState(false);
  const extraPhotos = images.length - maxThumbnails;

  return (
    <div className="flex justify-center items-center bg-[#D2ECE4] py-10">
      <div className="relative max-w-500 rounded-xl overflow-hidden shadow-lg">
        {/* Main Image */}
        <Image
          src={mainImage}
          alt="Room Image"
          width={800}
          height={500}
          className="w-200 h-120 object-cover rounded-xl"
        />

                {/* Thumbnail Images Overlay */}
                <div className="absolute bottom-4 left-4 flex gap-2">
          {(showAll ? images : images.slice(0, maxThumbnails)).map((image, index) => (
            <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden">
              <Image
                src={image}
                alt={`Thumbnail ${index}`}
                layout="fill"
                objectFit="cover"
                className="cursor-pointer hover:opacity-80 transition"
                onClick={() => setMainImage(image)} // Change main image on click
              />

              {/* Overlay for extra photos */}
              {!showAll && index === maxThumbnails - 1 && extraPhotos > 0 && (
                <button
                  className="absolute inset-0 bg-black opacity-50 flex items-center justify-center"
                  onClick={() => setShowAll(true)}
                >
                  <span className="text-white font-semibold text-sm">+{extraPhotos} photos</span>
                  
                </button>
              )}
              
              
            </div>
          ))}
          
{/* Hide extra photos button */}
{/* {showAll && (
        <button
          className="mt-4 bg-white text-black px-4 py-2 rounded-lg"
          onClick={() => setShowAll(false)}
        >
          Show Less
        </button>
      )} */}
        </div>
        
          </div>
    </div>
  );
};

export default RoomGallery;

// "use client";

// import Image from "next/image";
// import { useState } from "react";

// const RoomGallery = () => {
  // const images = [
  //   "/img/image_4.png",
  //   "/img/image_1.png",
  //   "/img/image_2.png",
  //   "/img/image_4.png",
  //   "/img/image_3.png",
  //   "/img/image_3.png",
  //   "/img/image_3.png",
  // ];

  // const [mainImage, setMainImage] = useState(images[0]); // Default main image
  // const maxThumbnails = 3;
  // const [showAll, setShowAll] = useState(false);
  // const extraPhotos = images.length - maxThumbnails;

//   return (
//     <div className="flex flex-col items-center bg-[#D2ECE4] py-10">
//       <div className="relative max-w-2xl rounded-xl overflow-hidden shadow-lg">
//         {/* Main Image */}
//         <Image
//           src={mainImage}
//           alt="Room Image"
//           width={800}
//           height={500}
//           className="w-200 h-120 object-cover rounded-xl"
//         />

        // {/* Thumbnail Images Overlay */}
        // <div className="absolute bottom-4 left-4 flex gap-2">
        //   {(showAll ? images : images.slice(0, maxThumbnails)).map((image, index) => (
        //     <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden">
        //       <Image
        //         src={image}
        //         alt={`Thumbnail ${index}`}
        //         layout="fill"
        //         objectFit="cover"
        //         className="cursor-pointer hover:opacity-80 transition"
        //         onClick={() => setMainImage(image)} // Change main image on click
        //       />

        //       {/* Overlay for extra photos */}
        //       {!showAll && index === maxThumbnails - 1 && extraPhotos > 0 && (
        //         <button
        //           className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        //           onClick={() => setShowAll(true)}
        //         >
        //           <span className="text-white font-semibold text-sm">+{extraPhotos} photos</span>
        //         </button>
        //       )}
        //     </div>
        //   ))}
        // </div>
      // </div>

      {/* Hide extra photos button */}
      // {showAll && (
      //   <button
      //     className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-lg"
      //     onClick={() => setShowAll(false)}
      //   >
      //     Show Less
      //   </button>
      // )}
    // </div>
//   );
// };

// export default RoomGallery;
