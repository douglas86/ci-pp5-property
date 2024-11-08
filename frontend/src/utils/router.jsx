// pages
import LandingPage from "../components/pages/LandingPage";
import AboutPage from "../components/pages/AboutPage";

// users pages
import UsersDashboard from "../components/pages/dashboards/UsersDashboard";

// admin pages
import Users from "../components/pages/admin/Users";
import Property from "../components/pages/admin/Property";

// not found page
import NotFound from "../components/pages/NotFound";
import VisitProperties from "../components/pages/user/VisitProperties";

/**
 * Helper function used to store all url paths within this application
 * id: unique identified to map around used for React application
 * title: what you want displayed on navbar
 * page: component to be loaded,
 * path: the url path for that component
 * role: what your role is in the organization, this is also used to protect pages from certain view
 * @type {[{path: string, id: number, page: JSX.Element, heading: string},{path: string, id: number, page: JSX.Element, heading: string},{path: string, id: number, page: JSX.Element}]}
 */
export const router = [
  // links on navbar
  {
    id: 1,
    title: "Home",
    page: <LandingPage />,
    path: "/",
  },
  {
    id: 2,
    title: "About",
    page: <AboutPage />,
    path: "/about",
  },
  // dashboards
  {
    id: 4,
    title: "Dashboard",
    page: <UsersDashboard />,
    path: "/user_dashboard",
    role: "user",
  },
  {
    id: 5,
    page: <VisitProperties />,
    path: "/properties",
    role: "user",
  },
  // admin pages
  {
    id: 6,
    title: "Dashboard",
    page: <Users />,
    path: "/admin/users",
    role: "admin",
  },
  {
    id: 7,
    page: <Property />,
    path: "admin/property",
    role: "admin",
  },
  // error and not found pages
  {
    id: 8,
    page: <NotFound />,
    path: "*",
  },
];
