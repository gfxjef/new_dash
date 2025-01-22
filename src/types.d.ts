export interface Producto {
  SKU: string;
  Photo: string;
  id: number;
  Nombre: string;
  Modelo: string;
  Tamaño: string;
  cantidad: number;
  sedes: Record<string, number>;
}

export interface InventarioProducto extends Producto {
  position?: {
    x: number;
    y: number;
  };
}

export {};
