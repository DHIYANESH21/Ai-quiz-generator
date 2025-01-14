import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Navbar = () => {
  const [his,sethis]=useState(false);
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [userid,setuserid] = useState();
  const handleClick = () => {
    if (!isSignedIn && isLoaded) {
      navigate("/signin");
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      setuserid(user.id);
    }
  }, [isLoaded, user, userid]);

  const handlehistory=()=>{
    if(!his){
      navigate('/history/'+userid);
      sethis(true);
    }
    else{
      navigate('/home');
      sethis(false);
    }

  }

  return (
    <div>
      <div className="h-16 w-full bg-pink-500  flex justify-between items-center px-6 shadow-md">
        <h1 className="font-bold text-2xl text-white cursor-pointer ">
          EasyQuizzy
        </h1>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <UserButton />
              {!his?(
                <button className="border-none rounded-lg bg-blue-950 hover:scale-105 text-white font-semibold px-4 py-2 shadow-md transition duration-300 active:scale-90" onClick={handlehistory}>
                History
              </button>
              ):(
                <button className="border-none rounded-lg bg-blue-950 hover:scale-105 text-white font-semibold px-4 py-2 shadow-md transition duration-300 active:scale-90" onClick={handlehistory}>
                Home
              </button>
              )}
            </div>
          ) : (
            <button
              className="border-none rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 shadow-md transition duration-300"
              onClick={handleClick}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
