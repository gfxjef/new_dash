import React from 'react';

const Solicitudes = () => {
  const solicitudes = [
    { id: 1, cliente: 'Juan Pérez', producto: 'Laptop Dell XPS', cantidad: 2, fecha: '2024-03-15', estado: 'Pendiente' },
    { id: 2, cliente: 'María García', producto: 'iPhone 13 Pro', cantidad: 1, fecha: '2024-03-14', estado: 'En proceso' },
    { id: 3, cliente: 'Carlos López', producto: 'Monitor LG 27"', cantidad: 3, fecha: '2024-03-13', estado: 'Completada' },
    { id: 4, cliente: 'Ana Martínez', producto: 'Teclado Mecánico', cantidad: 1, fecha: '2024-03-12', estado: 'Pendiente' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Solicitudes</h1>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {solicitudes.map((solicitud) => (
              <tr key={solicitud.id}>
                <td className="px-6 py-4 whitespace-nowrap">{solicitud.cliente}</td>
                <td className="px-6 py-4 whitespace-nowrap">{solicitud.producto}</td>
                <td className="px-6 py-4 whitespace-nowrap">{solicitud.cantidad}</td>
                <td className="px-6 py-4 whitespace-nowrap">{solicitud.fecha}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${solicitud.estado === 'Completada' ? 'bg-green-100 text-green-800' :
                      solicitud.estado === 'En proceso' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'}`}>
                    {solicitud.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Solicitudes;