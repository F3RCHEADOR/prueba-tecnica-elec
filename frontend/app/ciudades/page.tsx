"use client";

import { useEffect, useState } from "react";
import { Ciudad } from "@/lib/types";
import { getCiudades, deleteCiudad } from "../api/ciudad";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CiudadPage = () => {
  const [ciudades, setCiudades] = useState<Ciudad[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCiudades = async () => {
      try {
        const data = await getCiudades();
        console.log(data)
        setCiudades(data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCiudades();
  }, []);

  const handleDelete = async (ciudad: Ciudad) => {
    if (confirm(`Eliminar ciudad ${ciudad.nombre}?`)) {
      try {
        await deleteCiudad(ciudad.id);

        toast.success("Ciudad eliminada");

        setCiudades((prev) =>
          prev.filter((c) => c.id !== ciudad.id)
        );
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Cargando ciudades...</p>;
  }

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Ciudades
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ciudades.map((ciudad) => (
          <Card key={ciudad.id} className="shadow-lg rounded-2xl">

            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {ciudad.nombre}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-2">

              <p className="text-sm text-gray-600">
                Departamento :
                <span className="font-medium">
                  {ciudad.departamento?.nombre}
                </span>
              </p>


              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => router.push(`/ciudades/${ciudad.id}`)}
                >
                  Editar
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => handleDelete(ciudad)}
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

export default CiudadPage;