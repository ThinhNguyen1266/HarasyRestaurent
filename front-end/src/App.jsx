import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import NavigationBar from "./components/NavigationBar";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Register from "./pages/Register";
import Venues from "./pages/Venues";
import intance from "./services";

function App() {
  const location = useLocation();

  const noNavFooterRoutes = ["/login", "/register"];

  const showNavFooter = !noNavFooterRoutes.includes(location.pathname);

  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data } = await intance.get("/products");
  //       console.log(data);
  //       setProducts(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);

  return (
    <div className="App">
      {showNavFooter && <NavigationBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/venues" element={<Venues />} />
        {/* <Route path="/menu" element={<Menu data={products} />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {showNavFooter && <Footer />}
    </div>
  );
}

export default App;
