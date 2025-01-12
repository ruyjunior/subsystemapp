import { Page, Text, View, Document, Image, Font} from '@react-pdf/renderer'
import logo from '../../components/images/icatu.jpg';
import styles from '../../styles/PDFStyle';

const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
        <View style={styles.section}>
            <Image style={styles.image} src={logo}/>         
            <View style={styles.textContainer}>
                <Text style={styles.subtitle}>Seguro de Vida em Grupo e Acidentes Pessoais</Text>
                <Text style={styles.title}>PROPOSTA DE ADESÃO</Text>
            </View>
        </View>
        <View style={[styles.section, {backgroundColor: 'lightgray'}]}>
            <Text style={styles.field}> N° da proposta: {data.proposalNumber}</Text>
        </View>
        <Text style={styles.chaphter}>Dados da Apólice</Text>
        <View style={styles.section}>
            <Text style={styles.field}>N° da Apólice: {data.policie.number}</Text>
            <Text style={styles.field}>Estipulante: {data.companieName}</Text>
            <Text style={styles.field}>Início da Vigência:</Text>
        </View>
        <Text style={styles.chaphter}>Qualificação do Proponente</Text>
        <View style={styles.section}>
            <Text style={styles.field}>Nome Completo:   {data.client.name}</Text>
            <Text style={styles.field}>Sexo:</Text>
            <Text style={styles.field}>Data de Nascimento:  {data.client.birth}</Text>
        </View>
        <View style={styles.section}>
            <Text style={styles.field}>CPF: {data.client.cpf}</Text>
            <Text style={styles.field}>Profissão:</Text>
        </View>
        <View style={styles.section}>
            <Text style={styles.field}>Endereço (Av. / Rua):    {data.client.address}</Text>
            <Text style={styles.field}>Número:</Text>
            <Text style={styles.field}>Complemento:</Text>
        </View>
        <View style={styles.section}>
            <Text style={styles.field}>CEP: {data.client.cep}</Text>
            <Text style={styles.field}>Bairro:  </Text>
            <Text style={styles.field}>Cidade:  {data.client.city}</Text>
            <Text style={styles.field}>Estado:  {data.client.state}</Text>
        </View>
        <View style={styles.section}>
            <Text style={styles.field}>Telefone 1:  {data.client.phone}</Text>
            <Text style={styles.field}>Telefone 2:  {data.client.phone2}</Text>
            <Text style={styles.field}>Email:   {data.client.email}</Text>
        </View>
        <View style={styles.section}>
            <Text style={styles.field}>Renda Mensal:</Text>
            <Text style={styles.field}>Aposentado:</Text>
            <Text style={styles.field}>Motivo:</Text>
            <Text style={styles.field}>Causa da Invalidez:</Text>
        </View>
        <Text style={styles.chaphter}>Inclusão do Cônjunge</Text>
        <View style={styles.section}>
            <Text style={styles.field}>Nome do Cônjuge / Companheiro</Text>
            <Text style={styles.field}>Telefone:</Text>
            <Text style={styles.field}>Data de Nascimento:</Text>
            <Text style={styles.field}>CPF:</Text>
        </View>
        <Text style={styles.chaphter}>Forma de cobrança</Text>
        <Text style={styles.chaphter }>Desconto em Folha</Text>
        <View style={[styles.section, {paddingBottom: '5'}]}>
            <Text style={{textAlign: 'left', minWidth: '20%', paddingLeft: '5'}}>Matrícula Funcional</Text>
            <Text style={{textAlign: 'left', minWidth: '20%', paddingLeft: '5'}}>Data de Admissão</Text>
            <Text style={{textAlign: 'left', minWidth: '50%', paddingLeft: '5'}}>Assinatura do funcionário</Text>
        </View>
        <View style={styles.section}>
            <Text style={[styles.field, {textAlign: 'left', minWidth: '20%', paddingLeft: '5', borderStyle: 'solid', borderWidth: 1, borderColor: '#000', borderTop: '0' }]}></Text>
            <Text style={[styles.field, {textAlign: 'left', minWidth: '20%', paddingLeft: '5', borderStyle: 'solid', borderWidth: 1, borderColor: '#000', borderTop: '0' }]}></Text>
            <Text style={[styles.field, {textAlign: 'left', minWidth: '50%'}]}></Text>
        </View>
        <View style={styles.table}>
          {/* Tabela Garantias */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableCellHeader, {minWidth: '30px' }]}>Garantias</Text>
            <Text style={styles.tableCellHeader}>Titular %</Text>
            <Text style={styles.tableCellHeader}>Cônjuge %</Text>
            <Text style={[styles.tableCellHeader, styles.lastCell]}>Filho %</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableFirstCell}>Morte</Text>
            <Text style={styles.tableCell}></Text>
            <Text style={styles.tableCell}></Text>
            <Text style={[styles.tableCell, styles.lastCell]}>{}</Text>
          </View>
        </View>
        <View style={styles.table}>
          {/* Tabela Garantias/Benefícios */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableCellHeader, {minWidth: '30px' }]}>Garantias/Benefícios</Text>
            <Text style={styles.tableCellHeader}>Tipo de Plano</Text>
            <Text style={[styles.tableCellHeader, styles.lastCell]}>Valor</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableFirstCell}>Auxílio Funeral</Text>
            <Text style={styles.tableCell}>Individual Familiar</Text>
            <Text style={[styles.tableCell, styles.lastCell]}></Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableFirstCell}>Serviço de Assistência Funeral (SAF)</Text>
            <Text style={styles.tableCell}>Individual Familiar</Text>
            <Text style={[styles.tableCell, styles.lastCell]}></Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableFirstCell}>Sorteio</Text>
            <Text style={styles.tableCell}>Sorteio Mensais</Text>
            <Text style={[styles.tableCell, styles.lastCell]}></Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableFirstCell}>Auxílio Despesas</Text>
            <Text style={styles.tableCell}></Text>
            <Text style={[styles.tableCell, styles.lastCell]}></Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableFirstCell}>Assistência</Text>
            <Text style={styles.tableCell}></Text>
            <Text style={[styles.tableCell, styles.lastCell]}></Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableFirstCell}>Assistência</Text>
            <Text style={styles.tableCell}></Text>
            <Text style={[styles.tableCell, styles.lastCell]}></Text>
          </View>



        </View>

        <Text style={styles.chaphter }>Dados do(s) beneficiário(s)8
        (O somatório dos percentuais de participação deverá ser 100%.)</Text>
        <View style={styles.table}>
          {/* Tabela Beneficiários*/}
          <View style={styles.tableRow}>
            <Text style={styles.tableCellHeader}>Nome Completo</Text>
            <Text style={styles.tableCellHeader}>Afinidade</Text>
            <Text style={[styles.tableCellHeader, styles.lastCell]}>Participação (%)</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCell}></Text>
            <Text style={styles.tableCell}></Text>
            <Text style={[styles.tableCell, styles.lastCell]}>{}</Text>
          </View>
        </View>
    </Page>
  </Document>
);

export default MyDocument;