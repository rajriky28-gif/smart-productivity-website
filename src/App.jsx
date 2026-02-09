import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import PhilosophyPage from './pages/PhilosophyPage';
import ImpactPage from './pages/ImpactPage';
import StridePage from './pages/StridePage';
import UpcomingPage from './pages/UpcomingPage';
import RoadmapPage from './pages/RoadmapPage';
import PrivacyPage from './pages/PrivacyPage';
import PrivacyDetailPage from './pages/PrivacyDetailPage';
import TermsPage from './pages/TermsPage';
import TermsDetailPage from './pages/TermsDetailPage';
import HelpPage from './pages/HelpPage';
import HelpDetailPage from './pages/HelpDetailPage';
import ContactPage from './pages/ContactPage';
import AuthPage from './pages/AuthPage';
import CareerPage from './pages/CareerPage';
import AdminPage from './pages/AdminPage';
import JobApplicationPage from './pages/JobApplicationPage';
import { AnimatePresence } from 'framer-motion';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <div className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
        <ScrollToTop />
        <Navbar />

        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/stride" element={<StridePage />} />
            <Route path="/philosophy" element={<PhilosophyPage />} />
            <Route path="/impact" element={<ImpactPage />} />
            <Route path="/upcoming" element={<UpcomingPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/privacy/:platform" element={<PrivacyDetailPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/terms/:product" element={<TermsDetailPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/help/:category" element={<HelpDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/careers" element={<CareerPage />} />
            <Route path="/careers/:jobId" element={<JobApplicationPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </AnimatePresence>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
