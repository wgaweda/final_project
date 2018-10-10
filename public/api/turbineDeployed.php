
<?php
require '../../app/common.php';

//FETCH ALL
$turbinesDep = TurbDeployed::fetchAll();

$json = json_encode($turbinesDep, JSON_PRETTY_PRINT);

header('Content-Type: application/json');
echo $json;
