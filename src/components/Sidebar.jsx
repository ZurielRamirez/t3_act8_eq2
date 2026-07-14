import React from 'react';
import './Sidebar.css';

function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className="sidebar-container">
      <h1 className="sidebar-logo">🏨 HOTEL MANAGER</h1>
      
      <nav className="sidebar-nav">
        {/* Nueva opción de Inicio para el mensaje de bienvenida */}
        <div 
          className={`sidebar-nav-item ${activeTab === 'inicio' ? 'active' : ''}`}
          onClick={() => setActiveTab('inicio')}
        >
          🏠 Inicio
        </div>
        <div 
          className={`sidebar-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </div>
        <div 
          className={`sidebar-nav-item ${activeTab === 'habitaciones' ? 'active' : ''}`}
          onClick={() => setActiveTab('habitaciones')}
        >
          🛏️ Habitaciones
        </div>
        <div 
          className={`sidebar-nav-item ${activeTab === 'reservaciones' ? 'active' : ''}`}
          onClick={() => setActiveTab('reservaciones')}
        >
          📅 Reservaciones
        </div>
        <div 
          className={`sidebar-nav-item ${activeTab === 'configuracion' ? 'active' : ''}`}
          onClick={() => setActiveTab('configuracion')}
        >
          ⚙️ Configuración
        </div>
      </nav>
      
      <div className="sidebar-footer">v1.0.0 — 2026</div>
    </div>
  );
}

export default Sidebar;