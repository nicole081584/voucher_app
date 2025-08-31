// components/createVoucherDwonload.ts

/**  This is a function to create a html version of the voucher to download
* @param voucher    The infortamtion of the voucher to be displayed
* @param grCodeUrl  Information of the QRCode to be displayed
* @returns html document of the voucher
* */

export interface VoucherData {
  title: string,
  firstName: string,
  lastName:string,
  email: string;
  phoneNumber: string;
  value: number;
  date: string;
  voucherNumber: string;
}

export function createVoucherDownload(voucher: VoucherData, qrCodeUrl: string): string {
  return `
  <html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
   
    
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      max-height: 100%;
      font-family: 'Helvetica', sans-serif;
      background-image: url('https://example.com/voucher-background.jpg'); /* Replace with your background image URL */
      background-size: cover;
      color: #ffffff;
    }
    .voucher {
      background-color: transparent;
      padding: 30px;
      border-radius: 10px;
      page-break-inside: avoid;
      text-align: center;
    }
    h1 {
      font-size: 45px;
      text-align: center;
      color: #560324;
      margin-bottom: 20px;
      margin-top: 75px;
    }
    h2 {
      font-size: 35px;
      text-align: center;
      color: #560324;
      margin-bottom: 20px;
    }
    .qr {
      text-align: center;
      background-color: white;
      padding: 20px;    /* padding inside white box */
      margin: 20px auto; /* vertical margin + horizontal auto centering */
      display: inline-block; /* shrink-wrap the QR code */
      border-radius: 8px; /* optional rounded corners */
    }
    .regular {
      font-size: 25px;
      text-align: center;
      color: #560324; 
      margin-bottom: 20px; 
    }
    .small {
      text-align: center;
      font-size: 20px;
      color: #000000;
      margin-bottom: 20px;
    }
  </style>

</head>
<body>
  <div class="voucher">
    <h1>Gift Voucher</h1>
    <h2><strong>Value:</strong> £${voucher.value}</h2>
    <p class ="regular"><strong>QR Code</strong></p>
    <div class="qr">
      <img src="${qrCodeUrl}" width="192" height="192" />
    </div>
    <p class ="regular"><strong>Voucher Number:</strong> ${voucher.voucherNumber}</p>
    <p class ="regular"><strong>Date of issue:</strong> ${voucher.date}</p>
    <p class="small">Vouchers are valid for 1 year from the date of issue.<br>
                    We accept no responsibility for lost or misplaced vouchers.<br>
                    These cannot be replaced or redeemed.</p>
  </div>
</body>
</html>
  `;
}
