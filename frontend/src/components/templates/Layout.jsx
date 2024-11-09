// atomic design
import Header from "../organism/Header";
import Footer from "../organism/Footer";
import AlertBox from "../molecule/AlertBox";

// custom hook
import useTokens from "../../hooks/useTokens";

// styling
import styles from "../../styles/components/templates/Layout.module.css";

/**
 * Layout template used for displaying the header and footer on all pages
 * This will also display the Alertbox under the header
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const Layout = ({ children }) => {
  // custom hooks to deal with token use
  useTokens();

  return (
    <>
      <Header />
      <AlertBox />
      <main className={styles.mainContent}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
