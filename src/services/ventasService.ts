interface SedeStat {
  Sede: string;
  totalValue: number;
}

interface BrandStat {
  Marca: string;
  totalValue: number;
}

const API_BASE_URL = 'http://localhost:3002/api/sales';

const ventasService = {
  async getTotalSalesValue(startDate: Date, endDate: Date): Promise<number> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/total-value?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      );
      if (!response.ok) throw new Error('Error fetching total sales value');
      const data = await response.json();
      return Number(data?.total) || 0;
    } catch (error) {
      console.error('Error in getTotalSalesValue:', error);
      return 0;
    }
  },

  async getTotalUnitsSold(startDate: Date, endDate: Date): Promise<number> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/total-units?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      );
      if (!response.ok) throw new Error('Error fetching total units sold');
      const data = await response.json();
      return Number(data?.total) || 0;
    } catch (error) {
      console.error('Error in getTotalUnitsSold:', error);
      return 0;
    }
  },

  async getUniqueProductsSold(startDate: Date, endDate: Date): Promise<number> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/unique-products?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      );
      if (!response.ok) throw new Error('Error fetching unique products');
      const data = await response.json();
      return Number(data?.total) || 0;
    } catch (error) {
      console.error('Error in getUniqueProductsSold:', error);
      return 0;
    }
  },

  async getSedeStats(startDate: Date, endDate: Date): Promise<SedeStat[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/by-location?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      );
      if (!response.ok) throw new Error('Error fetching sede stats');
      return await response.json();
    } catch (error) {
      console.error('Error in getSedeStats:', error);
      return [];
    }
  },

  async getSalesByBrand(startDate: Date, endDate: Date): Promise<BrandStat[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/by-brand?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      );
      if (!response.ok) throw new Error('Error fetching brand stats');
      return await response.json();
    } catch (error) {
      console.error('Error in getSalesByBrand:', error);
      return [];
    }
  }
};

export default ventasService;
