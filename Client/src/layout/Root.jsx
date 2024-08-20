import { Outlet } from "react-router-dom"
import Navbar from "../pages/shared/Navbar"
import Footer from "../pages/shared/Footer"

const Root = () => {
  return (
    <>
      <div className='max-w-7xl mx-auto px-4 lg:px-0'>
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
export default Root