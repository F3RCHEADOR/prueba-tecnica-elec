'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
    router.push('/login');
  };


  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex gap-6">
        <div className="flex flex-col gap-1">
          <Link href="/departamentos" className="text-gray-700 hover:text-blue-600 font-medium">
            Departamentos
          </Link>
          {isAuthenticated && (
            <Link href="/departamentos/crear" className="text-sm text-gray-500 hover:text-blue-500">
              + Crear departamento
            </Link>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Link href="/ciudades" className="text-gray-700 hover:text-blue-600 font-medium">
            Ciudades
          </Link>
          {isAuthenticated && (
            <Link href="/ciudades/crear" className="text-sm text-gray-500 hover:text-blue-500">
              + Crear ciudad
            </Link>)}
        </div>

        <div className="flex flex-col gap-1">
          <Link href="/usuarios" className="text-gray-700 hover:text-blue-600 font-medium">
            Usuarios
          </Link>
          <Link href="/usuarios/crear" className="text-sm text-gray-500 hover:text-blue-500">
            + Crear usuario
          </Link>
        </div>
      </div>
      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Cerrar sesión
        </button>
      ) : (
        <button
          onClick={() => router.push('/login')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Iniciar Sesión
        </button>
      )}
    </nav>
  );
};

export default Navbar;