import api from "@/lib/axios";
import { Login, LoginResponse } from "@/lib/types";


export const login = async (credenciales: Login): Promise<LoginResponse> => {
  try {
    const { data } = await api.post(`/auth/login`, credenciales);
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al iniciar sesión"
    );
  }
}

