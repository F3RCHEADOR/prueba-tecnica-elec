"use client";

import { useEffect, useState } from "react";
import { Departamento } from "@/lib/types";
import { deleteDepartamento, getDepartamentos } from "../api/departamento";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { deleteCiudad } from "../api/ciudad";

const DepartamentoPage = () => {
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchDepartamentos = async () => {
    try {
      const data = await getDepartamentos();
      setDepartamentos(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchDepartamentos();
  }, []);


  const handleDelete = async (depa: Departamento) => {
    if (confirm(`Se eliminaran las ciudades anidadas a  ${depa.nombre}`)) {

      try {
        await deleteDepartamento(depa.id);
        toast.success("Departamento eliminado");
        setDepartamentos((prev) => prev.filter((dep) => dep.id !== depa.id));
      } catch (error: any) {
        toast.error(error.message);
      }
    };
  }



  const handleDeleteCiudad = async (id: string) => {
    if (confirm(`Se eliminara la ciudad`)) {

      try {
        await deleteCiudad(id);
        toast.success("Ciudad eliminada");
        fetchDepartamentos();
      } catch (error: any) {
        toast.error(error.message);
      }
    };
  }


  if (loading) {
    return <p className="text-center mt-10">Cargando...</p>;
  }

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Departamentos y Ciudades
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {departamentos.map((dep) => (
          <Card key={dep.id} className="shadow-lg rounded-2xl">

            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {dep.nombre}
              </CardTitle>
            </CardHeader>

            <CardContent>
              {dep.ciudades && dep.ciudades.length > 0 ? (
                <ul className="space-y-2">
                  {dep.ciudades.map((ciudad) => (
                    <li
                      key={ciudad.id}
                      className="flex items-center justify-between px-3 py-2 bg-gray-100 rounded-md text-sm"
                    >
                      <span>{ciudad.nombre}</span>
                      <div className="flex gap-2 mt-4">
                        <Button
                          variant="outline"
                          onClick={() => router.push(`/ciudades/${ciudad.id}`)}
                        >
                          Editar
                        </Button>

                        <Button
                          variant="destructive"
                          onClick={() => handleDeleteCiudad(ciudad.id)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">
                  El departamento no tiene ciudades
                </p>
              )}

              <div className="flex items-center justify-between gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => router.push(`/departamentos/${dep.id}`)}
                >
                  Editar
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => handleDelete(dep)}
                >
                  Eliminar
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => router.push(`/ciudades/crear`)}
                >
                  Crear Ciudad
                </Button>


              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default DepartamentoPage;