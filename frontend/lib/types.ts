export interface Usuario {
  id: string;
  correo: string;
  password?: string;
  createdAt: string;
}

export interface Departamento {
  id: string;
  nombre: string;
  createdAt: string;
  ciudades?: Ciudad[];
}

export interface Ciudad {
  id: string;
  nombre: string;
  createdAt: string;
  departamento: Departamento;
  departamento_id: string;
}

export type Login = Omit<Usuario, 'id' | 'createdAt'>;

export type LoginResponse = { access_token: string }

export type CrearUsuario = Omit<Usuario, 'id' | 'createdAt'>;

export type CrearDepartamento = Omit<Departamento, 'id' | 'createdAt' | 'ciudades'>;

export type CrearCiudad = Omit<Ciudad, 'createdAt' | 'id' | 'departamento'>



