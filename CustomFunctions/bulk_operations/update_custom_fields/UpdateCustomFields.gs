
/*
	
	* This google script is used to update custom fields to a subscription.
	* It can be used for bulk operations alongside with Google Sheets.
	
*/

function updateCustomFields(subscriptionID, cfValue) 
{

   //-- Paste your authtoken and organizationID in the below variables.

   var authtoken      = "";
   var organizationID = "";
  
   var headers  = {'Authorization':'Zoho-authtoken '+authtoken, 'X-com-zoho-subscriptions-organizationid' : organizationID};
    
   //-- Paste your customfieldID in the below jsonMap. 
   var data     = {"custom_fields":[{"value":cfValue, "customfield_id":""}]};
   
   var url      = "https://subscriptions.zoho.com/api/v1/subscriptions/"+subscriptionID+"/customfields";
  
   var options = {
        'method'     : 'post',
        'contentType': 'application/json',
        'payload'    : JSON.stringify(data),
        'headers'    : headers,
        'muteHttpExceptions': true
      };
  
  var response = UrlFetchApp.fetch(url, options);
      
  if(response.getResponseCode() == 200)
  {
     return "Yes";
  }
  else
  {
     return "No";
  }
}

