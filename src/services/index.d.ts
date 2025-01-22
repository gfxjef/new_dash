declare module '*/api' {
  import { Producto } from '../types';
  export function getTop5Productos(): Promise<Producto[]>;
}

declare global {
  interface Producto {
    id: number;
    Nombre: string;
    Modelo: string;
    Tamaño: string;
    SKU: string;
    Photo: string;
    cantidad: number;
    sedes: Record<string, number>;
  }
}
