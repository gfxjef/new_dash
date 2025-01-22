import axios from 'axios';
import type { InventarioProducto } from '../types.d';

const api = axios.create({
  baseURL: 'http://localhost:3002/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getTotalSalesValue = async (startDate: string, endDate: string) => {
  const response = await api.get('/sales/total-value', {
    params: { startDate, endDate }
  });
  return response.data;
};

export const getTotalUnitsSold = async (startDate: string, endDate: string) => {
  const response = await api.get('/sales/total-units', {
    params: { startDate, endDate }
  });
  return response.data;
};

export const getUniqueProductsSold = async (startDate: string, endDate: string) => {
  const response = await api.get('/sales/unique-products', {
    params: { startDate, endDate }
  });
  return response.data;
};

export const getSalesByLocation = async (startDate: string, endDate: string) => {
  const response = await api.get('/sales/by-location', {
    params: { startDate, endDate }
  });
  return response.data;
};

export const getSalesByBrand = async (startDate: string, endDate: string) => {
  const response = await api.get('/sales/by-brand', {
    params: { startDate, endDate }
  });
  return response.data;
};

export const login = async (usuario: string, password: string) => {
  try {
    const response = await api.post('/login', { usuario, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Error de autenticación');
    }
    throw new Error('Error desconocido');
  }
};

interface Producto {
  id: number;
  Nombre: string;
  Modelo: string;
  Tamaño: string;
  cantidad: number;
  sedes: Record<string, number>;
}

export const getTop5Productos = async (): Promise<InventarioProducto[]> => {
  try {
    const response = await api.get('/inventario/top5');
    return response.data.map((p: any) => ({
      ...p,
      Photo: p.Photo
    }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Error obteniendo productos');
    }
    throw new Error('Error desconocido');
  }
};

export default {
  getTotalSalesValue,
  getTotalUnitsSold,
  getUniqueProductsSold,
  getSalesByLocation,
  getSalesByBrand,
  login,
  getTop5Productos
};
