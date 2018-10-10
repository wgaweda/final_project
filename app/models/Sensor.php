<?php

class Sensor

{
  public $sensorId;
  public $sensorName;
  public $sensorDescription;
  public $manufacturer;
  public $totalLifeExpentancyHours;

  public function __construct($data) {
  $this->sensorId = isset($data['sensorId']) ? intval($data['sensorId']) : null;
  $this->sensorName = $data['sensorName'];
  $this->sensorDescription = $data['sensorDescription'];
  $this->manufacturer = $data['manufacturer'];
  $this->totalLifeExpentancyHours = $data['totalLifeExpentancyHours'];

}

  public static function fetchAll() {

    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    //2. run a query
    $sql = 'SELECT * FROM sensor';
    $statement = $db->prepare($sql);
    //3. read the results
    $success = $statement->execute();
    //4. handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theSensor = new Sensor($row);
      array_push($arr, $theSensor);
    }
    return $arr;
  }
}
