"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCiudad, putCiudad } from "@/app/api/ciudad";
import { getDepartamentos } from "@/app/api/departamento";
import { CrearCiudad, Departamento } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const EditCiudadPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<CrearCiudad>({
    nombre: "",
    departamento_id: "",
  });

  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => { //cuando se monte la pagina, vamos a obtener la ciudad, y traer los departamentos...
    const fetchData = async () => {
      setLoading(true);
      try {
        const [ciudad, deps] = await Promise.all([
          getCiudad(id as string),
          getDepartamentos(),
        ]);

        setForm({
          nombre: ciudad.nombre,
          departamento_id: ciudad.departamento_id,
        });

        setDepartamentos(deps);


      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await putCiudad(id as string, form);
      toast.success("Ciudad actualizada");
      setTimeout(() => {
        router.push("/ciudades");
      }, 2000);

    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Cargando ciudad...</p>;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">
            Editar Ciudad
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">


            <Input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre de la ciudad"
              required
            />


            <select
              name="departamento_id"
              value={form.departamento_id}
              onChange={handleChange}
              className="border rounded-md px-3 py-2"
            >
              <option value="">Selecciona un departamento</option>
              {departamentos.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.nombre}
                </option>
              ))}
            </select>

            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar cambios"}
            </Button>

          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default EditCiudadPage;