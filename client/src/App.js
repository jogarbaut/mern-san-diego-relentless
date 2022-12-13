import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from './pages/Home';
import About from './pages/About';

// Components
import Banner from './components/Banner';
import CustomNavbar from './components/CustomNavbar';
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Banner />
        <CustomNavbar />
        <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
