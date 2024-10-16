import Header from "../organism/Header";
import Footer from "../organism/Footer";
import AlertBox from "../molecule/AlertBox";

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
