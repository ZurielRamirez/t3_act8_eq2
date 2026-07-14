import React from 'react';
import './DashboardHome.css';

function DashboardHome({ user, setActiveTab }) {
  return (
    <div className="dh-container">
      {/* Banner de Bienvenida */}
      <div className="dh-banner">
        <h2 className="dh-welcome-title">¡Hola de nuevo, {user?.firstName || 'Santiago'}! 👋</h2>
        <p className="dh-welcome-text">
          Bienvenido al panel central de administración del hotel. El sistema se encuentra operando normalmente. 
          Selecciona un apartado en el menú lateral o utiliza los accesos directos de abajo para comenzar la gestión de hoy.
        </p>
      </div>

      {/* Sección de Accesos Directos */}
      <h3 className="dh-section-title">Accesos Directos Rápidos</h3>
      
      <div className="dh-cards-grid">
        <div className="dh-card" onClick={() => setActiveTab('dashboard')}>
          <span className="dh-card-icon">📈</span>
          <h4 className="dh-card-title">Ver Métricas</h4>
          <p className="dh-card-desc">Revisa la ocupación, ingresos y estadísticas generales del hotel.</p>
        </div>

        <div className="dh-card" onClick={() => setActiveTab('habitaciones')}>
          <span className="dh-card-icon">📅</span>
          <h4 className="dh-card-title">Gestionar Reservas</h4>
          <p className="dh-card-desc">Consulta la tabla de huéspedes, check-ins pendientes y cancelaciones.</p>
        </div>

        <div className="dh-card" onClick={() => setActiveTab('configuracion')}>
          <span className="dh-card-icon">⚙️</span>
          <h4 className="dh-card-title">Configuración</h4>
          <p className="dh-card-desc">Modifica los datos de tu perfil administrativo y ajustes globales.</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;