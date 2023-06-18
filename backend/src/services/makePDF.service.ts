import {PDFDocument} from 'pdf-lib'
import fs from 'fs'

async function mergePDFFiles(filePaths: string[], outputFilePath:string) {
    const mergedPdf = await PDFDocument.create();

    for (const filePath of filePaths) {
      const pdfBytes = await fs.promises.readFile(filePath);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }
  
    const mergedPdfBytes = await mergedPdf.save();
  
    await fs.promises.writeFile(outputFilePath, mergedPdfBytes);
    console.log('PDF files merged successfully!');
}

export {mergePDFFiles}