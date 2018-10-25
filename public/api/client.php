
<?php
require '../../app/common.php';


//FETCH ALL
$comments = Client::fetchAll();

$json = json_encode($comments, JSON_PRETTY_PRINT);

header('Content-Type: application/json');

echo $json;

$clientId = intval($_GET['clientId'] ?? 0);

if ($clientId < 1) {
  throw new Exception('Invalid Client ID in URL');
}

$client = Client::fetchByClientId($clientId);

$json = json_encode($client, JSON_PRETTY_PRINT);

header('Content-Type: application/json');
echo $json;
