import React from "react";
import { Page, Text, Image, Document } from "@react-pdf/renderer";

export const PdfLayout = () => {
  return (
    <Document>
      <Page>
        <Text>Test</Text>
        <Text
          render={({ pageNumber, totalPages }) => `${pageNumber}/${totalPages}`}
        >
          Test
        </Text>
      </Page>
    </Document>
  );
};
