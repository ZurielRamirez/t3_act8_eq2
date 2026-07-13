import React from 'react';

function Navbar({ user, onLogout }) {
  return (
    <header style={{ height: '70px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a' }}>Inicio</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>{user.firstName} {user.lastName}</div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Administrador</div>
        </div>
        <img 
          src={user.image} 
          alt="Avatar" 
          style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#38bdf8' }}
        />
        <button 
          onClick={onLogout}
          style={{ marginLeft: '12px', padding: '6px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}

export default Navbar;