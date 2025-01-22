import React, { useEffect, useState } from 'react';
import { getTop5Productos } from '../../services/api';
import type { Producto, InventarioProducto } from '../../types.d.ts';

const Inventario = () => {
const [topProductos, setTopProductos] = useState<InventarioProducto[]>([]);
const [hoveredProduct, setHoveredProduct] = useState<InventarioProducto | null>(null);

  useEffect(() => {
    const fetchTopProductos = async () => {
      try {
        const data = await getTop5Productos();
        setTopProductos(data);
      } catch (error) {
        console.error('Error fetching top productos:', error);
      }
    };

    fetchTopProductos();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Top 5 Productos con Mayor Cantidad</h1>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagen</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modelo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tamaño</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {topProductos.map((producto, index) => (
              <tr 
                key={`${producto.SKU}-${index}`}
                className="hover:bg-gray-50 cursor-pointer"
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setHoveredProduct({
                    ...producto,
                    position: {
                      x: rect.left + rect.width + 10,
                      y: rect.top + window.scrollY
                    }
                  });
                }}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <img 
                    src={producto.Photo} 
                    alt={producto.Nombre}
                    className="h-12 w-12 object-contain rounded-md"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/50';
                    }}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{producto.Nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap">{producto.Modelo}</td>
                <td className="px-6 py-4 whitespace-nowrap">{producto.Tamaño}</td>
                <td className="px-6 py-4 whitespace-nowrap">{producto.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {hoveredProduct && (
              <div 
                className="absolute z-50 p-3 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[200px]"
                style={{
                  top: `${hoveredProduct.position?.y}px`,
                  left: `${hoveredProduct.position?.x}px`
                }}
              >
                <h3 className="font-semibold mb-2">Cantidad por sede:</h3>
                <ul>
                  {Object.entries(hoveredProduct.sedes).map(([sede, cantidad], index) => (
                    <li key={`${sede}-${index}`} className="text-sm">
                      {sede}: {cantidad}
                    </li>
                  ))}
                </ul>
              </div>
            )}
      </div>
    </div>
  );
};

export default Inventario;
