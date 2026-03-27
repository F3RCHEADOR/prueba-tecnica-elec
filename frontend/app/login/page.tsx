"use client"

import { Login } from "@/lib/types"
import { useState } from "react"
import { login } from "../api/auth"
import toast from "react-hot-toast"
import { redirect } from "next/navigation"


const LoginPage = () => {
  const [credenciales, setCredenciales] = useState<Login>({
    correo: '',
    password: '',
  })
  const [loading, setLoading] = useState(false);

  const handleCredenciales = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(credenciales);
      toast.success("Usuario Logueado")
      localStorage.setItem("access_token", data.access_token);
      setCredenciales({
        correo: '',
        password: '',
      })
      setTimeout(() => {
        redirect("/departamentos");
      }, 3000);

    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }

  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Iniciar Sesion</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
            <input
              type="email"
              name="correo"
              value={credenciales.correo}
              onChange={handleCredenciales}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="usuario@correo.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={credenciales.password}
              onChange={handleCredenciales}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Validando' : 'Enviar'}
          </button>
        </form>
      </div>
    </main>
  )
}

export default LoginPage