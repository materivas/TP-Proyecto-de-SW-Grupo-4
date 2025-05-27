document.addEventListener('DOMContentLoaded', async () => {
  const contenedor = document.getElementById('contenedor-propiedades');

  try {
    const respuesta = await fetch('propiedades.json'); 
    if (!respuesta.ok) throw new Error('No se pudo cargar el archivo JSON');

    // ...dentro del try, después de parsear el JSON:
const propiedades = await respuesta.json();

// Obtengo únicamente la primera
const primera = propiedades[0];

if (primera) {
  const card = document.createElement('div');
  card.className = 'card';

  card.innerHTML = `
    <div class="card-badge">⭐ ${primera.calificacion}</div>
    <img src="${primera.imagen}" alt="${primera.titulo}" />
    <div class="card-content">
      <div class="card-header">
        <span class="card-location">${primera.ciudad}</span>
        <span class="card-type">${primera.tipo}</span>
      </div>
      <a href="details.html?id=${primera.id}" class="card-title-link">
        <h3 class="card-title">${primera.titulo}</h3>
      </a>
      <p class="card-date">${primera.fecha}</p>
      <p class="card-price"><strong>$${primera.precio_por_noche} USD</strong> por noche</p>
      ${!primera.disponible ? '<div class="no-disponible">No disponible</div>' : ''}
      <a href="details.html?id=${primera.id}" class="card-button">Ver detalles</a>
    </div>
  `;

  contenedor.appendChild(card);
} else {
  contenedor.innerHTML = '<p>No hay propiedades disponibles.</p>';
}

  } catch (error) {
    console.error('Error cargando propiedades:', error);
    contenedor.innerHTML = '<p>No se pudieron cargar las propiedades.</p>';
  }

  // Mostrar propiedad recién publicada desde localStorage (opcional)
  const propiedadPublicada = localStorage.getItem('propiedadPublicada');
  if (propiedadPublicada) {
    const p = JSON.parse(propiedadPublicada);
    const card = document.createElement('div');
    card.className = 'card';

    // puse un link para que lleve a una vista de detalle con esos datos
    card.innerHTML = `
      <div class="card-badge">⭐ 5.0</div>
      <img src="${p.imagen}" alt="${p.titulo}">
      <div class="card-content">
        <div class="card-header">
          <span class="card-location">Tu propiedad</span>
          <span class="card-type">${p.habitaciones} hab / ${p.banios} baños</span>
        </div>
        
        <a href="detaiIs.html" class="card-title-link">
        <h3 class="card-title">${p.titulo}</h3>
        </a>

        
        <p class="card-date">¡Recién publicada!</p>
        <p class="card-price"><strong>$${p.precio}</strong> por noche</p>
      </div>
    `;

    contenedor.appendChild(card);
  }
});
