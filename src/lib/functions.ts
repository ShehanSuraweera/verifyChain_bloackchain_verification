import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import QRCode from "qrcode";

export const generatePDFCertificate = async (data: {
  fileName: string;
  title: string;
  documentType: string;
  fileHash: string;
  txHash: string;
  timestamp: string;
  walletHash: string;
  explorerUrl: string;
}) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 size

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Color palette
  const primaryColor = rgb(0.2, 0.4, 0.8); // Deep blue
  const secondaryColor = rgb(0.8, 0.4, 0.2); // Orange
  const accentColor = rgb(0.3, 0.6, 0.3); // Green
  const darkColor = rgb(0.1, 0.1, 0.1);
  const lightColor = rgb(0.4, 0.4, 0.4);

  const margin = 50;
  let currentY = 770;

  const drawLine = (y: number, color = rgb(0.7, 0.7, 0.7)) => {
    page.drawLine({
      start: { x: margin, y },
      end: { x: 595 - margin, y },
      thickness: 1,
      color,
    });
  };

  // Application name at top right
  page.drawText("VerifyChain", {
    x: 595 - margin - 100,
    y: 820,
    size: 16,
    font: fontBold,
    color: secondaryColor,
  });

  // Header with gradient effect
  const headerText = "CERTIFICATE OF AUTHENTICITY";
  const headerWidth = fontBold.widthOfTextAtSize(headerText, 26);
  page.drawText(headerText, {
    x: (page.getWidth() - headerWidth) / 2,
    y: currentY,
    size: 26,
    font: fontBold,
    color: primaryColor,
  });

  currentY -= 20;
  drawLine(currentY, secondaryColor);
  currentY -= 40;

  // Description with colored border
  const introText =
    "This certificate affirms the authenticity and blockchain registration of the following document:";
  const introLines = wrapText(introText, font, 12, 495);

  for (const line of introLines) {
    const lineWidth = font.widthOfTextAtSize(line, 12);
    page.drawText(line, {
      x: (page.getWidth() - lineWidth) / 2,
      y: currentY,
      size: 12,
      font,
      color: darkColor,
    });
    currentY -= 16;
  }

  currentY -= 30;

  const infoRows = [
    { label: "Document Title", value: data.title, color: primaryColor },
    { label: "File Name", value: data.fileName, color: primaryColor },
    { label: "Document Type", value: data.documentType, color: primaryColor },
    {
      label: "Registration Date",
      value: new Date(data.timestamp).toLocaleString(),
      color: primaryColor,
    },
    {
      label: "File Hash (SHA-256)",
      value: data.fileHash,
      small: true,
      color: accentColor,
    },
    {
      label: "Transaction Hash",
      value: data.txHash,
      small: true,
      color: accentColor,
    },
    {
      label: "Wallet Hash (SHA-256)",
      value: data.walletHash,
      small: true,
      color: accentColor,
    },
  ];

  for (const item of infoRows) {
    const fontSize = item.small ? 9 : 12;
    const lineHeight = fontSize + 4;
    const labelColor = item.color || primaryColor;
    const valueColor = item.small ? lightColor : darkColor;

    // Draw the centered label with color
    const labelWidth = fontBold.widthOfTextAtSize(item.label, 12);
    page.drawText(item.label, {
      x: (page.getWidth() - labelWidth) / 2,
      y: currentY,
      size: 12,
      font: fontBold,
      color: labelColor,
    });

    currentY -= 16;

    // Break long value into multiple centered lines
    const valueLines = wrapText(item.value, font, fontSize, 495);

    for (const line of valueLines) {
      const lineWidth = font.widthOfTextAtSize(line, fontSize);
      page.drawText(line, {
        x: (page.getWidth() - lineWidth) / 2,
        y: currentY,
        size: fontSize,
        font,
        color: valueColor,
      });
      currentY -= lineHeight;
    }

    currentY -= 10;
  }

  currentY -= 10;
  drawLine(currentY, secondaryColor);
  currentY -= 150;

  // QR Code with colored border
  const qrCodeData = `${data.explorerUrl}\n\nDocument: ${data.title}\nFile: ${data.fileName}\nHash: ${data.fileHash}`;
  const qrCodeImage = await QRCode.toDataURL(qrCodeData, { width: 150 });
  const qrCodeBytes = await fetch(qrCodeImage).then((res) => res.arrayBuffer());
  const qrCodeImageEmbed = await pdfDoc.embedPng(qrCodeBytes);

  const qrCodeWidth = 120;
  const qrCodeHeight = 120;
  const qrCodeX = (page.getWidth() - qrCodeWidth) / 2;
  const qrCodeY = 120;

  // Draw border around QR code
  page.drawRectangle({
    x: qrCodeX - 10,
    y: qrCodeY - 10,
    width: qrCodeWidth + 20,
    height: qrCodeHeight + 20,
    borderWidth: 2,
    borderColor: secondaryColor,
    borderDashArray: [5, 3],
  });

  page.drawImage(qrCodeImageEmbed, {
    x: qrCodeX,
    y: qrCodeY,
    width: qrCodeWidth,
    height: qrCodeHeight,
  });

  // Centered QR code labels with colors
  const scanText = "SCAN TO VERIFY ON VERIFYCHAIN";
  const scanWidth = fontBold.widthOfTextAtSize(scanText, 10);
  page.drawText(scanText, {
    x: (page.getWidth() - scanWidth) / 2,
    y: qrCodeY - 25,
    size: 10,
    font: fontBold,
    color: secondaryColor,
  });

  const verifyText = "Blockchain Verification Certificate";
  const verifyWidth = font.widthOfTextAtSize(verifyText, 8);
  page.drawText(verifyText, {
    x: (page.getWidth() - verifyWidth) / 2,
    y: qrCodeY - 40,
    size: 8,
    font,
    color: lightColor,
  });

  // Footer with VerifyChain branding
  page.drawText("Secured by VerifyChain", {
    x:
      (page.getWidth() - font.widthOfTextAtSize("Secured by VerifyChain", 10)) /
      2,
    y: 50,
    size: 10,
    font: fontBold,
    color: secondaryColor,
  });

  // Decorative border
  page.drawRectangle({
    x: 25,
    y: 25,
    width: 545,
    height: 792,
    borderWidth: 2,
    borderColor: primaryColor,
    borderDashArray: [10, 5],
  });

  return await pdfDoc.save();
};

// Helper function to wrap text
function wrapText(
  text: string,
  font: import("pdf-lib").PDFFont,
  fontSize: number,
  maxWidth: number
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = font.widthOfTextAtSize(`${currentLine} ${word}`, fontSize);
    if (width <= maxWidth) {
      currentLine += ` ${word}`;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}
