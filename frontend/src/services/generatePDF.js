import jsPDF from 'jspdf';

const generatePDF = (proposal) => {
  const doc = new jsPDF();

  doc.text(`ID Cliente:  ${proposal.idClient}`, 10, 10 );
  doc.text(`ID Usuário:  ${proposal.idUser}`, 10, 20 );
  doc.text(`ID Plano:  ${proposal.idPlan}`, 10, 30 );
  doc.text(`ID Custo:  ${proposal.idCost}`, 10, 40 );

  doc.save('proposta.pdf');
};

export default generatePDF;