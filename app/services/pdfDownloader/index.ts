import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";

interface IWidgetType {
  id: string;
  range: string;
  widgetType: string;
}

type IPdfDwldCartList<K extends string> = {
  [k in K]: IWidgetType;
};

const formatDate = (date?: Date) => {
  return moment(date || new Date()).format("MM-DD-YYYY");
};

const handleTables = (pdf: any, id: string, startY: number) => {
  autoTable(pdf, {
    html: `#${id}`,
    theme: "grid",
    startY: startY,

    styles: { halign: "center", cellPadding: 5, overflow: "linebreak" },
    showHead: "everyPage",
    headStyles: {
      valign: "middle",
      cellPadding: 2,
    },
  });
};

async function creatPdf({
  pdf,
  el,
  padding,
  top,
  elWidth,
  elHeight,
  imageName,
}: {
  pdf: jsPDF;
  el: HTMLElement;
  padding: number;
  top: number;
  elWidth: number;
  elHeight: number;
  imageName: string;
}) {
  const imgData = await htmlToImage.toPng(el);

  pdf.setLineWidth(0.5);

  pdf.rect(padding, top, elWidth, elHeight, "S");

  pdf.addImage(imgData, "PNG", padding, top, elWidth, elHeight, imageName);
}

const getElemennt = (id: string) => {
  return document.getElementById(id);
};

const pdfSetHeader = (pdf: any, startY: number) => {
  pdf.setFontSize(20);
  pdf.setFillColor("#4C9900");
  pdf.rect(0, 0, 600, startY + 60, "F");
  pdf.setTextColor("#FFF");

  const startX =
    (pdf.internal.pageSize.getWidth() -
      pdf.getTextWidth("Test Automation Report")) /
    2;

  pdf.text("Test Automation Report", startX, startY);
  // pdf.setTextColor(64, 64, 64);
};

const pdfSetSubHeader = (pdf: any, reportDatetext: string, startY: number) => {
  let textX =
    (pdf.internal.pageSize.getWidth() -
      pdf.getTextWidth("Test Automation Report")) /
    2;
  pdf.setFontSize(12);
  pdf.setTextColor("#F7F6F6");
  pdf.text(reportDatetext, textX + 30, startY);
  pdf.setTextColor("#1C1C1C");
};

const addNewPage = (
  pdf: any,
  top: number,
  elHeight: number,
  pageHeight: number
) => {
  if (top + elHeight > pageHeight) {
    pdf.addPage();
    return 20;
  } else {
    return top;
  }
};

export const downloadPdfHandler = async (
  pdfDwldCart: IPdfDwldCartList<string>
) => {
  // const pdf = new jsPDF("l", "mm", [305, 250]);
  const widgetList = Object.values(pdfDwldCart);
  const pdf = new jsPDF("p", "pt", "A4");

  let padding = 40,
    startY = 60;

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  pdfSetHeader(pdf, startY);
  pdfSetSubHeader(pdf, widgetList[0].range, startY + 25);

  let top = startY + 80;

  let twoDimWidgetList: IWidgetType[][] = get2DWidgetList(widgetList);

  let olWidth = 0;
  let olHeight = 0;

  for (let i = 0; i < twoDimWidgetList.length; i++) {
    const innerList = twoDimWidgetList[i];

    for (let j = 0; j < innerList.length; j++) {
      const el = getElemennt(innerList[j].id);

      if (!el) continue;

      let elHeight = el.offsetHeight - 0.05 * el.offsetHeight;
      let elWidth = el.offsetWidth - 0.05 * el.offsetWidth;

      if (elWidth > pageWidth) {
        const ratio = pageWidth / elWidth;
        elHeight = elHeight * ratio - padding;
        elWidth = elWidth * ratio - padding;
      }

      padding =
        innerList.length === 2 && j === 1 ? olWidth + padding + 20 : padding;
      top = innerList.length === 2 && j === 1 ? top - olHeight - 20 : top;

      top = addNewPage(pdf, top, elHeight, pageHeight);

      if (innerList[j].widgetType.startsWith("table_")) {
        await handleTables(pdf, innerList[j].id, top);
      } else {
        await creatPdf({
          pdf,
          el,
          padding,
          top,
          elWidth,
          elHeight,
          imageName: `image${i}${j}`,
        });
      }

      if (innerList.length === 2 && j === 0) {
        olHeight = elHeight;
        olWidth = elWidth;
      } else if (innerList.length === 2 && j === 1) {
        olHeight = 0;
        olWidth = 0;
      }
      padding = 40;
      top += elHeight + 20;
    }
  }

  pdf.save(`Report_${formatDate()}}.pdf`);
};

const get2DWidgetList = (widgetList: IWidgetType[]) => {
  let result: IWidgetType[][] = [];
  let innerList: IWidgetType[] = [];

  for (let i = 0; i < widgetList.length; i++) {
    innerList.push(widgetList[i]);

    const spliceValue = widgetList[i].widgetType.startsWith("table_") ? 1 : 2;
    if (
      innerList.length === 2 ||
      widgetList[i].widgetType.startsWith("table_")
    ) {
      if (innerList.length === 2 && spliceValue === 1) {
        result.push(innerList.splice(0, spliceValue));
        result.push(innerList.splice(0, spliceValue));
      } else {
        result.push(innerList.splice(0, spliceValue));
      }
    }
  }

  if (innerList.length) result.push(innerList.splice(0, innerList.length));
  console.log("resulkts", result);
  return result;
};
