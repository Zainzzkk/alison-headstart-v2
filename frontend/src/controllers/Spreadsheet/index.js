import getAlisonCatalogue from '../AlisonCatalogue/get-alison-catalogue';

// call for alison catalogue data
async function getAlisonCatalogueCall() {
  // contains rows and columns for spreadsheet
  const rowsAndColumns = {
    rows: [],
    columns: [
      { field: 'id', headerName: 'ID', width: 100 },
      { field: 'name', headerName: 'Name', width: 600 },
      { field: 'category', headerName: 'Category', width: 300 },
      { field: 'type', headerName: 'Type', width: 150 },
    ],
  };
  const response = await getAlisonCatalogue();

  // maps through response and populates rows
  response.forEach((course) => {
    const courseToAdd = {
      id: course.ID,
      name: course.Name,
      category: course.Category,
      type: course.Type,
    };
    rowsAndColumns.rows.push(courseToAdd);
  });

  return rowsAndColumns;
}

// based on type, calls different functions for spreadsheet data
export default function getSpreadSheetDatafromApi(type) {
  switch (type) {
    case 'get-courses':
      return getAlisonCatalogueCall();
    default:
      console.error('no type');
      return 'no type provided';
  }
}
