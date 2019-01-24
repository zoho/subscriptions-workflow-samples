/*
**  Google Script function to retrieve a row values for a particular customer.
**  Pass the customer ID as a query parameter to this function's web app url.
*/

function doGet(e) 
{
  // Provide the spreadhsheet URL between the quotes.
  var spreadsheet    = SpreadsheetApp.openByUrl("");

  // Provide the name of the current working sheet.
  var sheet = spreadsheet.getSheetByName("");
  
  return getCustomerDetails(sheet, e.parameter.id); 
}

function getCustomerDetails(sheet, id)
{
  var record = {};
  var code   = -1; // This variable will be used to identify success/failure status of this function in the json.

  
  var data = sheet.getDataRange().getValues();

 // Get the headers and get the index of ID.
 // using the names you use in the headers
 var headers     = data[0];
 var idIndex     = headers.indexOf('ID'); 

 var sheetRow    = -1;

 for( var i = 1 ; i < data.length; i++ )
 {
   var dataRow = data[i];
   
   if(dataRow[idIndex] == id)
   { 
       record['id']                      = dataRow[0];
       record['name']                    = dataRow[1];
       record['last_month_reading']      = dataRow[2];
       record['current_month_reading']   = dataRow[3];
       code = 0;
       break;
   }
 }
  
  record['code'] = code; 
 
  var result = JSON.stringify(record);
  
  return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
  
}  
