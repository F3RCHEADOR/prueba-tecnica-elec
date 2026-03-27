"use client";

import { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import { getUsuario, putUsuario } from "@/app/api/usuario";
import { CrearUsuario, Usuario } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const EditUserPage = () => {
  const { id } = useParams();

  if (!id) return <div>Error, No hay un correo seleccionado</div>

  const [form, setForm] = useState<CrearUsuario>({
    correo: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data: Usuario = await getUsuario(id as string);

        setForm({
          correo: data.correo,
          password: "",
        });

      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const dtoFixed = { correo: form.correo, ...(form.password && { password: form.password }) } //  el dto se dispara si envio una cadena vacia...
      await putUsuario(id as string, dtoFixed);
      toast.success("Usuario actualizado");

      setTimeout(() => {
        redirect('/usuarios');
      }, 3000);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Cargando usuario...</p>;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">
            Editar Usuario
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              name="correo"
              value={form.correo}
              onChange={handleChange}
              placeholder="Correo"
            />

            <Input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Nueva contraseña (opcional)"
            />

            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar cambios"}
            </Button>

          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default EditUserPage;