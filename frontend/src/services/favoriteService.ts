import API from "./api";
import { Rando } from "../data/rando";
import { AxiosResponse } from "axios";

export const favoriteService = {
  async getCurrentUserFavorites(): Promise<Rando[]> {
    const response: AxiosResponse = await API.get<Rando[]>("/favorites");
    return response.data;
  },

  async removeFavorite(randoId: number): Promise<string> {
    const response: AxiosResponse = await API.delete<string>(`/favorites/${randoId}`);
    return response.data;
  },

  async addFavorite(randoId: number): Promise<string> {
    const response: AxiosResponse = await API.post<string>(`/favorites/${randoId}`);
    return response.data;
  },
};
