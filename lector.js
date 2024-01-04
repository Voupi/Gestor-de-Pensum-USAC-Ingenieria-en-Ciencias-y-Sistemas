const XLSX = require('xlsx');
const path = require('path');

// Ruta al archivo Excel
const filePath = path.join(__dirname, 'Pensum Ingenieria Usac.xlsx');

// Carga el libro de Excel
const workbook = XLSX.readFile(filePath);

// Selecciona la primera hoja del libro
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convierte los datos de la hoja en un objeto JSON
const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
//console.log(data)
// Mapea los encabezados a claves sin comillas
const headers = data[0];
//console.log(headers)
const result = data.slice(1).map(row => {
    //console.log(row)
    const obj = {};
    headers.forEach((header, index) => {
        console.log(header)
        header = header.replace(/'/g, '')
        obj[String(header)] = row[index];
        console.log(obj)
    });
    //console.log(obj)
    return obj;
});

// Muestra los datos
//console.log(result);