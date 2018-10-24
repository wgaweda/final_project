
<?php
require '../../app/common.php';
//FETCH ALL
$sensorsDeployed = Deployed::fetchAll();
$json = json_encode($sensorsDeployed, JSON_PRETTY_PRINT);
header('Content-Type: application/json');
echo $json;
