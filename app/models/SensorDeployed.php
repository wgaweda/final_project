<?php

class Sensor

{
  public $sensorDeployedId;
  public $sensorId;
  public $turbineDeployedId;
  public $serialNumber;
  public $deployedDate;

  public function __construct($data) {
  $this->sensorDeployedId = isset($data['sensorId']) ? intval($data['sensorId']) : null;
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
      $theSensorDeployed = new Sensor($row);
      array_push($arr, $theSensorDeployed);
    }
    return $arr;
  }

  public function create() {

  $db = new PDO(DB_SERVER, DB_USER, DB_PW);

  $sql = 'INSERT sensor (sensorDeployedId, sensorId, turbineDeployedId, serialNumber, deployedDate)
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
