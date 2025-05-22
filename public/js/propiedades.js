document.addEventListener('DOMContentLoaded', async () => {
    const contenedor = document.getElementById('contenedor-propiedades');

    try {
        const respuesta = await fetch('/api/propiedades');
        const propiedades = await respuesta.json();

        propiedades.forEach(propiedad => {
            const card = document.createElement('div');
            card.className = 'card';

            card.innerHTML = `
                <div class="card-badge">⭐ ${propiedad.calificacion}</div>
                <img src="${propiedad.imagen}" alt="${propiedad.titulo}">
                <div class="card-content">
                    <div class="card-header">
                        <span class="card-location">${propiedad.ciudad}</span>
                        <span class="card-type">${propiedad.tipo}</span>
                    </div>
                    <a href="details.html?id=${propiedad.id}" class="card-title-link">
                        <h3 class="card-title">${propiedad.titulo}</h3>
                    </a>
                    <p class="card-date">${propiedad.fecha}</p>
                    <p class="card-price"><strong>$${propiedad.precio_por_noche}</strong> por noche</p>
                    ${!propiedad.disponible ? '<div class="no-disponible">No disponible</div>' : ''}
                    <a href="details.html?id=${propiedad.id}" class="card-button">Ver detalles</a>
                </div>
            `;

            contenedor.appendChild(card);
        });

    } catch (error) {
        console.error('Error cargando el JSON:', error);
        contenedor.innerHTML = '<p>No se pudieron cargar las propiedades.</p>';
    }

    
    const propiedadPublicada = localStorage.getItem('propiedadPublicada');
    if (propiedadPublicada) {
        const p = JSON.parse(propiedadPublicada);

        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <div class="card-badge">⭐ 5.0</div>
            <img src="${p.imagen}" alt="${p.titulo}">
            <div class="card-content">
                <div class="card-header">
                    <span class="card-location">Tu propiedad</span>
                    <span class="card-type">${p.habitaciones} hab / ${p.banios} baños</span>
                </div>
                <h3 class="card-title">${p.titulo}</h3>
                <p class="card-date">¡Recién publicada!</p>
                <p class="card-price"><strong>$${p.precio}</strong> por noche</p>
            </div>
        `;

        contenedor.appendChild(card);
    }
});