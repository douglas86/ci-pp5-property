// atomic design
import Header from "../organism/Header";
import Footer from "../organism/Footer";
import AlertBox from "../molecule/AlertBox";

/**
 * Layout template used for displaying the header and footer on all pages
 * This will also display the Alertbox under the header
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Header />
      </header>
      <AlertBox />
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
