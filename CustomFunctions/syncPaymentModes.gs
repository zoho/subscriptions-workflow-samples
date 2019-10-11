/*
    This is google app script which needs to be used along with the Google Sheet, to check if the payment modes are
    already configued in Zoho Subscriptions, a recurring billing software.
*/

function syncPaymentModes() 
{
  
   //-- Paste your authtoken and organization ID in the below corresponding variables.

   var authtoken      = "";
   var organizationID = "";
  
   var headers  = {'Authorization':'Zoho-authtoken '+authtoken, 'X-com-zoho-subscriptions-organizationid' : organizationID};
  
   var options = {
        'method'     : 'get',
        'contentType': 'application/json',
        'headers'    : headers,
        'muteHttpExceptions': true
      }
   
   var url = 'https://subscriptions.zoho.com/api/v1/settings/paymentmodes';
  
   var response = UrlFetchApp.fetch(url, options);
  
   if(response.getResponseCode() == 200)
   {
       var details        = JSON.parse(response.getContentText());
       var paymentModes   = details['payment_modes'];
     
       var values = SpreadsheetApp.getActiveSheet().getDataRange().getValues();
        
       for(i=1; i < values.length-1; ++i)
       {
          var updateCellIndex = i+1;
          var toUpdateCell    = "B"+ updateCellIndex ; // Column B in spreadsheet, which updates the status for each payment mode.
    
          var modeName = values[i][0]; 
          var isPresent = false;
         
          for(var j=0; j< paymentModes.length; j++)
          {
             var paymentModeName = paymentModes[j].name;
            
             // Check if the payment mode is present in the paymentModes array obtained from API request.
             if(paymentModeName == modeName)
             {
                isPresent = true;
                break;
             }
          }
          
         // Update the status for each payment mode.
         if(isPresent)
         {
            SpreadsheetApp.getActiveSheet().getRange(toUpdateCell).setValue('Yes');
         }
         else
         {
            SpreadsheetApp.getActiveSheet().getRange(toUpdateCell).setValue('No');
         }
       }
     
     showAlert();
   }

}

function showAlert() 
{
  var ui = SpreadsheetApp.getUi(); 

  var result = ui.alert(
     'Message Details',
     'Syncing the payment modes with server completed',
      ui.ButtonSet.OK);
}
