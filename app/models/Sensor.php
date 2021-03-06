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

  public static function fetchSensorById (int $siteId) {

    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    //2. run a query
    $sql = 'SELECT * from sensor, sensorDeployed, turbineDeployed
    WHERE sensor.sensorId = sensorDeployed.sensorDeployedId
    AND sensorDeployed.turbineDeployedId = turbineDeployed.turbineDeployedId
    AND turbineDeployed.siteId = ?';

    $statement = $db->prepare($sql);
    //3. read the results
    $success = $statement->execute(
      [$siteId]
    );
    //4. handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theSensor = new Sensor($row);
      array_push($arr, $theSensor);
    }
    return $arr;
  }
}
