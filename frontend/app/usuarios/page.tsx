"use client";

import { useEffect, useState } from "react";
import { getUsuarios, deleteUsuario } from "@/app/api/usuario";
import { Usuario } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const UsuariosPage = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleDelete = async (email: string) => {
    if (confirm(`Quieres eliminar el usaurio con el correo ${email}`)) {

      try {
        await deleteUsuario(email);
        toast.success("Usuario eliminado");
        setUsuarios((prev) => prev.filter((u) => u.correo !== email));
      } catch (error: any) {
        toast.error(error.message);
      }
    };
  }


  if (loading) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Usuarios Registrados
      </h1>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        {usuarios.map((usuario) => (
          <Card key={usuario.correo} className="shadow-md">

            <CardContent className="flex flex-col gap-2">
              <p className="text-sm text-gray-600">
                {usuario.correo}
              </p>

              <div className="flex gap-2 mt-4">
                <Button variant="outline"
                  onClick={() => router.push(`/usuarios/${usuario.correo}`)}
                >
                  Editar
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => handleDelete(usuario.correo)}
                >
                  Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default UsuariosPage;