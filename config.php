<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
header("Connection: keep-alive");
$clientId = '6cf911ff91bd4f0f889d07d678f866a9';
$clientSecret = '0d12c9b99e104399bf82c02f6ec902f2';
$tokens = base64_encode($clientId . ":" . $clientSecret);
$url = 'https://accounts.spotify.com/api/token';
$data = 'grant_type=client_credentials';

$additional_headers = array(
  'Authorization: Basic ' . $tokens,
  'Content-type: application/x-www-form-urlencoded'
);

$ch = curl_init($url);                                                                      
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);                                                                  
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_HTTPHEADER, $additional_headers); 

$accessToken = curl_exec($ch);
curl_close($ch);
echo $accessToken;
?>
