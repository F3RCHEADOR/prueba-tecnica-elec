import api from "@/lib/axios";
import { Ciudad, CrearCiudad } from "@/lib/types";


export const postCiudad = async (ciudad: CrearCiudad): Promise<Ciudad> => {
  try {
    const { data } = await api.post(`/ciudades`, ciudad);
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al crear Ciudad"
    );
  }
}

export const getCiudades = async (): Promise<Ciudad[]> => {
  try {
    const { data } = await api.get(`/ciudades`);
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al obtener ciudades"
    );
  }
}

export const getCiudad = async (id: string): Promise<Ciudad> => {
  try {
    const { data } = await api.get(`/ciudades/${id}`,);
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al obtener la Ciudad"
    );
  }
}

export const putCiudad = async (id: string, ciudad: CrearCiudad): Promise<Ciudad> => {
  try {
    const { data } = await api.patch(`/ciudades/${id}`, ciudad);
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al actualizar Ciudad"
    );
  }
}

export const deleteCiudad = async (id: string): Promise<Ciudad> => {
  try {
    const { data } = await api.delete(`/ciudades/${id}`,);
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al eliminar la Ciudad"
    );
  }
}

