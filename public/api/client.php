
<?php
require '../../app/common.php';

//POST function

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'clientPost.php';
  exit;
}

//FETCH ALL
$comments = Client::fetchAll();

$json = json_encode($comments, JSON_PRETTY_PRINT);

header('Content-Type: application/json');
echo $json;
