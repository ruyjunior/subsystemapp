import React, { useState, useEffect } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import '../../styles/Main.css';
import MyDocument from './PagePDF';

const ProposalPrint = ({proposalToPrint}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [PrintData, setPrintData] = useState('');  

  useEffect(() => {
    if (proposalToPrint) {
      setPrintData(proposalToPrint);
      setShowPreview(true);
    }else{
      setShowPreview(false);
    }
  }, [proposalToPrint]);

  return (
    <div>
      <h2>Visualização de PDF</h2>
      {showPreview && (
        <PDFViewer style={{ width: '100%', height: '500px', marginTop: 20 }}>
          <MyDocument data={PrintData} />
        </PDFViewer>
      )}

      <PDFDownloadLink
        document={<MyDocument data={PrintData} />}
        fileName="formulario.pdf"
      >
        {({ loading }) => (loading ? 'Gerando PDF...' : 'Download ')}
      </PDFDownloadLink>
    </div>
  );
};

export default ProposalPrint;
