import React from 'react';

function Sidebar() {
  return (
    <div style={{ width: '260px', backgroundColor: '#0f172a', color: '#94a3b8', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h1 style={{ color: '#ffffff', fontSize: '18px', fontWeight: 'bold', margin: '0 0 12px 0' }}>🏨 HOTEL MANAGER</h1>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ padding: '10px', borderRadius: '6px', color: '#fff', backgroundColor: '#1e293b', fontWeight: '500', cursor: 'pointer' }}>📊 Dashboard</div>
        <div style={{ padding: '10px', borderRadius: '6px', cursor: 'pointer' }}>🛏️ Habitaciones</div>
        <div style={{ padding: '10px', borderRadius: '6px', cursor: 'pointer' }}>📅 Reservaciones</div>
        <div style={{ padding: '10px', borderRadius: '6px', cursor: 'pointer' }}>⚙️ Configuración</div>
      </nav>
      <div style={{ marginTop: 'auto', fontSize: '12px', color: '#475569' }}>v1.0.0 — 2026</div>
    </div>
  );
}

export default Sidebar;