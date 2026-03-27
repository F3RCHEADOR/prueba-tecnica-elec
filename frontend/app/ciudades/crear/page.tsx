"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { postCiudad } from "@/app/api/ciudad";
import { getDepartamentos } from "@/app/api/departamento";
import { CrearCiudad, Departamento } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import CiudadForm from "../components/cardForm";

const CreateCiudadPage = () => {
  const router = useRouter();

  const [form, setForm] = useState<CrearCiudad>({
    nombre: "",
    departamento_id: "",
  });

  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        setLoading(true)
        const data = await getDepartamentos();
        setDepartamentos(data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartamentos();
  }, []);


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
      await postCiudad(form);

      toast.success("Ciudad creada");

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
    return <p className="text-center mt-10">Cargando...</p>;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <CiudadForm
        title="Crear Ciudad"
        form={form}
        departamentos={departamentos}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </main>
  );
};

export default CreateCiudadPage;