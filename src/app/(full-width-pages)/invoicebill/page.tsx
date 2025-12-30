"use client";

export default function InvoiceBillPage() {
  return (
    <div className="outer">
      <div className="invoice">

        {/* Header */}
        <div className="po-title">Purchase Order</div>
        <div className="company-name">SHREE HANUMANT TRADER</div>
        <div className="company-address">
          E-138 Shiva Kunj RAILWAY HOUSING SOCIETY ARERA COLONYbhopal -462039
        </div>
        <div className="company-address">
          TEL NO:-9028215279 , GSTIN:- 23AMPS9454P4ZQ , PAN:- AMPS9454P
        </div>

        {/* Purchase + Invoice details */}
        <table className="info-table">
          <tbody>
            <tr>
              <td className="left">
                <b>Purchase From:</b><br />
                Krishari Business Solutions<br />
                1st Floor, Flat No A118,Yuvaka Apartment, Revenue<br />
                Layout, Bengaluru Urban, Karnataka - 560068<br />
                GSTIN: 29CPYS1176F1ZU
              </td>
              <td className="right">
                <b>Invoice Details:</b><br />
                PO.NO:-020<br /><br />
                PO.DATE:-11-12-2025
              </td>
            </tr>
          </tbody>
        </table>

        {/* Main Table */}
        <table className="main-table">
          <thead>
            <tr>
              <th>SR.<br />NO</th>
              <th>Item Name</th>
              <th>HSN/<br />SAC</th>
              <th>GST (%)</th>
              <th>Qty (MT)</th>
              <th>Rate(Rs)<br />KG</th>
              <th>GST/IG<br />ST</th>
              <th>Total(INR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>SUGER rejected</td>
              <td>1701</td>
              <td>5%</td>
              <td>10,000</td>
              <td>36.00</td>
              <td className="small-text">INCLUDING</td>
              <td>360,000,000.00</td>
            </tr>

            {/* Empty rows exactly like image */}
            {Array.from({ length: 11 }).map((_, i) => (
              <tr key={i}>
                <td>&nbsp;</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))}

            <tr>
              <td colSpan={7} className="left"><b>TOTAL</b></td>
              <td></td>
            </tr>
          </tbody>
        </table>

        {/* Totals */}
        <table className="totals-table">
          <tbody>
            <tr>
              <td className="right"><b>TAX VALUE:-</b></td>
              <td className="right">360,000,000.00</td>
            </tr>
            <tr>
              <td className="right"><b>TOTAL:-</b></td>
              <td className="right blue-text"><b>360,000,000.00</b></td>
            </tr>
          </tbody>
        </table>

        {/* Words */}
        <div className="words">
          <span className="blue-text">
            TOTAL (IN WORDS) :- THREE HUNDRED SIXTY MILLION And zero Only
          </span>
        </div>

        {/* Tax breakup */}
        <table className="tax-table">
          <thead>
            <tr>
              <th>SN</th>
              <th>HSN/SAC</th>
              <th>TAXABLE AMOUNT</th>
              <th>GST%</th>
              <th>Total Tax</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>1701</td>
              <td>360,000,000.00</td>
              <td>0</td>
              <td></td>
            </tr>
          </tbody>
        </table>

        {/* Terms */}
        <div className="terms">
          TERMS AND CONDITIONS:-Payment terms - 100% LR payment
        </div>
        <div className="terms">
          Sugar will be free-flowing and without moisture.”
        </div>

        {/* Signature */}
        <div className="signature">
          Authorized Signatory<br /><br />
          <b>For SHREE HANUMANT TRADER</b>
        </div>

      </div>

      {/* CSS */}
      <style jsx>{`
        .outer {
          padding: 20px;
          background: #fff;
          font-family: Arial, Helvetica, sans-serif;
        }

        .invoice {
          width: 820px;
          margin: auto;
          border: 2px solid #000;
          padding: 6px;
        }

        .po-title {
          text-align: center;
          font-weight: bold;
          font-size: 14px;
          border-bottom: 1px solid #000;
        }

        .company-name {
          text-align: center;
          font-size: 22px;
          font-weight: bold;
          color: #2f5fa3;
          border-bottom: 1px solid #000;
          padding: 4px 0;
        }

        .company-address {
          text-align: center;
          font-size: 12px;
          color: #2f5fa3;
          border-bottom: 1px solid #000;
          padding: 2px 0;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
        }

        th, td {
          border: 1px solid #000;
          padding: 4px;
          text-align: center;
        }

        .info-table td {
          vertical-align: top;
          text-align: left;
          padding: 6px;
        }

        .left { text-align: left; }
        .right { text-align: right; }

        .small-text {
          font-size: 10px;
        }

        .totals-table td {
          border: none;
          padding: 6px;
        }

        .blue-text {
          color: #2f5fa3;
        }

        .words {
          border-top: 1px solid #000;
          border-bottom: 1px solid #000;
          padding: 6px;
          font-size: 12px;
        }

        .tax-table {
          margin-top: 6px;
        }

        .terms {
          font-size: 12px;
          margin-top: 4px;
        }

        .signature {
          text-align: right;
          margin-top: 40px;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}
