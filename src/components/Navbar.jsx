import React, { useState } from 'react';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Iniciales del avatar si la imagen falla
  const initials = `${user?.firstName?.[0] || 'S'}${user?.lastName?.[0] || 'V'}`;

  return (
    <header className="navbar-header">
      <h3 className="navbar-title">Inicio</h3>
      
      <div className="navbar-user-section" onClick={() => setDropdownOpen(!dropdownOpen)}>
        <div className="navbar-user-info">
          <div className="navbar-user-name">{user?.firstName || 'Santiago'} {user?.lastName || 'Vásquez'}</div>
          <div className="navbar-user-role">Administrador</div>
        </div>
        
        {user?.image ? (
          <img src={user.image} alt="Avatar" className="navbar-avatar" />
        ) : (
          <div className="navbar-avatar-fallback">{initials}</div>
        )}

        {/* Menú desplegable flotante al hacer clic */}
        {dropdownOpen && (
          <div className="navbar-dropdown">
            <button onClick={onLogout} className="navbar-dropdown-item">
              🚪 Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;