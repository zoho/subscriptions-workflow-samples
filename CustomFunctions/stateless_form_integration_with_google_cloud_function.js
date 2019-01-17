const request    = require('request');

/**
 * Responds to an HTTP request using data from the request body.
 * Gets the API Hosted Page URL & redirects to the same URL in the browser.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.helloWorld = (req, res) => 
{

  /*
  ** Get the data for the custom fields from the req Object.
  */
  var eyeColorJSON  = JSON.parse(req.body.eyecolor);
  var eyeColor      = eyeColorJSON.widget_metadata.value[0]["name"];

  var skinColorJSON = JSON.parse(req.body.skintone);
  var skinColor     = skinColorJSON.widget_metadata.value[0]["name"];
  
  var fragranceJSON = JSON.parse(req.body.fragrance);
  var fragrance     = fragranceJSON.widget_metadata.value[0]["name"];
  
  /*
  ** Paste your authtoken and organizationID in the respective variables.
  */
  
  var authtoken		   = "";
  var organizationID = "";
  
  /*
  * Construct the custom fields array list. Please get the customfield_id value from Zoho Subscriptions 
  * and paste it between the quotes.
  */
  var customFields = [];
  customFields.push({customfield_id: "", value: eyeColor});
  customFields.push({customfield_id: "", value: skinColor});
  customFields.push({customfield_id: "", value: fragrance});
  customFields.push({customfield_id: "", value: req.body.specialRequirement});
  customFields.push({customfield_id: "", value: req.body.skinconcern});
  
  /*
  * Construct the JSON data. Paste your planCode in the plan_code key.
  */
  var requestData = {
    
  plan: {
      plan_code: "",
      quantity: 1,
      billing_cycles: -1
  }, 
    custom_fields: customFields
};

/*
** Hit the Zoho Subscriptions API and retrieve the hosted page URL.
*/
  var url = "https://subscriptions.zoho.com/api/v1/hostedpages/newsubscription?authtoken="+authtoken+"&organization_id="+organizationID;
  
  request(url,
        { method: "POST", json: true, body: requestData },
        function(err, response, body) {
          
        // If statusCode is 201, the API call is successful. Else handle the error case according to your needs.
  			if(response.statusCode == 201)
  			{
    			res.redirect(body.hostedpage.url);
  			}
  });
};
