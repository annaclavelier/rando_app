import API from "./api";
import { Rando } from "../data/rando";
import { AxiosResponse } from "axios";

export const randoService = {
  async getById(id: number): Promise<Rando> {
    const response: AxiosResponse = await API.get<Rando>(`/randos/${id}`);
    return response.data;
  },

  async getAll(): Promise<Rando[]> {
    const response: AxiosResponse = await API.get<Rando[]>("/randos");
    return response.data;
  },

  async create(rando: Partial<Rando>): Promise<Rando> {
    const response: AxiosResponse = await API.post<Rando>("/randos", rando);
    return response.data;
  },

  async update(rando: Partial<Rando>, id: number): Promise<Rando> {
    const response: AxiosResponse = await API.put<Rando>(
      `/randos/${id}`,
      rando
    );
    return response.data;
  },

  async delete(id: number): Promise<Rando> {
    const response: AxiosResponse = await API.delete<Rando>(`/randos/${id}`);
    return response.data;
  },

  async search(
    query: string,
    difficulty: string,
    duration: string,
    massif: string,
    denivele: string
  ): Promise<Rando[]> {
    const response: AxiosResponse = await API.get<Rando[]>(
      `/randos/search?query=${query}&difficulte=${difficulty}&duration=${duration}&massif=${massif}&denivele=${denivele}`
    );
    return response.data;
  },

  async searchMin(query: string): Promise<Rando[]> {
    const response: AxiosResponse = await API.get<Rando[]>(
      `/randos/search-min?query=${query}`
    );
    return response.data;
  },

  async getCurrentUserRandos(): Promise<Rando[]> {
    const response: AxiosResponse = await API.get<Rando[]>(
      "/randos/current-user"
    );
    return response.data;
  },
};
