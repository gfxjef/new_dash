import React from 'react';

const Productos = () => {
  const productos = [
    { 
      id: 1, 
      nombre: 'Laptop Dell XPS', 
      descripcion: 'Laptop de alta gama con procesador Intel i7',
      precio: 1299.99,
      categoria: 'Electrónicos',
      imagen: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=300&q=80'
    },
    { 
      id: 2, 
      nombre: 'iPhone 13 Pro', 
      descripcion: 'Smartphone Apple con cámara profesional',
      precio: 999.99,
      categoria: 'Móviles',
      imagen: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=300&q=80'
    },
    { 
      id: 3, 
      nombre: 'Monitor LG 27"', 
      descripcion: 'Monitor 4K HDR para profesionales',
      precio: 299.99,
      categoria: 'Periféricos',
      imagen: 'https://images.unsplash.com/photo-1586210579191-33b45e38db0c?auto=format&fit=crop&w=300&q=80'
    },
    { 
      id: 4, 
      nombre: 'Teclado Mecánico', 
      descripcion: 'Teclado gaming con switches Cherry MX',
      precio: 89.99,
      categoria: 'Periféricos',
      imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=300&q=80'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Productos</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Añadir Producto
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {productos.map((producto) => (
          <div key={producto.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img 
              src={producto.imagen} 
              alt={producto.nombre}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{producto.nombre}</h3>
              <p className="text-gray-600 text-sm mb-2">{producto.descripcion}</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-bold">${producto.precio}</span>
                <span className="text-sm text-gray-500">{producto.categoria}</span>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100">
                  Editar
                </button>
                <button className="flex-1 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;