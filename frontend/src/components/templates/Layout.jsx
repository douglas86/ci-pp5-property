import Header from "../organism/Header";
import Footer from "../organism/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
