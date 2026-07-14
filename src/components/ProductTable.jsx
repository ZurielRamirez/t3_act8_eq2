import React, { useState, useEffect } from 'react';
import './ProductTable.css';

function ProductTable() {
  const queryParams = new URLSearchParams(window.location.search);
  const initialPage = parseInt(queryParams.get('page')) || 1;
  const initialLimit = parseInt(queryParams.get('limit')) || 10;
  const initialSearch = queryParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [search, setSearch] = useState(initialSearch);
  const [total, setTotal] = useState(0);

  // Estados de control para los Modales del Inventario
  const [modalConfig, setModalConfig] = useState({
    show: false,
    type: '', // 'add', 'edit', 'delete'
    title: '',
    inputValue: '',
    inputPrice: '',
    inputCategory: 'Utilería',
    selectedId: null
  });

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('page', page);
    params.set('limit', limit);
    if (search) params.set('search', search);
    
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    fetchData();
  }, [page, limit, search]);

  // 📥 GET: Peticiones nativas a la API de productos de tu compañero
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
      setError('Error al cargar la tabla de inventario.');
    } finally {
      setLoading(false);
    }
  };

  // --- INTERRUPTORES DE LOS MODALES DE STOCK ---
  const openAddModal = () => {
    setModalConfig({ show: true, type: 'add', title: 'Registrar Artículo en Stock', inputValue: '', inputPrice: '', inputCategory: 'Utilería', selectedId: null });
  };

  const openEditModal = (product) => {
    // Mapeo inverso de categorías para el formulario
    let currentCategory = 'Utilería';
    if (product.category === 'beauty') currentCategory = 'Insumos / Alimentos';
    if (product.category === 'fragrances') currentCategory = 'Herramientas';

    setModalConfig({ 
      show: true, 
      type: 'edit', 
      title: `Modificar Artículo No. ${product.id}`, 
      inputValue: product.title, 
      inputPrice: product.price,
      inputCategory: currentCategory,
      selectedId: product.id 
    });
  };

  const openDeleteModal = (id) => {
    setModalConfig({ show: true, type: 'delete', title: 'Dar de Baja del Inventario', inputValue: '', inputPrice: '', inputCategory: '', selectedId: id });
  };

  const closeModal = () => {
    setModalConfig({ show: false, type: '', title: '', inputValue: '', inputPrice: '', inputCategory: 'Utilería', selectedId: null });
  };

  // --- ACCIONES CRUD SOBRE LA API ORIGINAL ---
  const handleConfirmAction = async () => {
    const { type, inputValue, inputPrice, inputCategory, selectedId } = modalConfig;

    // 📤 POST: Conserva la ruta original /products/add
    if (type === 'add') {
      if (!inputValue) return;
      try {
        const res = await fetch('https://dummyjson.com/products/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            title: inputValue, 
            price: parseFloat(inputPrice) || 0, 
            category: inputCategory 
          })
        });
        const newProduct = await res.json();
        setProducts([newProduct, ...products]);
      } catch (err) {
        console.error("Error al registrar artículo en la API.");
      }
    } 
    
    // 🔄 PUT: Conserva la ruta original /products/:id
    else if (type === 'edit') {
      if (!inputValue) return;
      try {
        await fetch(`https://dummyjson.com/products/${selectedId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            title: inputValue,
            price: parseFloat(inputPrice) || 0,
            category: inputCategory
          })
        });
        setProducts(products.map(p => p.id === selectedId ? { ...p, title: inputValue, price: inputPrice, category: inputCategory } : p));
      } catch (err) {
        console.error("Error al actualizar artículo en la API.");
      }
    } 
    
    // ❌ DELETE: Conserva la ruta original /products/:id
    else if (type === 'delete') {
      try {
        await fetch(`https://dummyjson.com/products/${selectedId}`, { method: 'DELETE' });
        setProducts(products.filter(p => p.id !== selectedId));
      } catch (err) {
        console.error("Error al eliminar de la API.");
      }
    }

    closeModal();
  };

  // Función interna para homologar dinámicamente las categorías cosméticas a categorías de un hotel
  const renderHotelCategory = (apiCategory) => {
    switch(apiCategory?.toLowerCase()) {
      case 'beauty':
        return 'Insumos / Alimentos';
      case 'fragrances':
        return 'Herramientas';
      default:
        return 'Utilería / Blancos';
    }
  };

  return (
    <div className="table-container">
      <div className="table-toolbar">
        <input 
          type="text" 
          placeholder="Buscar artículos en stock (ej. sábanas, herramientas)..." 
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="table-search-input"
        />

        <button onClick={openAddModal} className="table-add-btn">
          + Registrar Artículo
        </button>
      </div>

      {loading ? (
        <p className="table-loading">Sincronizando inventario con el servidor público...</p>
      ) : error ? (
        <p className="table-error">{error}</p>
      ) : (
        <>
          <table className="crud-table">
            <thead>
              <tr>
                <th>ID Artículo</th>
                <th>Descripción / Nombre</th>
                <th>Categoría Stock</th>
                <th>Costo Unitario</th>
                <th className="actions-cell">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td><strong>#{product.id}</strong></td>
                  <td className="product-title-cell">{product.title}</td>
                  <td>
                    <span className="product-category-badge">
                      {renderHotelCategory(product.category)}
                    </span>
                  </td>
                  <td>${product.price} MXN</td>
                  <td className="actions-cell">
                    <button onClick={() => openEditModal(product)} className="edit-action-btn">Editar</button>
                    <button onClick={() => openDeleteModal(product.id)} className="delete-action-btn">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginación */}
          <div className="pagination-container">
            <div className="pagination-limit-selector">
              <span>Mostrar</span>
              <select 
                value={limit} 
                onChange={(e) => { setLimit(parseInt(e.target.value)); setPage(1); }} 
                className="pagination-select"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="40">40</option>
              </select>
              <span>registros</span>
            </div>

            <div className="pagination-controls">
              <button disabled={page === 1} onClick={() => setPage(page - 1)} className="pagination-btn">Anterior</button>
              <span className="pagination-current-page">Página {page}</span>
              <button disabled={page * limit >= total} onClick={() => setPage(page + 1)} className="pagination-btn">Siguiente</button>
            </div>
          </div>
        </>
      )}

      {/* --- MODAL ADAPTADO PARA REGISTRO DE STOCK --- */}
      {modalConfig.show && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>{modalConfig.title}</h3>
            
            {modalConfig.type === 'delete' ? (
              <p>¿Estás seguro de que deseas eliminar permanentemente este artículo del stock hotelero? Esta acción mandará un método HTTP DELETE al servidor.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569' }}>Nombre del Artículo / Insumo:</label>
                <input 
                  type="text" 
                  value={modalConfig.inputValue}
                  onChange={(e) => setModalConfig({ ...modalConfig, inputValue: e.target.value })}
                  className="modal-input"
                  style={{ marginBottom: 0 }}
                  placeholder="Ej. Toallas de Baño Algodón"
                />

                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569' }}>Costo Unitario ($):</label>
                <input 
                  type="number" 
                  value={modalConfig.inputPrice}
                  onChange={(e) => setModalConfig({ ...modalConfig, inputPrice: e.target.value })}
                  className="modal-input"
                  style={{ marginBottom: 0 }}
                  placeholder="Ej. 180"
                />

                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569' }}>Área / Categoría de Inventario:</label>
                <select
                  value={modalConfig.inputCategory}
                  onChange={(e) => setModalConfig({ ...modalConfig, inputCategory: e.target.value })}
                  className="modal-input"
                  style={{ marginBottom: '20px' }}
                >
                  <option value="Utilería">Utilería / Blancos</option>
                  <option value="Herramientas">Herramientas y Mantenimiento</option>
                  <option value="Insumos / Alimentos">Insumos y Comida</option>
                </select>
              </div>
            )}

            <div className="modal-actions">
              <button onClick={closeModal} className="modal-btn-cancel">
                Cancelar
              </button>
              <button 
                onClick={handleConfirmAction} 
                className={`modal-btn-confirm ${modalConfig.type === 'delete' ? 'danger' : ''}`}
              >
                {modalConfig.type === 'delete' ? 'Eliminar del Stock' : 'Guardar en Inventario'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductTable;