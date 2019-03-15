
/*
	
	* This google script is used to update salesperson to a subscription.
	* It can be used for bulk operations alongside with Google Sheets.
	
*/

function updateSalesPerson(subscriptionID, salesPersonName)
{

   //-- Paste your authtoken and organizationID in the below variables.

   var authtoken      = "";
   var organizationID = "";
  
   var headers  = {'Authorization':'Zoho-authtoken '+authtoken, 'X-com-zoho-subscriptions-organizationid' : organizationID};
   var data     = {"salesperson_name":salesPersonName};
  
   var url      = "https://subscriptions.zoho.com/api/v1/subscriptions/"+subscriptionID;
   
   var options = {
        'method'     : 'put',
        'contentType': 'application/json',
        'payload'    : JSON.stringify(data),
        'headers'    : headers,
        'muteHttpExceptions': true
      };
  
   var response = UrlFetchApp.fetch(url, options);
      
   if(response.getResponseCode() == 200)
   {
      return "Updated";
   }
   else
   {
      return "Failed to update";
   }
}
