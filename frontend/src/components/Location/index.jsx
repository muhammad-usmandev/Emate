// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import LoadMore from "../LoadMoreButton";
// import MentorList from "../MentorList";
// import { slice } from "lodash";

// const Location = () => {
//   const [accepterLocation, setAccepterLocation] = useState({
//     latitude: null,
//     longitude: null,
//     loading: true,
//     error: null,
//   });
//   const [post, setPost] = useState([]);
//   const [isCompleted, setIsCompleted] = useState(false);
//   const [index, setIndex] = useState(3);
//   const initialPosts = post.slice(0, index);

//   const loadMore = () => {
//     setIndex(index + 3);
//     console.log(index);
//     if (index >= post.length) {
//       setIsCompleted(true);
//     } else {
//       setIsCompleted(false);
//     }
//   };

//   const getLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//           setAccepterLocation({
//             latitude,
//             longitude,
//             loading: false,
//             error: null,
//           });
//         },
//         (error) => {
//           setAccepterLocation({
//             latitude: null,
//             longitude: null,
//             loading: false,
//             error: "Geolocation error: " + error.message,
//           });
//         }
//       );
//     } else {
//       setAccepterLocation({
//         latitude: null,
//         longitude: null,
//         loading: false,
//         error: "Geolocation is not supported by this browser.",
//       });
//     }
//   };

//   useEffect(() => {
//     getLocation();
//   }, []);

//   const handleBtn = async () => {
//     try {
//       const nearestPost = await axios.post(
//         "http://localhost:3333/nearestMentor",
//         {
//           seekerLongitude: accepterLocation.longitude,
//           seekerLatitude: accepterLocation.latitude,
//         }
//       );
//       if (nearestPost.status === 200) {
//         const newMentors = nearestPost.data.nearMentors;
//         setPost([...post, ...newMentors]);
//         setIndex(index + 3);
//         setIsCompleted(index + 3 >= post.length);
//       }
//       // if (nearestPost.status === 200) {
//       //   setPost(nearestPost.data);
//       //   setPost(nearestPost.data.nearMentors);
//       //   console.log(nearestPost.data);
//       //   // console.log(nearestPost.data.nearMentors[0].name);
//       // }
//       else {
//         console.error("failed");
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//     }
//   };

//   return (
//     <>
//       <div className="mt-5 text-center flex justify-center items-center relative">
//         <button
//           className="hidden md:block hover:bg-indigo-200 hover:text-black mx-[10px] px-4 py-2 bg-indigo-400 text-white rounded-lg cursor-pointer"
//           onClick={() => {
//             handleBtn();
//           }}
//         >
//           Find Mentor
//         </button>
//       </div>
//       <div>
//         <div>
//           <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
//             {console.log("InitialPots", initialPosts)}
//             <MentorList initialPosts={initialPosts} />
//           </ul>
//         </div>
//         <div className="mt-10 flex justify-center">
//           {post.length > 0 && (
//             <LoadMore isCompleted={isCompleted} loadMore={loadMore} />
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Location;

import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadMore from "../LoadMoreButton";
import MentorList from "../MentorList";
import { slice } from "lodash";

const Location = () => {
  const [accepterLocation, setAccepterLocation] = useState({
    latitude: null,
    longitude: null,
    loading: true,
    error: null,
  });
  const [post, setPost] = useState([]);
  const [profileUrls, setProfileUrls] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(3);
  const initialPosts = post.slice(0, index);

  const loadMore = () => {
    setIndex(index + 3);
    console.log(index);
    if (index >= post.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setAccepterLocation({
            latitude,
            longitude,
            loading: false,
            error: null,
          });
        },
        (error) => {
          setAccepterLocation({
            latitude: null,
            longitude: null,
            loading: false,
            error: "Geolocation error: " + error.message,
          });
        }
      );
    } else {
      setAccepterLocation({
        latitude: null,
        longitude: null,
        loading: false,
        error: "Geolocation is not supported by this browser.",
      });
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handleBtn = async () => {
    try {
      const nearestPost = await axios.post(
        "http://localhost:3333/nearestMentor",
        {
          seekerLongitude: accepterLocation.longitude,
          seekerLatitude: accepterLocation.latitude,
        }
      );
      if (nearestPost.status === 200) {
        const newMentors = nearestPost.data.nearMentors;
        const newProfileUrls = nearestPost.data.profileUrls;
        setPost([...post, ...newMentors]);
        setProfileUrls([...profileUrls, ...newProfileUrls]);
        setIndex(index + 3);
        setIsCompleted(index + 3 >= post.length);
      } else {
        console.error("failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <div className="mt-5 text-center flex justify-center items-center relative">
        <button
          className="hidden md:block hover:bg-indigo-200 hover:text-black mx-[10px] px-4 py-2 bg-indigo-400 text-white rounded-lg cursor-pointer"
          onClick={() => {
            handleBtn();
          }}
        >
          Find Mentor
        </button>
      </div>
      <div>
        <div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {console.log("InitialPosts", initialPosts)}
            <MentorList initialPosts={initialPosts} profileUrls={profileUrls} />
          </ul>
        </div>
        <div className="mt-10 flex justify-center">
          {post.length > 0 && (
            <LoadMore isCompleted={isCompleted} loadMore={loadMore} />
          )}
        </div>
      </div>
    </>
  );
};

export default Location;
