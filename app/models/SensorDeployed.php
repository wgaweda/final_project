<?php
class Deployed
{
  public $sensorDeployedId;
  public $sensorId;
  public $sensorName;
  public $sensorDescription;
  public $manufacturer;
  public $totalLifeExpentancyHours;
  public $turbineDeployedId;
  public $serialNumber;
  public $deployedDate;

  public function __construct($data) {
  $this->sensorDeployedId = isset($data['sensorDeployedId']) ? intval($data['sensorDeployedId']) : null;
  $this->sensorId = $data['sensorId'];
  $this->sensorName = $data['sensorName'];
  $this->sensorDescription = $data['sensorDescription'];
  $this->manufacturer = $data['manufacturer'];
  $this->totalLifeExpentancyHours = $data['totalLifeExpentancyHours'];
  $this->turbineDeployedId = $data['turbineDeployedId'];
  $this->serialNumber = $data['serialNumber'];
  $this->deployedDate = $data['deployedDate'];
}
  public static function fetchSensorDepById(int $sensorDeployedId) {
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    //2. run a query
    $sql = 'SELECT s.sensorName, s.sensorDescription, s.manufacturer, s.totalLifeExpentancyHours, sd.serialNumber, sd.deployedDate from sensor as s, sensorDeployed as sd, turbineDeployed, site
    WHERE sensor.sensorId = sensorDeployed.sensorId
    AND sensorDeployed.turbineDeployedId = turbineDeployed.turbineDeployedId
    AND turbineDeployed.siteId = site.siteId
    AND site.siteId = ?';

    $statement = $db->prepare($sql);
    //3. read the results
    $success = $statement->execute(
      [$sensorDeployedId]
    );
    //4. handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theSensorDeployed = new Deployed($row);
      array_push($arr, $theSensorDeployed);
    }
    return $arr;
  }
}
