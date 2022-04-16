import React from 'react';
import { BehaviorSubject } from 'rxjs';
import { http } from "./http.service";

const userSubject = new BehaviorSubject(null);

export const authService = {
  login,
  logout,
  refreshToken,
  register,
  forgotPassword,
  resetPassword,
  useRedirectLoggedIn,
  useUserAuth,
  loginWithGoogleToken,
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
};

export function register(params) {
  return http.post("/auth/register", params);
}

export function login({ email, password }) {
  return http.post("/auth/login", { email, password }).then((response) => {
    const { user, tokens } = response.data;
    const { token, expires } = tokens.access;
    userSubject.next({ ...user, token });
    startRefreshTokenTimer(expires);
    return user;
  });
}

export function logout() {
  http.post(`/auth/logout`, {}).finally(() => {
    stopRefreshTokenTimer();
    userSubject.next(null);
    window.location.replace('/');
  }).catch(() => window.location.replace('/'));
}

export function refreshToken() {
  stopRefreshTokenTimer();
  return http
    .post(`/auth/refresh-tokens`)
    .then((response) => {
      const { user, tokens } = response.data;
      const { token, expires } = tokens.access;
      userSubject.next({ ...user, token });
      startRefreshTokenTimer(expires);
      return user;
    })
    .catch(() => {
      console.log("You must login to access");
    });
}

export function forgotPassword(email) {
  return http.post("/auth/forgot-password", { email });
}

export function resetPassword({ token, password }) {
  return http.post(`/auth/reset-password?token=${token}`, { password });
}

export function useRedirectLoggedIn(navigate) {
  const [user, setUser] = React.useState();
  React.useEffect(() => {
    if (user) {
      navigate("/", { replace: true })
    }
    // eslint-disable-next-line
  }, [user]);

  return { user, setUser }
}

export function useUserAuth() {
  const [user, setUser] = React.useState();
  React.useEffect(() => {
    const subscription = authService.user.subscribe(x => setUser(x));
    return subscription.unsubscribe;
  }, []);
  return user
}

export function loginWithGoogleToken(googleData) {
  return http.post('/auth/login/google', { token: googleData.tokenId }).then((response) => {
    const { user, tokens } = response.data;
    const { token, expires } = tokens.access;
    userSubject.next({ ...user, token });
    startRefreshTokenTimer(expires);
    return user;
  });
}



export default authService;

let refreshTokenTimeout;

function startRefreshTokenTimer(exp) {
  const expires = new Date(exp);
  const timeout = expires.getTime() - Date.now() - 60 * 1000;
  refreshTokenTimeout = setTimeout(refreshToken, timeout);
}

function stopRefreshTokenTimer() {
  clearTimeout(refreshTokenTimeout);
}