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
import rupeeGreen from "../../../assets/rupee-green.png";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 10,
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#000000",
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
    fontSize: 18,
    color: "#F58220",
    fontWeight: "bold",
  },
  invoiceTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  invoiceDetails: {
    textAlign: "right",
    fontSize: 10,
    color: "#fff",
  },
  section: {
    marginBottom: 15,
  },
  subHeader: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#F58220",
  },
  text: {
    marginBottom: 3,
    color: "#555555",
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
    color: "#333333",
  },
  paymentMethod: {
    textAlign: "right",
    marginBottom: 10,
    fontSize: 10,
    fontWeight: "bold",
    color: "#555555",
  },
  customerDetails: {
    width: "50%",
  },
  accountDetails: {
    width: "50%",
    marginLeft: 20,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailsColumn: {
    width: "48%",
  },
  qrCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  qrCode: {
    width: 120,
    height: 120,
    marginRight: 10,
  },
  verifiedText: {
    fontSize: 10,
    color: "#4CAF50",
    fontWeight: "bold",
  },
  verifiedSubText: {
    fontSize: 8,
    color: "#777777",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#000000",
    color: "#FFFFFF",
    fontWeight: "bold",
    padding: 5,
    marginTop: 7,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#EEEEEE",
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  descriptionCol: {
    width: "45%",
    paddingLeft: 5,
  },
  priceCol: {
    width: "18%",
    textAlign: "center",
  },
  qtyCol: {
    width: "18%",
    textAlign: "center",
  },
  subtotalCol: {
    width: "19%",
    textAlign: "center",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 10,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },

  subtotalBox: {
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 9,
  },

  dueBox: {
    backgroundColor: "#000000",
    padding: 5,
    borderRadius: 5,
    flexDirection: "row",
    gap: 4, // if not supported, use marginBottom on children
  },

  subtotalRow: {
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: 10,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    gap: 5,
  },

  amountRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  subtotalText: {
    fontSize: 10,
    color: "#333333",
    marginHorizontal: 2,
  },

  totalBox: {
    backgroundColor: "#000000",
    padding: 5,
    borderRadius: 3,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    color: "#ffffff",
  },

  totalPaidBox: {
    backgroundColor: "#F0FDF4",
    padding: 8,
    borderRadius: 3,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    color: "#00A63E",
  },

  totalText: {
    fontWeight: 500,
    fontSize: 13,
    marginHorizontal: 2,
  },

  rupeeIcon: {
    width: 8,
    height: 8,
    resizeMode: "contain",
    marginHorizontal: 2,
  },

  normalText: {
    fontSize: 9,
    fontWeight: "semibold",
    color: "#ffffff",
    marginHorizontal: 2,
  },

  dueRupeeIcon: {
    width: 6,
    height: 6,
    resizeMode: "contain",
    marginHorizontal: 2,
  },

  footerSection: {
    marginTop: "auto", // Pushes the footer to the bottom
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  thankYou: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333333",
  },
  contactInfo: {
    width: "50%",
    textAlign: "left",
  },
  note: {
    fontSize: 8,
    color: "#777777",
    textAlign: "right",
    width: "50%",
  },
goodkingLogoFooter: {
  width: 60,
  height: 30,
  backgroundColor: "#fff",
  borderRadius: 5,
  padding: 3,
  marginBottom: 5, // instead of absolute positioning
},
addressFooter: {
  fontSize: 14,
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#000",
  paddingVertical: 5,
  paddingHorizontal: 10,
  width: "100%",
  fontWeight: "bold",
},


  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  statusLabel: {
    fontSize: 12,
    color: "#333333",
    marginRight: 5,
  },

  statusBox: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
  },

  paidBox: {
    backgroundColor: "green",
  },

  dueBox2: {
    backgroundColor: "red",
  },

  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

const Invoice = ({ data }: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.logoContainer}>
          <img src="/mh-20/logo.png" alt="Logo" />
        </View>
        <View>
          <Text style={styles.invoiceTitle}>INVOICE</Text>
          <View style={styles.invoiceDetails}>
            <Text>Invoice No: {data?.invoiceNumber}</Text>
            <Text>Invoice Date: {data?.date}</Text>
          </View>
        </View>
      </View>

      {/* Invoice To and Payment Method */}
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

      {/* Customer and Account Details */}
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
              <Text style={styles.bold}>Adress:</Text> {data?.businessAddress}
            </Text>

            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Status :</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 5,
                  paddingHorizontal: 5,
                  borderRadius: 5,
                  backgroundColor: data?.status === "Paid" ? "green" : "red",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 9,
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
                      width: 9,
                      height: 9,
                      marginLeft: 4,
                    }}
                  />
                )}
                {data?.dueAmount > 1 && (
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 9,
                      fontWeight: "bold",
                    }}
                  >
                    {data?.dueAmount}
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
              <Text style={{ fontSize: 8 }}> (5 digit is zero)</Text>
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Branch Name:</Text> Mukundwadi branch{" "}
              <Text style={{ fontSize: 8 }}>(BARB0MUKAUR)</Text>
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

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.descriptionCol}>DESCRIPTION</Text>
        <Text style={styles.priceCol}>PRICE</Text>
        <Text style={styles.priceCol}>TAX VALUE</Text>
        <Text style={styles.qtyCol}>QTY</Text>
        <Text style={styles.subtotalCol}>SUBTOTAL</Text>
      </View>

      {/* Table Rows */}
      {data?.items?.map((item: any, i: number) => (
        <View style={styles.tableRow} key={i}>
          <Text style={styles.descriptionCol}>{item?.name}</Text>
          <Text style={styles.priceCol}>{item?.price}</Text>
          <Text style={styles.priceCol}>{item?.taxValue}</Text>
          <Text style={styles.qtyCol}>{item?.quantity}</Text>
          <Text style={styles.subtotalCol}>
            {item?.quantity * item?.price + item?.taxValue * item?.quantity}
          </Text>{" "}
        </View>
      ))}

      <View style={styles.summaryRow}>
        {/* Left side: Due / Date / Order ID */}
        <View style={styles.dueBox}>
          <View style={styles.amountRow}>
            <Text style={styles.normalText}>Previous Due :</Text>
            <Image source={rupeeWhite} style={styles.dueRupeeIcon} />
            <Text style={styles.normalText}>{data?.coveredDueAmount || 0}</Text>
          </View>
          <Text style={styles.normalText}>
            Order ID : {data?.previousOrderId || "N/A"}
          </Text>
          {/* <Text style={styles.normalText}>Date : 15 July, 2023</Text> */}
        </View>

        {/* Right side: Subtotal + Total */}
        <View style={styles.subtotalBox}>
          <View style={styles.amountRow}>
            <Text style={styles.subtotalText}>Previous Due :</Text>
            <Image source={rupee} style={styles.rupeeIcon} />
            <Text style={styles.subtotalText}>
              {data?.coveredDueAmount || 0}
            </Text>
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

          <View style={styles.totalPaidBox}>
            <Text style={[styles.totalText, { color: "#00A63E" }]}>Paid :</Text>
            <Image source={rupeeGreen} style={styles.rupeeIcon} />
            <Text style={[styles.totalText, { color: "#00A63E" }]}>
              {data?.paidAmount}
            </Text>
          </View>
        </View>
      </View>

      {/* Footer Section */}
      <View style={styles.footerSection}>
        <View style={styles.contactInfo}>
          <Text style={styles.thankYou}>THANKS FOR YOUR ORDER</Text>
          <Text style={[styles.bold, { marginTop: 5 }]}>
            FOR ANY QUERY, CONTACT
          </Text>
          <Text style={[styles.text, { marginTop: 3 }]}>
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
      <View
  style={{
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  }}
>
  <Image src="/mh-20/logo.png"  style={styles.goodkingLogoFooter} />
  <Text style={styles.addressFooter}>
    Address - LIG 390, Mhada, M’Wadi, Cidco, Chhatrapati Sambhajinagar,
    {"\n"}Maharashtra, India - 431001
  </Text>
</View>

    </Page>
  </Document>
);

export default Invoice;
