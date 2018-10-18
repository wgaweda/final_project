
<?php
require '../../app/common.php';

$clientId = intval($_GET['clientId'] ?? 0);

if ($clientId < 1) {
  throw new Exception('Invalid Client ID in URL');
}

//FETCH ALL
$comments = Client::fetchByClientId($clientId);

$json = json_encode($comments, JSON_PRETTY_PRINT);

header('Content-Type: application/json');
echo $json;
