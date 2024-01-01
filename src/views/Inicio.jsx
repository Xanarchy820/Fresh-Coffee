import useSWR from "swr";
import useQuiosco from "../hooks/useQuiosco";
import Producto from "../components/Producto";
import clienteAxios from "../config/axios";

function Inicio() {
  const { categoriaActual } = useQuiosco();
  const token = localStorage.getItem("AUTH_TOKEN");
  // Consulta SWR
  const fetcher = () => clienteAxios('/api/productos', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(data => data.data)
  const {data, error, isLoading} = useSWR('/api/productos', fetcher, {
    refreshInterval: 1000
  })
 
  if(isLoading) return "Cargando...";

  const productos = data.data.filter(
    (producto) => producto.categoria_id === categoriaActual.id
  );

  return (
    <>
      <h1 className="text-4xl font-black">{categoriaActual.nombre}</h1>
      <p className="text-2xl my-10">
        Elige y personaliza tu pedido a continuación.
      </p>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {productos.map((producto) => (
          <Producto key={producto.id} producto={producto} botonAgregar={true}/>
        ))}
      </div>
    </>
  );
}

export default Inicio;
