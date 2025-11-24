
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CertificatesPage from './pages/CertificatesPage';

function App() {
  return (
      <Router>
          <div className="min-h-screen">
              <Header />
              <Routes>
                  <Route
                      path="/"
                      element={
                          <>
                              <Hero />
                              <About />
                              <Services />
                              {/* <Projects /> */}
                              <Certificates />
                              <Contact />
                          </>
                      }
                  />
                  <Route path="/certificates" element={<CertificatesPage />} />
              </Routes>
              <Footer />
          </div>
      </Router>
  );
}

export default App;
