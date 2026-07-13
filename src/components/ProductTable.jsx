import React, { useState, useEffect } from 'react';

function ProductTable() {
  // Sincronización inicial leyendo parámetros de la URL actual
  const queryParams = new URLSearchParams(window.location.search);
  const initialPage = parseInt(queryParams.get('page')) || 1;
  const initialLimit = parseInt(queryParams.get('limit')) || 10;
  const initialSearch = queryParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Estados de control de la tabla
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState('');
  const [total, setTotal] = useState(0);

  // Efecto para actualizar los parámetros de la URL dinámicamente cada vez que cambia el estado
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('page', page);
    params.set('limit', limit);
    if (search) params.set('search', search);
    
    // Cambia la URL en el navegador sin recargar la página entero
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    fetchData();
  }, [page, limit, search, category]);

  // Obtención de datos reales (Fase 3)
  const fetchData = async () => {
    setLoading(true);
    try {
      let url = `https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`;
      if (search) {
        url = `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${(page - 1) * limit}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.products || []);
      setTotal(data.total || 0);
    } catch (err) {
      setError('Error al cargar la tabla de datos.');
    } finally {
      setLoading(false);
    }
  };

  // ACCIONES CRUD (Simulación real + cambio local)
  const handleAddProduct = async () => {
    const title = prompt("Introduce el nombre del nuevo producto:");
    if (!title) return;

    try {
      const res = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, price: 29.99, category: 'general' })
      });
      const newProduct = await res.json();
      
      // Reflejar localmente agregándolo al inicio
      setProducts([newProduct, ...products]);
      alert("Producto agregado con éxito (Simulado).");
    } catch (err) {
      alert("Error al simular inserción.");
    }
  };

  const handleEditProduct = async (id) => {
    if (!confirm("¿Estás seguro de que deseas editar este registro?")) return;
    const newTitle = prompt("Introduce el nuevo título del producto:");
    if (!newTitle) return;

    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle })
      });
      const updatedData = await res.json();

      // Actualizar estado de forma reactiva
      setProducts(products.map(p => p.id === id ? { ...p, title: newTitle } : p));
      alert("Registro modificado correctamente.");
    } catch (err) {
      alert("Error al intentar editar.");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este registro de forma permanente?")) return;

    try {
      await fetch(`https://dummyjson.com/products/${id}`, { method: 'DELETE' });
      
      // Remover del estado local para actualización visual inmediata
      setProducts(products.filter(p => p.id !== id));
      alert("Registro eliminado exitosamente de la vista.");
    } catch (err) {
      alert("Error al intentar eliminar.");
    }
  };

  return (
    <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '20px', gap: '12px', flexWrap: 'wrap' }}>
        {/* Filtros */}
        <input 
          type="text" 
          placeholder="Buscar producto..." 
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', width: '260px' }}
        />

        <button onClick={handleAddProduct} style={{ padding: '8px 16px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '500', cursor: 'pointer', marginLeft: 'auto' }}>
          + Agregar Producto
        </button>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#64748b' }}>Cargando información del catálogo...</p>
      ) : error ? (
        <p style={{ color: '#ef4444', textAlign: 'center' }}>{error}</p>
      ) : (
        <>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#64748b', fontSize: '13px' }}>
                <th style={{ padding: '12px' }}>ID</th>
                <th style={{ padding: '12px' }}>Título</th>
                <th style={{ padding: '12px' }}>Categoría</th>
                <th style={{ padding: '12px' }}>Precio</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} style={{ borderBottom: '1px solid #f1f5f9', fontSize: '14px', color: '#334155' }}>
                  <td style={{ padding: '12px' }}>{product.id}</td>
                  <td style={{ padding: '12px', fontWeight: '500' }}>{product.title}</td>
                  <td style={{ padding: '12px' }}><span style={{ backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>{product.category}</span></td>
                  <td style={{ padding: '12px' }}>${product.price}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <button onClick={() => handleEditProduct(product.id)} style={{ marginRight: '8px', color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}>Editar</button>
                    <button onClick={() => handleDeleteProduct(product.id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginación */}
          <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#64748b' }}>
              <span>Mostrar</span>
              <select value={limit} onChange={(e) => { setLimit(parseInt(e.target.value)); setPage(1); }} style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
              <span>registros</span>
            </div>

            <div style={{ display: 'flex', gap: '6px', marginLeft: 'auto' }}>
              <button disabled={page === 1} onClick={() => setPage(page - 1)} style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: '#fff', cursor: 'pointer' }}>Anterior</button>
              <span style={{ padding: '6px 12px', fontSize: '14px', color: '#334155' }}>Página {page}</span>
              <button disabled={page * limit >= total} onClick={() => setPage(page + 1)} style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: '#fff', cursor: 'pointer' }}>Siguiente</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductTable;