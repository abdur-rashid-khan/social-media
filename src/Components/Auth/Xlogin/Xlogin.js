import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useSignInWithFacebook, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { FcGoogle } from 'react-icons/fc';
import auth from "../../../firebase.init";
import UseToken from "../../Hook/UseToken/UseToken";
import Loading from "../../share/Loading/Loading";



const LoginWithOther = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const form = location.state?.from?.pathname || "/";
  let errorElement = "";
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [signInWithFacebook, fbUser, fbLoading, fbError] = useSignInWithFacebook(auth);
  // token hook
  const [token] = UseToken(user || fbUser);
  // facebook login
  const fbLogIn = () => {
    signInWithFacebook()
  }
  // for google
  const loginWithGoogle = () => {
    signInWithGoogle();
  };


  useEffect(() => {
    if (user || fbUser) {
      navigate(form, { replace: true });
      Swal.fire("Login successfully", "", "success");
    }
  }, [user, fbUser, navigate, form])


  // useEffect(() => {
  //   if (token) {
  //     navigate(form, { replace: true });
  //     Swal.fire("Login successfully", "", "success");
  //   }
  // }, [token, navigate, form])


  if (loading || fbLoading) {
    return <Loading></Loading>;
  }


  if (error || fbError) {
    errorElement = <p className="text-red-600">Error:{error?.message} </p>;
  }


  return (
    <div className="">
      {errorElement}
      <div className="flex flex-col w-full border-opacity-0">
        <div className="divider">OR</div>
      </div>
      <div className="flex items-center justify-center justify-items-center gap-4">
        <button className="w-full" onClick={loginWithGoogle}>
          <div className="google text-center hover:bg-[#b8c3d1c0] hover:text-white rounded border bg-slate-300 w-full">
            <span className="flex items-center gap-2 pt-2 justify-center">
              <FcGoogle className="text-4xl" />
              <span className="capitalize text-slate-800 font-serif font-semibold">login with google</span>
            </span>
          </div>
        </button>
        {/* <div className="google">
          <button onClick={fbLogIn}>
            <img style={{ width: '36px', height: '36px' }} src={fbIcon} alt="fb icon" />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default LoginWithOther;