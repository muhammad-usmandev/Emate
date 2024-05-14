import React, { useState, useEffect } from "react";
import Map from "../../components/Map";
import { useParams } from "react-router-dom";
import { Vortex } from "react-loader-spinner";
import axios from "axios";

const UserProfile = (props) => {
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 31.4834,
    lng: 74.3969,
  });
  const [image, setImage] = useState("");
  const [profile, setProfile] = useState({});
  const { id } = useParams();
  const user = id;
  let [isLoading, setIsLoading] = useState(true);
  console.log(user);

  useEffect(() => {
    axios
      .get("http://localhost:3333/user/" + user)
      .then((response) => {
        console.log(response.data.fullUrl);
        console.log(response.data.user1.location.coordinates[1]);
        setSelectedLocation({
          lat: response.data.user1.location.coordinates[1],
          lng: response.data.user1.location.coordinates[0],
        });
        setProfile(response.data.user1);
        setImage(response.data.fullUrl);
        setIsLoading((isLoading = false));
      })
      .catch((e) => console.log(e));
  }, [user]);

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh", // Adjust this value as needed to center vertically
    },
  };

  return (
    <>
      {isLoading ? (
        <div style={styles.container}>
          <Vortex
            visible={true}
            height="80"
            width="80"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={["pink", "white", "blue", "yellow", "orange", "purple"]}
          />
        </div>
      ) : (
        <div className="h-full bg-gray-200 p-8">
          <div className="bg-white rounded-lg shadow-xl pb-8">
            <div className="w-full h-[250px]">
              <img
                src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
                className="w-full h-full rounded-tl-lg rounded-tr-lg"
              />
            </div>
            <div className="flex flex-col items-center -mt-20">
              <img
                src={image}
                className="w-40 border-4 border-white rounded-full"
              />
              <div className="flex items-center space-x-2 mt-2">
                <p className="text-2xl">{profile.name}</p>
                <span className="bg-blue-500 rounded-full p-1" title="Verified">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-100 h-2.5 w-2.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </span>
              </div>
              <p className="text-gray-700">
                Senior Software Engineer at Tailwind CSS
              </p>
            </div>
            <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
              <div className="flex items-center space-x-4 mt-2">
                {/* onClick={axios.post(
                    `http://localhost:3333/send-request${profile.id}`
                  )} */}
                <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                  </svg>
                  <span>Connect</span>
                </button>
                <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Message</span>
                </button>
              </div>
            </div>
          </div>
          {/* Additional profile sections */}
          <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
            <div className="w-full flex flex-col 2xl:w-1/3">
              <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                <h4 className="text-xl text-gray-900 font-bold">
                  Personal Info
                </h4>
                <ul className="mt-2 text-gray-700">
                  <li className="flex border-y py-2">
                    <span className="font-bold w-24">Full name:</span>
                    <span className="text-gray-700">{profile.name}</span>
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Mobile:</span>
                    <span className="text-gray-700">{profile.phone}</span>
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Email:</span>
                    <span className="text-gray-700">{profile.email}</span>
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Location:</span>
                    <span className="text-gray-700">{profile.address}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col w-full 2xl:w-2/3">
              <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                <h4 className="text-xl text-gray-900 font-bold">About</h4>
                {console.log(profile)}
                <p className="mt-2 text-gray-700">{profile.about}</p>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row m-3">
              <div className="w-full">
                <Map selectedLocation={selectedLocation} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
