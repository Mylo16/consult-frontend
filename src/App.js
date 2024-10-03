import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserFromLocalStorage } from './redux/userSlice';
import ProtectedRoute from './components/protectedRoute';
import Navbar from './components/navBar';
import CreateTeam from './pages/createTeam';
import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';
import HomePage from './pages/homePage';
import LandingPage from './pages/landingPage';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
  },[]);

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute userAllowed={!user} redirectTo="/" />}>
          <Route path='/' element={<Navbar />}>
            <Route index element={<CreateTeam />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/summary' element={<LandingPage />} />
          </Route>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedRoute userAllowed={!!user} redirectTo="/" />}>
          <Route path='/' element={<Navbar />}>
            <Route index element={<CreateTeam />} />
            <Route path='/home' element={<HomePage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
