import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ProductTable from './components/ProductTable';

function App() {
  const [user, setUser] = useState(null);

  // Cerrar sesión limpiando el estado
  const handleLogout = () => setUser(null);

  if (!user) {
    return <Login onLoginSuccess={setUser} />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' }}>
      {/* FASE 2: Menú lateral izquierdo basado en Captura de pantalla 2026-07-13 a la(s) 7.37.33 a.m..png */}
      <Sidebar />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'col' }}>
        {/* FASE 2: Barra superior */}
        <Navbar user={user} onLogout={handleLogout} />
        
        {/* FASE 3: Contenido Principal (Tabla de Datos interactiva) */}
        <main style={{ padding: '24px', flex: 1 }}>
          <ProductTable />
        </main>
      </div>
    </div>
  );
}

export default App;