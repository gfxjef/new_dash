import React from 'react';

const Stock = () => {
  const stockData = [
    { id: 1, almacen: 'Principal', ubicacion: 'A-123', producto: 'Laptop Dell XPS', disponible: 45, reservado: 5 },
    { id: 2, almacen: 'Secundario', ubicacion: 'B-456', producto: 'iPhone 13 Pro', disponible: 30, reservado: 10 },
    { id: 3, almacen: 'Principal', ubicacion: 'C-789', producto: 'Monitor LG 27"', disponible: 60, reservado: 0 },
    { id: 4, almacen: 'Secundario', ubicacion: 'D-012', producto: 'Teclado Mecánico', disponible: 15, reservado: 3 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Control de Stock</h1>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Almacén</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ubicación</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disponible</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reservado</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {stockData.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.almacen}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.ubicacion}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.producto}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.disponible}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.reservado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stock;