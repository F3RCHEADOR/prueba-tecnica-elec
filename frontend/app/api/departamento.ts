import api from "@/lib/axios";
import { CrearDepartamento, Departamento } from "@/lib/types";


export const postDepartamento = async (departamento: CrearDepartamento): Promise<Departamento> => {
  try {
    const { data } = await api.post(`/departamentos`, departamento);
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al crear Departamento"
    );
  }
}

export const getDepartamentos = async (): Promise<Departamento[]> => {
  try {
    const { data } = await api.get(`/departamentos`);
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al obtener departamentos"
    );
  }
}

export const getDepartamento = async (id: string): Promise<Departamento> => {
  try {
    const { data } = await api.get(`/departamentos/${id}`,);
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al obtener el Departamento"
    );
  }
}

export const putDepartamento = async (id: string, departamento: CrearDepartamento): Promise<Departamento> => {
  try {
    const { data } = await api.patch(`/departamentos/${id}`, departamento);
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al actualizar Departamento"
    );
  }
}

export const deleteDepartamento = async (id: string): Promise<Departamento> => {
  try {
    const { data } = await api.delete(`/departamentos/${id}`,);
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al eliminar el Departamento"
    );
  }
}

