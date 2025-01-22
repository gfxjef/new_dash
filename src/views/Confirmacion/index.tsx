import React from 'react';

const Confirmacion = () => {
  const confirmaciones = [
    { id: 1, pedido: 'PED-001', cliente: 'Juan Pérez', total: 2599.98, fecha: '2024-03-15', estado: 'Pendiente' },
    { id: 2, pedido: 'PED-002', cliente: 'María García', total: 999.99, fecha: '2024-03-14', estado: 'Confirmado' },
    { id: 3, pedido: 'PED-003', cliente: 'Carlos López', total: 899.97, fecha: '2024-03-13', estado: 'Rechazado' },
    { id: 4, pedido: 'PED-004', cliente: 'Ana Martínez', total: 89.99, fecha: '2024-03-12', estado: 'Confirmado' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Confirmación de Pedidos</h1>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pedido</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {confirmaciones.map((confirmacion) => (
              <tr key={confirmacion.id}>
                <td className="px-6 py-4 whitespace-nowrap">{confirmacion.pedido}</td>
                <td className="px-6 py-4 whitespace-nowrap">{confirmacion.cliente}</td>
                <td className="px-6 py-4 whitespace-nowrap">${confirmacion.total}</td>
                <td className="px-6 py-4 whitespace-nowrap">{confirmacion.fecha}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${confirmacion.estado === 'Confirmado' ? 'bg-green-100 text-green-800' :
                      confirmacion.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}`}>
                    {confirmacion.estado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Confirmar</button>
                  <button className="text-red-600 hover:text-red-900">Rechazar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Confirmacion;