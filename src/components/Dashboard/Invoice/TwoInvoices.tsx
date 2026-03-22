/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import qrCode from "../../../assets/qr-code.png";
import rupee from "../../../assets/rupee.png";
import rupeeWhite from "../../../assets/rupee-white.png";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row", // Changed to row for landscape with two invoices
    backgroundColor: "#FFFFFF",
    padding: 10, // Slightly reduced padding for two invoices
    fontFamily: "Helvetica",
    fontSize: 8, // Slightly reduced font size for two invoices
    gap: 10, // Gap between the two invoices
  },
  invoiceContainer: {
    width: "50%", // Each invoice takes half the page width
    height: "100%",
    padding: 2, // Padding within each invoice container
    borderRightWidth: 1, // Separator between invoices
    borderRightColor: "#EEEEEE",
  },
  lastInvoiceContainer: {
    borderRightWidth: 0, // No right border for the last invoice
  },
  headerSection: {
    backgroundColor: "#000000",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10, 
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingBottom: 5,
    paddingHorizontal: 5, // Reduced horizontal padding
  },
  logoContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    padding: 6, // Reduced padding
    borderRadius: 5,
  },
  logo: {
    width: 80, // Reduced logo size
    height: 20,
  },
  companyName: {
    fontSize: 14, // Reduced font size
    color: "#F58220",
    fontWeight: "bold",
  },
  invoiceTitle: {
    fontSize: 24, // Reduced font size
    fontWeight: "bold",
    color: "#FFF",
  },
  invoiceDetails: {
    textAlign: "right",
    fontSize: 8, // Reduced font size
    color: "#fff",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 10, // Reduced margin
  },
  subHeader: {
    fontSize: 10, // Reduced font size
    fontWeight: "bold",
    marginBottom: 3,
    color: "#F58220",
  },
  text: {
    marginBottom: 2, // Reduced margin
    color: "#555555",
    fontWeight :"bold",
  },
  bold: {
    fontWeight: "bold",
    color: "#333333",
  },
  paymentMethod: {
    textAlign: "right",
    marginBottom: 5, // Reduced margin
    fontSize: 8, // Reduced font size
    fontWeight: "bold",
    color: "#555555",
  },
  customerDetails: {
    width: "50%",
  },
  accountDetails: {
    width: "50%",
    marginLeft: 10, // Reduced margin
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8, // Reduced margin
  },
  detailsColumn: {
    width: "48%",
  },
  qrCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 5, // Reduced margin
  },
  qrCode: {
    width: 80, // Reduced QR code size
    height: 80,
    marginRight: 5,
  },
  verifiedText: {
    fontSize: 8, // Reduced font size
    color: "#4CAF50",
    fontWeight: "bold",
  },
  verifiedSubText: {
    fontSize: 6, // Reduced font size
    color: "#777777",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#000000",
    color: "#FFFFFF",
    fontWeight: "bold",
    padding: 3, // Reduced padding
    marginTop: 5,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#EEEEEE",
    borderBottomWidth: 1,
    paddingVertical: 3, // Reduced padding
  },
  descriptionCol: {
    width: "40%", // Adjusted width
    paddingLeft: 3,
  },
  priceCol: {
    width: "15%", // Adjusted width
    textAlign: "center",
  },
  qtyCol: {
    width: "15%", // Adjusted width
    textAlign: "center",
  },
  subtotalCol: {
    width: "15%", // Adjusted width
    textAlign: "center",
  },
  taxCol: {
    width: "15%", // Adjusted width for tax
    textAlign: "center",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 8, // Reduced margin
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },

  subtotalBox: {
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 7, // Reduced gap
  },

  dueBox: {
    backgroundColor: "#000000",
    padding: 3, // Reduced padding
    borderRadius: 3,
    flexDirection: "row",
    gap: 3, // Reduced gap
  },

  subtotalRow: {
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: 8, // Reduced margin
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    gap: 4, // Reduced gap
  },

  amountRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  subtotalText: {
    fontSize: 8, // Reduced font size
    color: "#333333",
    marginHorizontal: 1,
  },

  totalBox: {
    backgroundColor: "#000000",
    padding: 3, // Reduced padding
    borderRadius: 2,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    color: "#ffffff",
  },

  totalPaidBox: {
    backgroundColor: "#F0FDF4",
    padding: 5, // Reduced padding
    borderRadius: 2,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    color: "#00A63E",
  },

  totalText: {
    fontWeight: 500,
    fontSize: 10, // Reduced font size
    marginHorizontal: 1,
  },

  rupeeIcon: {
    width: 6, // Reduced icon size
    height: 6,
    resizeMode: "contain",
    marginHorizontal: 1,
  },

  normalText: {
    fontSize: 7, // Reduced font size
    fontWeight: "semibold",
    color: "#ffffff",
    marginHorizontal: 1,
  },

  dueRupeeIcon: {
    width: 5, // Reduced icon size
    height: 5,
    resizeMode: "contain",
    marginHorizontal: 1,
  },

  footerSection: {
    marginTop: "auto", // Pushes the footer to the bottom
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    paddingVertical: 8, // Reduced padding
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderBottomWidth: 15,
    borderBottomColor: "#000",
  },
  thankYou: {
    fontSize: 10, // Reduced font size
    fontWeight: "bold",
    color: "#333333",
  },
  contactInfo: {
    width: "50%",
    textAlign: "left",
  },
  note: {
    fontSize: 6, // Reduced font size
    color: "#777777",
    textAlign: "right",
    width: "50%",
  },
  goodkingLogoFooter: {
    width: 60, // Reduced logo size
    height: 30,
    alignSelf: "center",
    marginTop: 10,
    position: "absolute",
    bottom: 35,
    left: "38%",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 3,
  },
  addressFooter: {
    fontSize: 10, // Reduced font size
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#000",
    paddingVertical:5,
    fontWeight: "bold",
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3, // Reduced margin
  },

  statusLabel: {
    fontSize: 9, // Reduced font size
    color: "#333333",
    marginRight: 3,
  },

  statusBox: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 3,
  },

  paidBox: {
    backgroundColor: "green",
  },

  dueBox2: {
    backgroundColor: "red",
  },

  statusText: {
    color: "#fff",
    fontSize: 9, // Reduced font size
    fontWeight: "bold",
  },
  copyLabel: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "right",
    marginBottom: 5,
    marginTop:10,
    color: "#FFF",
  },
  flexRow:{
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 5
  }
});

