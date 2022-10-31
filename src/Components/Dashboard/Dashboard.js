import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
// for  icon 
import { FaHome } from 'react-icons/fa';
import { AiFillSetting } from 'react-icons/ai';
import {HiMenuAlt2,HiViewGridAdd,HiPuzzle,} from 'react-icons/hi';
import auth from '../../firebase.init';
import Loading from '../share/Loading/Loading';
import CustomLink from '../share/Active/CustomLink';



const DashBoard = () => {
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <Loading></Loading>
  }
  if (error) {
    console.log(error);
  }
  const logout = () => {
    signOut(auth);
  };
  return (
    <>
      <div className="container mx-auto px-2 lg:px-0">
        <div className="drawer drawer-mobile h-[90vh]">
          <input id="open-dashboard-menu" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col bg-slate-200 py-6" id='total_content'>
            {/* <!-- Page content here --> */}
            <div className="text-left mt-4 fixed" style={{ zIndex: '1111111' }}>
              <label htmlFor="open-dashboard-menu" className="w-10 rounded h-10 inline-block cursor-pointer bg-blue-500 hover:bg-blue-800 text-white lg:hidden"><span className='text-center'>
                <HiMenuAlt2 className='text-4xl'/>
              </span> </label>
            </div>
            <div className="text-center ">
              <div id="header" className='py-6'>

              </div>
              <div className="text-left px-3">
                <Outlet></Outlet>
              </div>
            </div>

          </div>
          <div className="drawer-side ">
            <label htmlFor="open-dashboard-menu" className="drawer-overlay"></label>
            <ul className="menu p-4 mt-4 overflow-y-auto w-[17rem] bg-[#ffffff] border-r border-[#00000018] shadow-2xl  text-slate-600 font-semibold" id='slideBar'>
              <div className="profile text-center flex gap-3 items-center fixed bottom-0">
                {
                  user?.photoURL ?
                    <div className="avatar online ">
                      <div className="w-[30px] rounded-full">
                        <img src={user?.photoURL} alt='' />
                      </div>
                    </div>
                    :
                    <div className="avatar">
                      <div className="w-24 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>
                }
                <strong className='block text-sm'>{user?.displayName}</strong>
                <button className='text-xl'><AiFillSetting></AiFillSetting></button>
              </div>
              {/* <!-- Sidebar content here --> */}

              <li className='py-1 text-lg hover:text-black rounded'><CustomLink className='flex gap-4 capitalize' to={'/'}><FaHome className='text-slate-600 w-6 '></FaHome>Home</CustomLink></li>
              <li className='py-1 text-lg hover:text-black rounded'><CustomLink className='flex gap-4 capitalize' to={'/create/new-post'}><HiViewGridAdd className='text-slate-600 w-6' />Create New Post</CustomLink></li>
              <li className='py-1 text-lg hover:text-black rounded'><CustomLink className='flex gap-4 capitalize' to={'/manage-news'}><HiPuzzle className='text-slate-600 w-6' /> Manage Post</CustomLink></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;