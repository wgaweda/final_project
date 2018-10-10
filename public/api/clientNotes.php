<?php
require '../../app/common.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'clientNotes.php';
  exit;
}

//FETCH ALL
$clientnotes = Notes::fetchAll();

$json = json_encode($clientnotes, JSON_PRETTY_PRINT);

header('Content-Type: application/json');
echo $json;
