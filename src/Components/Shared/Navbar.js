import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Firebase/firebase.init';
import { signOut } from 'firebase/auth';
import Loading from '../Shared/Loading'
import brandLogo from '../../assets/brandLogo.png';

const Navbar = () => {
    const [user, loading] = useAuthState(auth);
    const handleSignOut = () => {
        signOut(auth);
        localStorage.removeItem("accessToken");
    }
    if (loading) {
        return <Loading />
    }
    const navLinks = <>
        <li><NavLink to='/' className='text-xl'>Home</NavLink></li>
        <li><NavLink to='/products' className='text-xl '>Products</NavLink></li>
        <li><NavLink to='/dashboard' className='text-xl '>Dashboard</NavLink></li>
        <li><NavLink to='/myPortfolio' className='text-xl '>Portfolio</NavLink></li>
        <li><NavLink to='/blogs' className='text-xl '>Blogs</NavLink></li>
        {!user && <li><Link to={'/register'}>Register</Link></li>}
        <li>
            {
                user ? <button className='btn btn-NavLink btn-outline  text-decoration-none fs-5' onClick={handleSignOut}>Sign out</button> : (<NavLink to='/login' className='rounded-lg text-xl '>Login</NavLink>)
            }
        </li>
    </>

    return (
        <>
            <div className="navbar w-full top-0 z-50 lg:px-10 bg-base-100 fixed shadow-xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex="0" className="btn btn-circle swap swap-rotate mx-2 lg:hidden">
                            <input type="checkbox" />
                            <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
                            <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>
                        </label>
                        <ul tabIndex="0" className="menu bg-base-100 menu-compact dropdown-content mt-3 p-2 shadow w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to='/' >
                        <img src={brandLogo} alt="Brand_Logo" width="200" height="200" className="" />
                    </Link>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal bg-base-100 gap-x-2 p-0">
                        {navLinks}
                    </ul>
                </div>
            </div>
        </>

    );
};

export default Navbar;