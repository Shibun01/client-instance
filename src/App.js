import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import AuthRoute from './middleware/AuthRoute';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Shop from './components/Shop';
import MapPage from './components/Map';
import SkeletonLoader from './components/Skeleton';

const pageVariants = {
  initial: {
    opacity: 0,
    y: -20 
  },
  in: {
    opacity: 1,
    y: 0
  },
  out: {
    opacity: 0,
    y: 20 
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Login />
          </motion.div>
        } />
        <Route path="/dashboard" element={
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          </motion.div>
        } />
        <Route path="/shop" element={
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <AuthRoute>
              <Shop />
            </AuthRoute>
          </motion.div>
        } />
        <Route path="/map" element={
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <AuthRoute>
              <MapPage />
            </AuthRoute>
          </motion.div>
        } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <Router>
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Suspense fallback={<SkeletonLoader />}>
        <AnimatedRoutes />
      </Suspense>
    </motion.div>
  </Router>
);

export default App;
