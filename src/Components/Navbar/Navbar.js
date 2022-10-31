import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../Loading/Loading';


const Navbar = () => {
	const [user, loading, error] = useAuthState(auth);
	const logOut = () => {
		signOut(auth);
	};
	if (loading) {
		return <Loading></Loading>
	}
	if (error) {
		return console.log('Please try agin');
	}
	return (
		<nav className='pb-5'>
			<div className="">
				<div className="navbar bg-base-100 shadow-2xl z-[99999] border-b-[4px] border-[#ececec] fixed">
					<div className="flex-1">
						<Link to='/' className="normal-case text-xl font-bold text-slate-700">Dashboard</Link>
					</div>
					<div className="flex-none">
						<div className="dropdown dropdown-end">
							<label tabIndex={0} className="btn btn-ghost btn-circle">
								<div className="indicator">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
									<span className="badge badge-sm indicator-item">8</span>
								</div>
							</label>
							<div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
								<div className="card-body">
									<span className="font-bold text-lg">8 Items</span>
									<span className="text-info">Subtotal: $999</span>
									<div className="card-actions">
										<button className="btn btn-primary btn-block">View cart</button>
									</div>
								</div>
							</div>
						</div>
						<div className="dropdown dropdown-end">
							<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
								<div className="w-10 rounded-full ">
									{
										user?.photoURL ?
											<div className="avatar online ">
												<div className="rounded-full">
													<img src={user?.photoURL} alt='' />
												</div>
											</div>
											:
											<div className="avatar">
												<div className="rounded-full">
													<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full">
														<path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
													</svg>
												</div>
											</div>
									}
								</div>
							</label>
							<ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow-2xl rounded-[8px] bg-base-100 w-52 ">
								<li className='hover:bg-[#adadad4b]'>
									<button className="justify-between">
										Profile
										<span className="badge">New</span>
									</button>
								</li>
								<li className='hover:bg-[#adadad4b]'><Link to='/'>Settings</Link></li>
								<li className='hover:bg-[#adadad4b]'>
									{
										user ? <button className='capitalize mt-4 inline-block border text-slate-400 hover:bg-blue-700 text-sm hover:text-white px-6 py-2 rounded' onClick={logOut}>logOut</button> :
											<Link to={'/login'} className='capitalize mt-1 inline-block border text-slate-800 text-sm hover:text-black px-6 py-2 rounded text-center'>logIn</Link>
									}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;