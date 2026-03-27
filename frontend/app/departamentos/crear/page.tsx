"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CrearDepartamento } from "@/lib/types";
import toast from "react-hot-toast";
import { postDepartamento } from "@/app/api/departamento";

const DepartamentoPage = () => {
  const [form, setForm] = useState<CrearDepartamento>({
    nombre: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      await postDepartamento(form);
      toast.success("Departamento Creado")
      setForm({
        nombre: ''
      })
    } catch (error: any) {
      toast.error(error.message);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Crear Departamento
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <Input
              name="nombre"
              type="text"
              placeholder="Nomber"
              value={form.nombre}
              onChange={handleChange}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Creando..." : "Crear Departamento"}
            </Button>

          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default DepartamentoPage;