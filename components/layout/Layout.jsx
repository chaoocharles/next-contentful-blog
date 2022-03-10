import Footer from "./Footer";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <div className="container">
      <NavBar />
      <div className="content">{children}</div>
      <Footer />

      <style jsx>
        {`
          .content {
            min-height: calc(100vh - 190px);
            max-width: 750px;
            padding: 30px;
            margin: auto;
          }
        `}
      </style>
    </div>
  );
};

export default Layout;
