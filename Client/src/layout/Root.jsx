import { Outlet } from "react-router-dom"
import Navbar from "../pages/shared/Navbar"
import Footer from "../pages/shared/Footer"

const Root = () => {
  return (
    <>
      <div className='max-w-6xl mx-auto px-4 lg:px-0 font-lato'>
        <Navbar />
        <div className='min-h-[calc(100vh-306px)]'>
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Root