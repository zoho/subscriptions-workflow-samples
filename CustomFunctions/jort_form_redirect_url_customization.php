<?php

// Retrieve the data from the redirected form.
$skinMetaData  		   = $_POST['skintone'];
$eyeMetaData 		     = $_POST['eyecolor'];
$fragranceMetaData 	 = $_POST['fragrance'];
$specialRequirement  = $_POST['specialrequirements'];
$skinConcern  	     = $_POST['skinconcern'];

$eyeJson			     = json_decode($eyeMetaData, true);
$skinJson			     = json_decode($skinMetaData, true);
$fragranceJson		 = json_decode($fragranceMetaData, true);

$eye 				     = $eyeJson['widget_metadata']['value'][0]['name'];
$skin 				   = $skinJson['widget_metadata']['value'][0]['name'];
$fragrance 			 = $fragranceJson['widget_metadata']['value'][0]['name'];

// Paste your orgid, authtoken and plan code here.
$orgid 				   = ;
$authToken 			 = '';
$planCode 			 = "";

// Paste the corresponding customfield_id in the key values.
$customFields = array();
$cf1 = array("customfield_id"=> '', "value" => $eye);
$customFields[]=$cf1;
$cf2 = array("customfield_id"=> '', "value" => $skin);
$customFields[]=$cf2;
$cf3 = array("customfield_id"=> '', "value" => $specialRequirement);
$customFields[]=$cf3;
$cf4 = array("customfield_id"=> '', "value" => $fragrance);
$customFields[]=$cf4;
$cf5 = array("customfield_id"=> '', "value" => $skinConcern);
$customFields[]=$cf5;

// Construct the header array for the API request.
$headerArray = array("Content-Type: application/json;charset=UTF-8",
"X-com-zoho-subscriptions-organizationid: ".$orgid,
"Authorization: Zoho-authtoken ".$authToken
);

// Construct the json data.
$data = json_encode(array( "custom_fields"=>$customFields,
"plan"=> array
(
  "plan_code"=> $planCode,
  "quantity"=> 1,
  "billing_cycles"=> -1,
 ),));

// Hit the API request.
$url = "https://subscriptions.zoho.com/api/v1/hostedpages/newsubscription";
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0 );
curl_setopt($ch, CURLOPT_HTTPHEADER, $headerArray);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

$resp = curl_exec($ch);

$json = json_decode($resp, true);

$hpURL = $json['hostedpage'][url];

header('Location: '.$hpURL);

die;

?> 
