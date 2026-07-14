import React, { useState } from 'react';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardHome from './components/DashboardHome';
import ProductTable from './components/ProductTable'; // <-- ¡De vuelta a la acción!
import './App.css';

function App() {
  const [user, setUser] = useState(null); 
  const [activeTab, setActiveTab] = useState('inicio'); 

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setActiveTab('inicio'); 
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'inicio':
        // Pantalla de la captura con el saludo "¡Hola de nuevo, Santiago!"
        return <DashboardHome user={user} setActiveTab={setActiveTab} />;
      case 'dashboard':
        // ¡Aquí queda tu CRUD completo e intacto con búsquedas y paginación!
        return <ProductTable />;
      case 'habitaciones':
        return (
          <div style={{ padding: '20px' }}>
            <h2>🛏️ Módulo de Habitaciones en desarrollo</h2>
          </div>
        );
      case 'reservaciones':
        return (
          <div style={{ padding: '20px' }}>
            <h2>📅 Módulo de Reservaciones en desarrollo</h2>
          </div>
        );
      case 'configuracion':
        return (
          <div style={{ padding: '20px' }}>
            <h2>⚙️ Panel de Configuración del Perfil en desarrollo</h2>
          </div>
        );
      default:
        return <DashboardHome user={user} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="app-main-content">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="app-page-body">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;