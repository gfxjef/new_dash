import React, { useEffect, useState } from 'react';
import { Activity, Box, ShoppingCart, Calendar } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import DateFilter from '../../components/DateFilter';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import ventasService from '../../services/ventasService';

const Dashboard = () => {
  const [totalValue, setTotalValue] = useState(0);
  const [totalUnits, setTotalUnits] = useState(0);
  const [uniqueProducts, setUniqueProducts] = useState(0);
  const [sedeStats, setSedeStats] = useState<{Sede: string, totalValue: number}[]>([]);
  const [brandStats, setBrandStats] = useState<{Marca: string, totalValue: number}[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleDateRangeChange = (startDate: Date, endDate: Date) => {
    setDateRange([{
      startDate,
      endDate,
      key: 'selection'
    }]);
  };

  const handleCalendarChange = (ranges: any) => {
    setDateRange([ranges.selection]);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [value, units, products, sedeData, brandData] = await Promise.all([
          ventasService.getTotalSalesValue(dateRange[0].startDate, dateRange[0].endDate),
          ventasService.getTotalUnitsSold(dateRange[0].startDate, dateRange[0].endDate),
          ventasService.getUniqueProductsSold(dateRange[0].startDate, dateRange[0].endDate),
          ventasService.getSedeStats(dateRange[0].startDate, dateRange[0].endDate),
          ventasService.getSalesByBrand(dateRange[0].startDate, dateRange[0].endDate)
        ]);
        
        setTotalValue(value);
        setTotalUnits(units);
        setUniqueProducts(products);
        setSedeStats(sedeData);
        setBrandStats(brandData);
      } catch (err) {
        setError('Error al cargar los datos de ventas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateRange]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const formatCurrency = (value: number | null | undefined) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(value || 0);
  };

  const stats = [
    {
      title: 'Valor Total de Ventas',
      value: totalValue !== null && totalValue !== undefined ? formatCurrency(totalValue) : 'S/ 0',
      icon: <Activity className="h-6 w-6" />,
      description: 'Suma total de todas las ventas'
    },
    {
      title: 'Unidades Vendidas',
      value: totalUnits !== null && totalUnits !== undefined ? totalUnits.toLocaleString() : '0',
      icon: <Box className="h-6 w-6" />,
      description: 'Cantidad total de productos vendidos'
    },
    {
      title: 'Productos Únicos',
      value: uniqueProducts !== null && uniqueProducts !== undefined ? uniqueProducts.toLocaleString() : '0',
      icon: <ShoppingCart className="h-6 w-6" />,
      description: 'Cantidad de SKUs diferentes vendidos'
    }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard de Ventas</h1>
        <div className="flex gap-4">
          <DateFilter onDateRangeChange={handleDateRangeChange} />
          
          <div className="relative">
            <button 
              onClick={toggleDatePicker}
              className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
            >
              <Calendar className="h-5 w-5" />
              <span>Seleccionar Rango de Fechas</span>
            </button>
            
            {showDatePicker && (
              <div className="absolute right-0 mt-2 z-10">
                <DateRange
                  editableDateInputs={true}
                  onChange={handleCalendarChange}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  maxDate={new Date()}
                  className="border rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:bg-gray-50 transition-colors border-b-4 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-full">
                {stat.icon}
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">{stat.description}</p>
          </div>
        ))}
        <div className="bg-white rounded-xl shadow-sm p-6 col-span-2">
          <h2 className="text-lg font-semibold mb-4">Ventas por Sede</h2>
          <Bar 
            data={{
              labels: sedeStats.map(s => s.Sede),
              datasets: [{
                label: 'Valor de Ventas',
                data: sedeStats.map(s => s.totalValue),
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: 'rgb(59, 130, 246)',
                borderWidth: 1
              }]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Distribución de Ventas por Sede'
                }
              }
            }}
          />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 col-span-2">
          <h2 className="text-lg font-semibold mb-4">Ventas por Marca</h2>
          <Bar 
            data={{
              labels: brandStats.map(b => b.Marca),
              datasets: [{
                label: 'Valor de Ventas',
                data: brandStats.map(b => b.totalValue),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 1
              }]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Distribución de Ventas por Marca'
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
