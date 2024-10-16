// atomic structure
import LandingPage from "../components/pages/LandingPage";
import AboutPage from "../components/pages/AboutPage";
import NotFound from "../components/pages/NotFound";

/**
 * Helper function used to store all url paths within this application
 * @type {[{path: string, id: number, page: JSX.Element, title: string},{path: string, id: number, page: JSX.Element, title: string},{path: string, id: number, page: JSX.Element}]}
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
  // error and not found pages
  {
    id: 3,
    page: <NotFound />,
    path: "*",
  },
];
