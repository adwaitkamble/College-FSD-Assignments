import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const syncDataToExcel = async (modelName, data) => {
  try {
    const folderPath = path.join(__dirname, '..', 'excel-sheets');
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const filePath = path.join(folderPath, `${modelName.toLowerCase()}s.xlsx`);
    const workbook = new ExcelJS.Workbook();
    let worksheet;

    if (fs.existsSync(filePath)) {
      await workbook.xlsx.readFile(filePath);
      worksheet = workbook.getWorksheet(1);
    } else {
      worksheet = workbook.addWorksheet('Sheet 1');
      // Set headers based on keys of the first data object
      const keys = Object.keys(data);
      worksheet.columns = keys.map((key) => ({ header: key.toUpperCase(), key, width: 25 }));
    }

    // Append row
    worksheet.addRow(data);

    await workbook.xlsx.writeFile(filePath);
    console.log(`[ExcelSync] Appended data to ${modelName.toLowerCase()}s.xlsx`);
  } catch (error) {
    console.error(`[ExcelSync] Error syncing data to Excel:`, error.message);
  }
};
