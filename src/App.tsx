import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate
} from 'react-router-dom';
import { 
  BarChart3, Users, Activity, ArrowUpRight, ArrowDownRight, Filter, 
  ArrowUpDown, MoreHorizontal, Search, MessageSquare, CreditCard, 
  Settings, Shield, HelpCircle, LayoutDashboard, Gift, Bell, Timer,
  Menu, X, Package, Boxes, ClipboardList, CheckSquare, ShoppingBag
} from 'lucide-react';

// Importar vistas
import Dashboard from './views/Dashboard/index';
import Inventario from './views/Inventario/index';
import Stock from './views/Stock/index';
import Solicitudes from './views/Solicitudes/index';
import Confirmacion from './views/Confirmacion/index';
import Productos from './views/Productos/index';
import Login from './views/Login/index';

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  count?: number;
}

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = localStorage.getItem('user');
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const generalMenu: MenuItem[] = [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Inventario', icon: <Package className="w-5 h-5" /> },
    { label: 'Stock', icon: <Boxes className="w-5 h-5" /> },
    { label: 'Solicitudes', icon: <ClipboardList className="w-5 h-5" /> },
    { label: 'Confirmación', icon: <CheckSquare className="w-5 h-5" /> },
    { label: 'Productos', icon: <ShoppingBag className="w-5 h-5" /> },
  ];

  const toolsMenu: MenuItem[] = [
    { label: 'Product', icon: <BarChart3 className="w-5 h-5" /> },
    { label: 'Invoice', icon: <Activity className="w-5 h-5" /> },
    { label: 'Analytics', icon: <Timer className="w-5 h-5" /> },
    { label: 'Automation', icon: <Settings className="w-5 h-5" /> },
  ];

  const supportMenu: MenuItem[] = [
    { label: 'Settings', icon: <Settings className="w-5 h-5" /> },
    { label: 'Security', icon: <Shield className="w-5 h-5" /> },
    { label: 'Help', icon: <HelpCircle className="w-5 h-5" /> },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavigation = (path: string) => {
    // Normalizar ruta: convertir a minúscula y eliminar acentos
    const normalizedPath = path
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    navigate(normalizedPath);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={
          <ProtectedRoute>
            <MainLayout 
              isSidebarOpen={isSidebarOpen} 
              toggleSidebar={toggleSidebar}
              handleNavigation={handleNavigation}
            />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inventario" element={<Inventario />} />
          <Route path="stock" element={<Stock />} />
          <Route path="solicitudes" element={<Solicitudes />} />
          <Route path="confirmacion" element={<Confirmacion />} />
          <Route path="productos" element={<Productos />} />
          <Route path="logout" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </div>
  );
}

function MainLayout({
  isSidebarOpen,
  toggleSidebar,
  handleNavigation
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  handleNavigation: (path: string) => void;
}) {
  const generalMenu: MenuItem[] = [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Inventario', icon: <Package className="w-5 h-5" /> },
    { label: 'Stock', icon: <Boxes className="w-5 h-5" /> },
    { label: 'Solicitudes', icon: <ClipboardList className="w-5 h-5" /> },
    { label: 'Confirmación', icon: <CheckSquare className="w-5 h-5" /> },
    { label: 'Productos', icon: <ShoppingBag className="w-5 h-5" /> },
  ];

  const toolsMenu: MenuItem[] = [
    { label: 'Product', icon: <BarChart3 className="w-5 h-5" /> },
    { label: 'Invoice', icon: <Activity className="w-5 h-5" /> },
    { label: 'Analytics', icon: <Timer className="w-5 h-5" /> },
    { label: 'Automation', icon: <Settings className="w-5 h-5" /> },
  ];

  const supportMenu: MenuItem[] = [
    { label: 'Settings', icon: <Settings className="w-5 h-5" /> },
    { label: 'Security', icon: <Shield className="w-5 h-5" /> },
    { label: 'Help', icon: <HelpCircle className="w-5 h-5" /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-white border-r border-gray-200
        transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <span className="text-xl font-semibold">Nexus</span>
            </div>
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={toggleSidebar}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-8">
            <div>
              <h3 className="text-xs font-semibold text-gray-400 mb-4">MENÚ PRINCIPAL</h3>
              <ul className="space-y-2">
                {generalMenu.map((item: MenuItem, index: number) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigation(item.label.toLowerCase())}
                      className={`w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100`}
                    >
                      <div className="flex items-center gap-3 text-gray-700">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      {item.count && (
                        <span className="bg-gray-100 px-2 rounded-full text-xs">{item.count}</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-400 mb-4">TOOLS</h3>
              <ul className="space-y-2">
                {toolsMenu.map((item: MenuItem, index: number) => (
                  <li key={index}>
                    <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700">
                      {item.icon}
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-400 mb-4">SUPPORT</h3>
              <ul className="space-y-2">
                {supportMenu.map((item: MenuItem, index: number) => (
                  <li key={index}>
                    <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700">
                      {item.icon}
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </aside>

      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Hamburger Menu for mobile */}
            <button 
              className="lg:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg"
              onClick={toggleSidebar}
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl ml-4 lg:ml-0">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-400 hidden sm:block">
                  ⌘ + F
                </div>
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center gap-4 ml-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg hidden sm:block">
                <Gift className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Hola</span>
                <span className="font-medium">
                  {JSON.parse(localStorage.getItem('user') || '{}').Nombres || 'Usuario'}
                </span>
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 lg:p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/solicitudes" element={<Solicitudes />} />
            <Route path="/confirmacion" element={<Confirmacion />} />
            <Route path="/productos" element={<Productos />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
