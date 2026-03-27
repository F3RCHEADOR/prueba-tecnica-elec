import api from "@/lib/axios";
import { CrearUsuario, Usuario } from "@/lib/types";


export const postUsuario = async (usuario: CrearUsuario): Promise<Usuario> => {
  try {
    const { data } = await api.post(`/usuarios`, usuario);
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al crear usuario"
    );
  }
}

export const getUsuarios = async (): Promise<Usuario[]> => {
  try {
    const { data } = await api.get(`/usuarios`);
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al obtener usuarios"
    );
  }
}

export const getUsuario = async (email: string): Promise<Usuario> => {
  try {
    const { data } = await api.get(`/usuarios/${email}`,);
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al obtener el usuario"
    );
  }
}

export const putUsuario = async (email: string, usuario: CrearUsuario): Promise<Usuario> => {
  try {
    const { data } = await api.patch(`/usuarios/${email}`, usuario);
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al actualizar usuario"
    );
  }
}

export const deleteUsuario = async (email: string) => {
  try {
    const { data } = await api.delete(`/usuarios/${email}`,);
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al eliminar el usuario"
    );
  }
}

