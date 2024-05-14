// /* eslint-disable no-template-curly-in-string */
// import { Link } from "react-router-dom";
// import hsProfile from "../../assets/png/hsprofile.png";

// const MentorList = (props) => {
//   return (
//     <>
//       {props.initialPosts.map((items, index) => {
//         return (
//           <li
//             aria-label="Listing"
//             key={items.id}
//             className="doner flex flex-col-reverse"
//           >
//             <div className="flex">
//               <Link to={`/userprofile/${items.id}`}>
//                 <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col justify-center items-center">
//                   <div>
//                     <img
//                       className="object-center object-cover h-auto w-full"
//                       src={hsProfile}
//                       alt="photo"
//                     />
//                   </div>
//                   <div className="text-center py-8 sm:py-6">
//                     {/* <p className="text-xl text-gray-700 font-bold mb-2">Description......</p> */}
//                     <p className="text-base text-gray-400 font-normal">
//                       Software Engineer
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           </li>
//         );
//       })}
//     </>
//   );
// };

// export default MentorList;
import React from "react";
import { Link } from "react-router-dom";

const MentorList = ({ initialPosts, profileUrls }) => {
  return (
    <>
      {initialPosts.map((mentor, index) => (
        <li key={mentor.id} className="doner flex flex-col-reverse">
          <div className="flex">
            <Link to={`/userprofile/${mentor.id}`}>
              <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col justify-center items-center">
                <div>
                  <img
                    className="object-center object-cover h-auto w-full"
                    src={profileUrls[index]} // Use profile URL at the same index as mentor
                    alt="photo"
                  />
                </div>
                <div className="text-center py-8 sm:py-6">
                  <p className="text-base text-gray-400 font-normal">
                    {mentor.name}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </li>
      ))}
    </>
  );
};

export default MentorList;

// const MentorList = (props) => {
//   return (
//     <>
//       {props.initialPosts.map((mentor) => (
//         <li key={mentor.id} className="doner flex flex-col-reverse">
//           <div className="flex">
//             <Link to={`/userprofile/${mentor.id}`}>
//               <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col justify-center items-center">
//                 <div>
//                   <img
//                     className="object-center object-cover h-auto w-full"
//                     src={mentor.profilePicture}
//                     alt={mentor.name} // Use mentor's name as alt text
//                   />
//                 </div>
//                 <div className="text-center py-8 sm:py-6">
//                   <p className="text-base text-gray-400 font-normal">
//                     {mentor.role}
//                   </p>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         </li>
//       ))}
//     </>
//   );
// };

// export default MentorList;
