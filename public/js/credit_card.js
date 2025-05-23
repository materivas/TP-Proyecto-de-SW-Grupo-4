document.getElementById("credit-card-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const numero = e.target.numero.value.trim();
  const vencimiento = e.target.vencimiento.value.trim();
  const cvv = e.target.cvv.value.trim();
  const titular = e.target.titular.value.trim();
  const codigoPostal = e.target.codigo_postal.value.trim();
  const pais = e.target.pais.value;

  // Validaciones
  if (!/^\d{16}$/.test(numero.replace(/\s/g, ""))) {
    alert("Número de tarjeta inválido");
    return;
  }

  if (!/^\d{2}\/\d{2}$/.test(vencimiento)) {
    alert("Formato de vencimiento inválido (MM/AA)");
    return;
  }

  if (!/^\d{3,4}$/.test(cvv)) {
    alert("CVV inválido");
    return;
  }

  if (titular.length < 3) {
    alert("Nombre del titular inválido");
    return;
  }

  if (codigoPostal.length < 3) {
    alert("Código postal inválido");
    return;
  }

  if (!pais) {
    alert("Debe seleccionar un país");
    return;
  }

  // Guardar datos de pago en localStorage para usar en el resumen
  const paymentData = {
    cardLastDigits: numero.slice(-4),
    cardHolder: titular,
    paymentDate: new Date().toLocaleDateString()
  };
  localStorage.setItem('paymentData', JSON.stringify(paymentData));

  // Redirigir a la página de resumen
  window.location.href = "payment_summary.html";
});