const InvoiceContent = ({ data, copyType }: any) => (
  <View style={[styles.invoiceContainer, copyType === 'supplier' ? styles.lastInvoiceContainer : {}]}>
    <View style={styles.headerSection}>
      <View style={styles.logoContainer}>
        <Image
          src="/mh-20/logo.png"
          style={styles.logo}
        />
      </View>
      <View style={styles.flexRow}>
        <View>
          <Text style={styles.copyLabel}>{copyType.toUpperCase()}'S COPY</Text>
        </View>
        <View>
          <Text style={styles.invoiceTitle}>INVOICE</Text>
        <View style={styles.invoiceDetails}>
          <Text>Invoice No: {data?.invoiceNumber}</Text>
          <Text>Invoice Date: {data?.date}</Text>
        </View>
        </View>
        
      </View>
    </View>

    <View style={styles.section}>
      <View style={styles.detailsRow}>
        <View style={styles.detailsColumn}>
          <Text style={styles.bold}>Invoice to: {data?.customerName}</Text>
          <Text style={styles.text}>Business name: {data?.businessName}</Text>
        </View>
        <View style={styles.detailsColumn}>
          <Text style={styles.paymentMethod}>PAYMENT METHOD</Text>
        </View>
      </View>
    </View>

    <View style={styles.section}>
      <View style={styles.detailsRow}>
        <View style={styles.detailsColumn}>
          <Text style={styles.bold}>{data?.customerName}</Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Phone:</Text> {data?.businessPhone}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Email:</Text> {data?.businessEmail}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Address:</Text> {data?.businessAddress}
          </Text>

          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Status :</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 3,
                paddingHorizontal: 3,
                borderRadius: 3,
                backgroundColor: data?.status === "Paid" ? "green" : "red",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 7,
                  fontWeight: "bold",
                }}
              >
                {data?.amount}{" "}
                {data?.status === "Paid" ? "Paid" : "Current Due"}
              </Text>
              {data?.dueAmount > 1 && (
                <Image
                  source={rupeeWhite}
                  style={{
                    width: 7,
                    height: 7,
                    marginLeft: 2,
                  }}
                />
              )}
              {data?.dueAmount > 1 && (
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 7,
                    fontWeight: "bold",
                  }}
                >
                  {data?.dueAmount +data?.coveredDueAmount }
                </Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.detailsColumn}>
          <Text style={styles.text}>
            <Text style={styles.bold}>Account No:</Text> 49160200004346
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Bank Name:</Text> Goodking Foods
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Branch IFSC Code:</Text> BARB0MUKAUR
            <Text style={{ fontSize: 6 }}> (5 digit is zero)</Text>
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Branch Name:</Text> Mukundwadi branch{" "}
            <Text style={{ fontSize: 6 }}>(BARB0MUKAUR)</Text>
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>UPI ID -</Text> goodkingfoods@barodampay
          </Text>
          <View style={styles.qrCodeContainer}>
            <Image src={qrCode} style={styles.qrCode} />
            <View>
              <Text style={styles.verifiedText}>Verified as</Text>
              <Text style={styles.verifiedText}>Goodking Foods</Text>
              <Text style={styles.verifiedSubText}>
                goodkingfoods@barodampay
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>

    <View style={styles.tableHeader}>
      <Text style={styles.descriptionCol}>DESCRIPTION</Text>
      <Text style={styles.priceCol}>PRICE</Text>
      <Text style={styles.taxCol}>TAX VALUE</Text>
      <Text style={styles.qtyCol}>QTY</Text>
      <Text style={styles.subtotalCol}>SUBTOTAL</Text>
    </View>

    {data?.items?.map((item: any, i: number) => (
      <View style={styles.tableRow} key={i}>
        <Text style={styles.descriptionCol}>{item?.name}</Text>
        <Text style={styles.priceCol}>{item?.price}</Text>
        <Text style={styles.taxCol}>{item?.taxValue}</Text>
        <Text style={styles.qtyCol}>{item?.quantity}</Text>
        <Text style={styles.subtotalCol}>
          {item?.quantity * item?.price + item?.taxValue * item?.quantity}
        </Text>
      </View>
    ))}

    <View style={styles.summaryRow}>
      <View style={styles.dueBox}>
        <View style={styles.amountRow}>
          <Text style={styles.normalText}>Previous Due :</Text>
          <Image source={rupeeWhite} style={styles.dueRupeeIcon} />
          <Text style={styles.normalText}>{data?.coveredDueAmount || 0}</Text>
        </View>
        <Text style={styles.normalText}>
          Order ID : {data?.previousOrderId || "N/A"}
        </Text>
      </View>

      <View style={styles.subtotalBox}>
        <View style={styles.amountRow}>
          <Text style={styles.subtotalText}>Previous Due :</Text>
          <Image source={rupee} style={styles.rupeeIcon} />
          <Text style={styles.subtotalText}>{data?.coveredDueAmount || 0}</Text>
        </View>
        <View style={styles.amountRow}>
          <Text style={styles.subtotalText}>Subtotal :</Text>
          <Image source={rupee} style={styles.rupeeIcon} />
          <Text style={styles.subtotalText}>{data?.subtotal}</Text>
        </View>

        <View style={styles.totalBox}>
          <Text style={styles.totalText}>Total :</Text>
          <Image source={rupeeWhite} style={styles.rupeeIcon} />
          <Text style={styles.totalText}>
            {data?.subtotal + (data?.coveredDueAmount || 0)}
          </Text>
        </View>
      </View>
    </View>

    <View style={styles.footerSection}>
      <View style={styles.contactInfo}>
        <Text style={styles.thankYou}>THANKS FOR YOUR ORDER</Text>
        <Text style={[styles.bold, { marginTop: 3 }]}>
          FOR ANY QUERY, CONTACT
        </Text>
        <Text style={[styles.text, { marginTop: 2 }]}>
          +91 7276514160, 9765254648
        </Text>
        <Text style={styles.text}>contact@onmarket.app</Text>
      </View>
      <View style={styles.note}>
        <Text>This is system generated receipt.</Text>
        <Text>All disputes are subject to chhatrapati</Text>
        <Text>sambhajinagar jurisdiction only</Text>
      </View>
    </View>
<View style={{position:"relative"}}>
    <Image src="/mh-20/logo.png"  style={styles.goodkingLogoFooter} />
    <Text style={styles.addressFooter}>
      Address - LIG 390, Mhada, M’Wadi, Cidco, Chhatrapati Sambhajinagar,
      {"\n"}Maharashtra, India - 431001
    </Text>
    </View>
  </View>
);

const TwoInvoice = ({ data }: any) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      {/* Owner's Copy */}
      <InvoiceContent data={data} copyType="owner" />
      {/* Supplier's Copy */}
      <InvoiceContent data={data} copyType="supplier" />
    </Page>
  </Document>
);

export default TwoInvoice;