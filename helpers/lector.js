const XLSX = require('xlsx');
const path = require('path');
const leerExcel = ()  =>{
    // Ruta al archivo Excel
    const filePath = path.join(__dirname,'../files/Pensum Ingenieria Usac.xlsx');
    const workbook = XLSX.readFile(filePath); // Carga el libro de Excel
    
    // Selecciona la primera hoja del libro
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    
    // Convierte los datos de la hoja en un objeto JSON
    const data = XLSX.utils.sheet_to_json(sheet);

    //console.log(data);
    return data;
}
module.exports={
    leerExcel
}