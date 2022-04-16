import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../shared/services/auth.service";
import GoogleLogin from "react-google-login";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(false);

  const { setUser } = authService.useRedirectLoggedIn(navigate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loggedIn = await authService.login({ email, password });
      setUser(loggedIn);
    } catch (e) {
      setPassword("");
      setErrors(true);
    }
  };

  const handleGoogleResponse = async (googleData) => {
    try {
      const loggedIn = await authService.loginWithGoogleToken(googleData);
      setUser(loggedIn);
    } catch (e) {
      setPassword("");
      setErrors(true);
    }
  };

  return (
    <div className="form-signin">
      <form onSubmit={handleSubmit}>
        <h1 className="">Sign in</h1>

        <div className="">
          <input
            type="email"
            className={`form-control ${errors ? "is-invalid" : ""}`}
            id="emailInput"
            placeholder="name@example.com"
            onFocus={() => setErrors(false)}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <label htmlFor="emailInput">Email address</label>
        </div>
        <div className="">
          <input
            type="password"
            className={`form-control ${errors ? "is-invalid" : ""}`}
            id="passwordInput"
            placeholder="Password"
            onFocus={() => setErrors(false)}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <label htmlFor="passwordInput">Password</label>
          <div className="invalid-feedback">Incorrect email or password</div>
        </div>

        <button className="" type="submit">
          Sign in
        </button>
      </form>
      <GoogleLogin
        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
        buttonText="Sign in with Google"
        className="ct-button ct-button--secondary mt-4"
        onSuccess={handleGoogleResponse}
        onFailure={handleGoogleResponse}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
};

export default Login;
