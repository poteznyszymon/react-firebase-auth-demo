import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface UserDetails {
  lastName: string;
  firstName: string;
  email: string;
}

function Profile() {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data() as UserDetails);
          console.log(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("User is not logged in");
      }
    });
  };

  async function handleLogout() {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <main className="bg-slate-900 h-screen flex justify-center items-center flex-col">
      {!userDetails ? (
        <p className="text-white animate-bounce font-bold text-xl">Loading</p>
      ) : (
        <>
          <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative mx-4 mt-4 h-80 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
              <img src="https://placehold.co/400x350" alt="profile-picture" />
            </div>
            <div className="p-6 text-center">
              <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                {userDetails.email}

              </h4>
              <p className="block bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
                {userDetails.firstName}
              </p>
              <p className="block bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
                {userDetails.lastName}
              </p>
            </div>
            
          </div>
          <button
            onClick={handleLogout}
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
          >
            Logout
          </button>
        </>
      )}
    </main>
  );
}

export default Profile;
