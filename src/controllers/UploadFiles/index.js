import * as excel from 'xlsx/xlsx.mjs';

export default function open(uri) {
  try {
    const excelSheet = excel.readFile(uri);
    // gets first sheetname from readFile as will always be first sheet
    const sheetName = excelSheet.SheetNames[0];
    const data = excel.utils.sheet_to_json(excelSheet.Sheets[sheetName]);
    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(new Error(`🚩 Unable to parse the file ${uri} ${e}`));
  }
}
