import { useState } from 'react';

interface DateFilterProps {
  onDateRangeChange: (startDate: Date, endDate: Date) => void;
}

const DateFilter = ({ onDateRangeChange }: DateFilterProps) => {
  const [selectedRange, setSelectedRange] = useState('today');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedRange(value);
    
    const now = new Date();
    let startDate = new Date();
    let endDate = new Date();

    switch (value) {
      case 'today':
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        break;
      case 'yesterday':
        startDate.setDate(startDate.getDate() - 1);
        startDate.setHours(0, 0, 0, 0);
        endDate.setDate(endDate.getDate() - 1);
        endDate.setHours(23, 59, 59, 999);
        break;
      case 'last7':
        startDate.setDate(startDate.getDate() - 7);
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'last30':
        startDate.setDate(startDate.getDate() - 30);
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'thisMonth':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        endDate.setHours(23, 59, 59, 999);
        break;
      case 'lastMonth':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0);
        endDate.setHours(23, 59, 59, 999);
        break;
      default:
        break;
    }

    onDateRangeChange(startDate, endDate);
  };

  return (
    <div className="flex items-center space-x-2">
      <select
        value={selectedRange}
        onChange={handleChange}
        className="px-4 py-2 border rounded-lg bg-white shadow-sm"
      >
        <option value="today">Hoy</option>
        <option value="yesterday">Ayer</option>
        <option value="last7">Últimos 7 días</option>
        <option value="last30">Últimos 30 días</option>
        <option value="thisMonth">Este mes</option>
        <option value="lastMonth">Mes anterior</option>
      </select>
    </div>
  );
};

export default DateFilter;
