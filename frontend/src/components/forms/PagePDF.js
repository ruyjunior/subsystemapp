import { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'

const styles = StyleSheet.create({
    page: { padding: 10 },
    title: { fontSize: 20, marginBottom: 20 },
    field: { fontSize: 14, marginBottom: 10 },
  });
  
const MyDocument = ({ data }) => (
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

export default MyDocument;