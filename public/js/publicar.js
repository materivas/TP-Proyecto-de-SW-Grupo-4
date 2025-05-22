document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-publicar');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

    localStorage.removeItem('propiedadPublicada');

        const titulo = document.getElementById('titulo').value;
        const descripcion = document.getElementById('descripcion').value;
        const imagenInput = document.getElementById('imagen');
        const habitaciones = document.getElementById('habitaciones').value;
        const banios = document.getElementById('banios').value;
        const huespedes = document.getElementById('huespedes').value;
        const comodidades = document.getElementById('comodidades').value;
        const precio = document.getElementById('precio').value;

        const reader = new FileReader();
        reader.onload = function () {
            const imagenBase64 = reader.result;

            const propiedad = {
                titulo,
                descripcion,
                imagen: imagenBase64,
                habitaciones,
                banios,
                huespedes,
                comodidades,
                precio
            };

            // Guardar en localStorage
            localStorage.setItem('propiedadPublicada', JSON.stringify(propiedad));

            // Redireccionar al index
            window.location.href = 'index.html';
        };

        if (imagenInput.files.length > 0) {
            reader.readAsDataURL(imagenInput.files[0]);
        }
    });
});