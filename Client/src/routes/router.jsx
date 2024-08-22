import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import ErrorPage from "../error/ErrorPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import JobDetails from "../pages/JobDetails";
import AddJob from "../pages/AddJob";
import MyPostedJobs from "../pages/MyPostedJobs";
import UpdateJob from "../pages/UpdateJob";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        // loader: () => fetch(`${import.meta.env.VITE_API_URL}/jobs`),
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/job/:id',
        element: <JobDetails />,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`),
      },
      {
        path: '/update/:id',
        element: <UpdateJob />,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`),
      },
      {
        path: '/addJob',
        element: <AddJob/>
      },
      {
        path: 'myPostedJobs',
        element: <MyPostedJobs/>
      }
    ],
  },
]);

export default router;