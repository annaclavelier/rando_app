import API from "./api";
import { AxiosResponse } from "axios";
import { User } from "../data/user";

export const userService = {
  async create(user: User): Promise<User> {
    const response: AxiosResponse = await API.post<User>("/users", user);
    return response.data;
  },

  async login(email: string, mot_passe: string) {
    const response: AxiosResponse = await API.post<string>("/login", {
      email: email,
      mot_passe: mot_passe,
    });
    return response.data;
  },

  async logout() {
    const response: AxiosResponse = await API.post<string>("/logout");
    return response.data;
  },

  async updateUser(user: User): Promise<User> {
    const response: AxiosResponse = await API.put<User>(`/current-user`, user);
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response: AxiosResponse = await API.get<User>(`/current-user`);
    return response.data;
  },
  async getAlltUsers(): Promise<User[]> {
    const response: AxiosResponse = await API.get<User[]>(`/users`);
    return response.data;
  },
};
