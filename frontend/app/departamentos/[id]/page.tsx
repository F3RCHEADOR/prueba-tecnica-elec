"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getDepartamento, putDepartamento } from "@/app/api/departamento";
import { Departamento } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const EditDepartamentoPage = () => {
  const { id } = useParams();
  const router = useRouter();

  if (!id) return <div>Error, No hay un departamento seleccionado</div>;

  const [form, setForm] = useState({
    nombre: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchDepartamento = async () => {
      try {
        const data: Departamento = await getDepartamento(id as string);

        setForm({
          nombre: data.nombre,
        });

      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDepartamento();
  }, [id]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaving(true);

    try {
      await putDepartamento(id as string, form);

      toast.success("Departamento actualizado");

      setTimeout(() => {
        router.push("/departamentos");
      }, 2000);

    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Cargando departamento...</p>;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">
            Editar Departamento
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <Input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre del departamento"
              required
            />

            <Button type="submit" disabled={saving}>
              {saving ? "Guardando..." : "Guardar cambios"}
            </Button>

          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default EditDepartamentoPage;