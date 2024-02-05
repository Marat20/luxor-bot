import { Workbook, Worksheet } from 'exceljs';

export const writeToExcel = async (
  arr: Set<string>,
  workbook: Workbook,
  worksheet: Worksheet,
) => {
  arr.forEach((row) => {
    worksheet.addRow([row]);
  });

  await workbook.xlsx.writeFile('./myFile.xlsx');

  await workbook.removeWorksheet(worksheet.id);
};
