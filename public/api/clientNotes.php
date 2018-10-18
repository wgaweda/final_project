<?php

require '../../app/common.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'clientNotesPost.php';
  exit;
}

$clientId = intval($_GET['clientId'] ?? 0);

if ($clientId < 1) {
  throw new Exception('Invalid Project ID in URL');
}

//FETCH ALL
$comments = Notes::fetchNotesByClientId($clientId);

$json = json_encode($comments, JSON_PRETTY_PRINT);

header('Content-Type: application/json');
echo $json;
