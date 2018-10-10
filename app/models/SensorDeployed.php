<?php

class Deployed

{
  public $sensorDeployedId;
  public $sensorId;
  public $turbineDeployedId;
  public $serialNumber;
  public $deployedDate;

  public function __construct($data) {
  $this->sensorDeployedId = isset($data['sensorDeployedId']) ? intval($data['sensorDeployedId']) : null;
  $this->sensorId = $data['sensorId'];
  $this->turbineDeployedId = $data['turbineDeployedId'];
  $this->serialNumber = $data['serialNumber'];
  $this->deployedDate = $data['deployedDate'];
}

  public static function fetchAll() {

    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    //2. run a query
    $sql = 'SELECT * FROM sensorDeployed';
    $statement = $db->prepare($sql);
    //3. read the results
    $success = $statement->execute();
    //4. handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theSensorDeployed = new Deployed($row);
      array_push($arr, $theSensorDeployed);
    }
    return $arr;
  }

  public function create() {

  $db = new PDO(DB_SERVER, DB_USER, DB_PW);

  $sql = 'INSERT sensorDeployed (sensorDeployedId, sensorId, turbineDeployedId, serialNumber, deployedDate)
          Values (?, ?, ?, ?, ?)';

  $statement = $db->prepare($sql);
  $success = $statement->execute([
    $this->sensorDeployedId,
    $this->sensorId,
    $this->turbineDeployedId,
    $this->serialNumber,
    $this->deployedDate

  ]);

  $this->sensorDeployedId = $db->lastInsertId();
}
}
