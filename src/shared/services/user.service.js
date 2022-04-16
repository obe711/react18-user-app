import { authService } from "./auth.service";
import { createAuthCaller } from "./http.service";
import queryString from "query-string";

export function updatePassword(password) {
  const accessToken = authService.userValue.token;
  const http = createAuthCaller(accessToken);
  return http.patch(`/users/${authService.userValue.id}`, { password });
}

export function getAllUsers(params) {
  const accessToken = authService.userValue.token;
  const http = createAuthCaller(accessToken);
  const query = queryString.stringify(params);
  return http.get(`/users?${query}`)
}

export function getUser(id) {
  const accessToken = authService.userValue.token;
  const http = createAuthCaller(accessToken);
  return http.get(`/users/${id}`);
}

export function updateUser(id, user) {
  const accessToken = authService.userValue.token;
  const http = createAuthCaller(accessToken);
  return http.patch(`/users/${id}`, user);
}

export function deleteUser(id) {
  const accessToken = authService.userValue.token;
  const http = createAuthCaller(accessToken);
  return http.delete(`/users/${id}`);
}

const userService = {
  updatePassword,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
}

export default userService;