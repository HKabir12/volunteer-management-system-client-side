import { createBrowserRouter } from "react-router";
import Home from "../components/homepage/Home";
import Login from "../components/shared/Login";
import Registration from "../components/shared/Registration";
import AddVolunteer from "../pages/AddVolunteer";
//import VolunteerDetails from "../pages/VolunteerDetails";
import PrivateRoute from "../provider/PrivateRoute";
import VolunteerDetails from "../pages/VolunteerDetails";
import AllVolunteerPosts from "../pages/AllVolunteerPosts";
import ManageMyPosts from "../pages/ManageMyPosts";
import UpdatePage from "../pages/UpdatePage";
import NotFound from "../components/shared/NotFound";
import AuthLayout from "../layouts/AuthLayout";
import RootLayout from "../layouts/RootLayout";
import About from "../components/shared/About";
import Contact from "../components/shared/ContactInfo";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Registration,
      },
    ],
  },

  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/add-volunteer",
        Component: AddVolunteer,
      },
      {
        path: "/volunteer-post/:id",
        element: (
          <PrivateRoute>
            <VolunteerDetails></VolunteerDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-volunteers",
        element: <AllVolunteerPosts />,
      },
      {
        path: "/manage-posts",
        element: (
          <PrivateRoute>
            <ManageMyPosts />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-post/:id",
        element: (
          <PrivateRoute>
            <UpdatePage />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://volunteer-management-xi.vercel.app/volunteer-posts/${params.id}`),
      },
      {
        path: "/about-us",
        Component: About,
      },
       {
        path: "/contact-us",
        Component: Contact,
      },

    ],
  },

  {
    path: "*",
    Component: NotFound,
  },
]);

export default router;
