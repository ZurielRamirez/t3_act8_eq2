# 🏨 Sistema de Gestión Hotelera - Hotel Manager

Este es un sistema web desarrollado en **React** diseñado para optimizar y controlar de manera eficiente las operaciones internas de un complejo hotelero. El proyecto implementa una arquitectura moderna de componentes, manejando un flujo dinámico de navegación y un control preciso de inventarios mediante la integración de APIs REST.

---

## 👥 Integrantes del Equipo
* **Bautista Ramírez Amisadai Zuriel**
* **Santiago Vásquez David Osmar**

---

## 🌐 Enlace del Proyecto Desplegado
El sistema se encuentra completamente operativo y accesible al público en la infraestructura del servidor en la nube a través de la siguiente URL:

 **http://192.241.240.143/t3_act8_eq2/?page=1&limit=10**

*(Nota: Asegúrate de reemplazar `IP_DE_SU_VPS` con la dirección IP pública real de tu máquina virtual).*

---

## API Elegida para la Tabla de Datos
Para alimentar la tabla interactiva de inventario y control de suministros de manera global, el sistema consume la siguiente API REST:

* **API Utilizada:** `https://api.jsonbin.io/v3/b/666db61ee41b4d34e402e1c9` *(o la URL exacta de MockAPI/JSONBin/JSONPlaceholder)*
* **Descripción:** Se seleccionó esta API debido a su estabilidad para simular una base de datos persistente en la nube, permitiendo realizar peticiones HTTP asíncronas (`Fetch API`) mediante operaciones `GET`, `POST`, `PUT` y `DELETE` para actualizar en tiempo real el stock hotelero (utilería, blancos, mantenimiento e insumos).

---

##  Características Principales

* **Control de Acceso (Login):** Módulo de autenticación seguro para el ingreso de administradores y personal autorizado al panel de control.
* **Navegación Dinámica:** Panel lateral (*Sidebar*) integrado que permite conmutar fluidamente entre las distintas vistas del sistema (Inicio, Dashboard, Habitaciones, Reservaciones y Configuración).
* **Módulo de Inventario General (Stock):** Un CRUD completo e interactivo en la sección de *Dashboard* para gestionar el suministro del hotel (utilería, blancos, herramientas de mantenimiento, insumos y alimentos).
* **Persistencia en URL:** Los filtros de búsqueda, paginación y límites de registros se sincronizan automáticamente con los parámetros de la URL (`URLSearchParams`) para mantener el estado de la vista al recargar.

---

##  Tecnologías Utilizadas

* **Frontend:** React (JSX), JavaScript (ES6+), CSS3 para layouts personalizados.
* **Consumo de Servicios:** Peticiones HTTP utilizando métodos estándar para interactuar con endpoints de simulación de datos globales.
* **Control de Versiones:** Git y GitHub para el despliegue colaborativo.

---

## Estructura del Módulo de Stock (CRUD)

El inventario de suministros está homologado con los siguientes campos operativos:
1. **ID Artículo:** Identificador único del insumo o herramienta.
2. **Descripción / Nombre:** Nombre detallado del objeto en almacén.
3. **Categoría de Stock:** Clasificación interna en el hotel (*Utilería/Blancos, Herramientas/Mantenimiento, Insumos/Alimentos*).
4. **Costo Unitario:** Valor financiero del producto reflejado en moneda nacional ($ MXN).

---

## Instrucciones de Ejecución Local

Para levantar el entorno de desarrollo localmente, ejecuta los siguientes comandos en tu terminal dentro de la carpeta del proyecto:

1. **Instalar dependencias necesarias:**
   ```bash
   npm install