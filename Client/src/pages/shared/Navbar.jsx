import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png'
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logOut } = useAuth();
  
  return (
    <div className='navbar bg-base-100 shadow-sm px-4 lg:px-6'>
      <div className='flex-1'>
        <div className='flex gap-2 items-center'>
          <img className='w-auto h-7' src={logo} alt='' />
          <span className='font-bold'>SoloSphere</span>
        </div>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal px-1'>
          <li className='ml-8 md:ml-0'>
            <Link to='/'>Home</Link>
          </li>
          <li className='-mx-4 md:-mx-0'>
            <Link to='/jobs'>All Jobs</Link>
          </li>

          {!user && (
            <li>
              <Link to='/login'>Login</Link>
            </li>
          )}
        </ul>

        {user && (
          <div className='dropdown dropdown-end z-50'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle avatar'
            >
              <div className='w-10 rounded-full' title=''>
                <img
                  // referrerPolicy='no-referrer'
                  referrerPolicy='no-referrer'
                  title={user?.displayName}
                  alt='User Profile Photo'
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
            >
              <li>
                <Link to='/addJob' className='justify-between'>
                  Add Job
                </Link>
              </li>
              <li>
                <Link to='/myPostedJobs'>My Posted Jobs</Link>
              </li>
              <li>
                <Link to='/myBids'>My Bids</Link>
              </li>
              <li>
                <Link to='/bid-request'>Bid Requests</Link>
              </li>
              <li className='mt-2'>
                <button
                  onClick={() => logOut()}
                  className='bg-gray-200 block text-center text-black hover:text-white'
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
