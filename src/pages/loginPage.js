import { useEffect, useState } from "react";
import images from "../utils/images"
import { useDispatch, useSelector } from "react-redux";
import { userSignin } from "../redux/userSlice"
import LoadingBar from "../components/loadingBar";
import { useNavigate } from "react-router-dom";
import '../css/session.css';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({email: '', password: ''});
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const { loading, error } = useSelector((store) => store.user);
  const navigate = useNavigate();


  useEffect(() => {
    const fieldsFilled = Object.values(userData).every(value => value.trim() !== '');
    setSubmitDisabled(!fieldsFilled);
  }, [userData]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userSignin(userData));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };
  return (
    <>
      <main className="main">
      <div className="desktop-banner-container">
        <img className="banner" src={images.banner1} alt="banner"/>
      </div>
      <div className="form-container">
      <div className={loading ? 'loading' : 'no-loading'}><LoadingBar /></div>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="header">
          <div className="signup-container">
            <p>Don't have an account yet?</p>
            <div onClick={()=> navigate('/signup')} className="signup-btn">Sign Up</div>
          </div>
        </div>
        <p className="welcome-txt">Welcome Back</p>
        <p className="signin-txt">Sign in to manage your project</p>
        <div className="input-container">
          <input placeholder="Email address" value={userData.email} onChange={handleOnChange} name="email" id="email" required className="input-field" />
          <label htmlFor="email" className="input-label">Email address</label>
          { error === true && <p className="invalid-signup">Incorrect email or password ❗❗</p>}
        </div>
        <div className="input-container">
          <input placeholder="password" value={userData.password} onChange={handleOnChange} required name="password" type={showPassword ? "text" : "password"} id="password" className="input-field"/>
          <label htmlFor="password" className="input-label">Password</label>
          <img className="show-password" src={ showPassword ? images.view : images.noView } alt='show-password' onClick={togglePasswordVisibility}/>
        </div>
        <input type="submit" disabled={submitDisabled} className="submit" value="Login" />
        <p className="forgot-password">Forgot Password?</p>
        <div className="google-auth">
          <img src={images.google} alt="google-logo" />
          <div>Signin with Google</div>
        </div>
      </form>
      </div>
      </main>
    </>
  );
}
