// atomic structure
import LandingPage from "../components/pages/LandingPage";
import AboutPage from "../components/pages/AboutPage";
import NotFound from "../components/pages/NotFound";
import AdminDashboard from "../components/pages/dashboards/AdminDashboard";
import UsersDashboard from "../components/pages/dashboards/UsersDashboard";

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
    id: 3,
    title: "Dashboard",
    page: <AdminDashboard />,
    path: "/admin_dashboard",
    role: "admin",
  },
  {
    id: 4,
    title: "Dashboard",
    page: <UsersDashboard />,
    path: "/user_dashboard",
    role: "user",
  },
  // error and not found pages
  {
    id: 5,
    page: <NotFound />,
    path: "*",
  },
];
