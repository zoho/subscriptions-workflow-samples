/*
**  Google Script function to update the current status for the customer.
**  Pass the customer ID & current month reading as a query parameter to this function's web app url.
*/

function doGet(e) 
{
  // Provide the spreadhsheet URL between the quotes.
  var spreadSheet = SpreadsheetApp.openByUrl("");

  // Provide the name of the current working sheet.
  var sheet       = spreadSheet.getSheetByName("");
  
  return setStatus(sheet, e.parameter.id, e.parameter.cmr);
  
}

function setStatus(sheet, id, cmr)
{

  var json = {};
  var code = -1;

 // Get all the data from the sheet
 var data = sheet.getDataRange().getValues();

 // Get the headers and get the index of the ldap and the approval status
 // using the names you use in the headers
 var headers     = data[0];
 var idIndex     = headers.indexOf('ID'); 
 var statusIndex = headers.indexOf('Status');
 var lmrIndex    = headers.indexOf('Last Recorded Reading');

 var sheetRow = -1;

 for( var i = 1 ; i < data.length; i++ )
 {
   var row = data[i];
   
   if(row[idIndex] == id)
   { 
     sheetRow = i +1;
     code = 0;
     break;
   }
 }
  
 ++statusIndex;
 ++lmrIndex;
  
 //Set the value
  if(sheetRow != -1)
  {
     sheet.getRange(sheetRow, statusIndex).setValue('Updated'); 
     sheet.getRange(sheetRow, lmrIndex).setValue(cmr); 
  }
  
  json.code = code;
  
  var result = JSON.stringify(json);
  
  return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
  
}
