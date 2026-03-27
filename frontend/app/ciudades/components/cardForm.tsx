import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CrearCiudad, Departamento } from "@/lib/types";

interface CiudadFormProps {
  title: string;
  form: CrearCiudad;
  departamentos: Departamento[];
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const CiudadForm = ({ title, form, departamentos, loading, onChange, onSubmit }: CiudadFormProps) => {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Input
            name="nombre"
            value={form.nombre}
            onChange={onChange}
            placeholder="Nombre de la ciudad"
            required
          />

          <select
            name="departamento_id"
            value={form.departamento_id}
            onChange={onChange}
            className="border rounded-md px-3 py-2"
            required
          >
            <option value="">Selecciona un departamento</option>
            {departamentos.map((dep) => (
              <option key={dep.id} value={dep.id}>
                {dep.nombre}
              </option>
            ))}
          </select>

          <Button type="submit" disabled={loading}>
            {loading ? "Guardando..." : title}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CiudadForm;