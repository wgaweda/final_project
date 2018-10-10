
<?php
require '../../app/common.php';

//FETCH ALL
$clientnotes = Notes::fetchAll();

$json = json_encode($clientnotes, JSON_PRETTY_PRINT);

header('Content-Type: application/json');
echo $json;
