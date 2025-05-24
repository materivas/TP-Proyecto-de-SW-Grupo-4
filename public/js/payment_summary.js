// Mostrar datos de pago en el resumen
document.addEventListener('DOMContentLoaded', function() {
  const paymentData = JSON.parse(localStorage.getItem('paymentData'));
  if (paymentData) {
    const resumenBox = document.querySelector('.resumen-box');
    resumenBox.innerHTML += `
      <hr>
      <p><strong>Método de pago:</strong> Tarjeta de crédito terminada en ${paymentData.cardLastDigits}</p>
      <p><strong>Titular:</strong> ${paymentData.cardHolder}</p>
      <p><strong>Fecha de pago:</strong> ${paymentData.paymentDate}</p>
    `;
  }
});

document.getElementById("confirmarPago").addEventListener("click", function () {
  document.getElementById("mensajeConfirmacion").innerText = "¡Pago confirmado exitosamente!";
});

document.getElementById("descargarComprobante").addEventListener("click", function () {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const paymentData = JSON.parse(localStorage.getItem('paymentData')) || {};

  doc.setFontSize(16);
  doc.text("Comprobante de Pago", 20, 20);
  doc.setFontSize(12);
  
  // Datos del alojamiento (desde el resumen)
  const resumenBox = document.querySelector('.resumen-box');
  const lines = resumenBox.querySelectorAll('p');
  
  let yPosition = 40;
  lines.forEach(line => {
    if (!line.classList.contains('total')) {
      doc.text(line.textContent, 20, yPosition);
      yPosition += 10;
    }
  });
  
  // Datos del pago
  if (paymentData.cardLastDigits) {
    doc.text(`Método de pago: Tarjeta de crédito terminada en ${paymentData.cardLastDigits}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Titular: ${paymentData.cardHolder}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Fecha de pago: ${paymentData.paymentDate}`, 20, yPosition);
  }

  doc.save("comprobante_pago.pdf");
});