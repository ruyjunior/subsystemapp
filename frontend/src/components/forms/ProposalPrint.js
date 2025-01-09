import React, { useState, useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import DBService from '../../services/DBService';
import '../../styles/Main.css';
import axios from 'axios';
import MyDocument from './PagePDF';


const API_URL = 'http://localhost:5000/api/';

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 20, marginBottom: 20 },
  field: { fontSize: 14, marginBottom: 10 },
});

const MyDocument_ = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Proposta</Text>
      <Text style={styles.field}>ID Client: {data.idClient}</Text>
      <Text style={styles.field}>ID User: {data.idUser}</Text>
      <Text style={styles.field}>ID Apólice: {data.idPolicie}</Text>
      <Text style={styles.field}>ID Plano: {data.idPlan}</Text>
      <Text style={styles.field}>ID Custo: {data.idCost}</Text>
    </Page>
  </Document>
);

const ProposalPrint = ({ proposalToPrint, clients, policies, plans, costs }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [errorMessage, setErrorMessage] = useState(''); 
  const [showPreview, setShowPreview] = useState(false);
  const [PrintData, setPrintData] = useState({
    idClient: '',
    idUser:'',
    idPolicie:'',
    idPlan:'',
    idCost:''
  });
  useEffect(() => {
    if (proposalToPrint) {
      setPrintData(proposalToPrint);
      setShowPreview(true);
    }
  }, [proposalToPrint]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrintData({ ...PrintData, [name]: value });
  };  

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
