<?php

class TurbDeployed

{
  public $turbineDeployedId;
  public $turbineId;
  public $siteId;
  public $serialNumber;
  public $deployedDate;
  public $totalFiredHours;
  public $totalStarts;
  public $lastPlannedOutageDate;
  public $lastUnplannedOutageDate;


  public function __construct($data) {
  $this->turbineDeployedId = isset($data['turbineDeployedId']) ? intval($data['turbineDeployedId']) : null;
  $this->turbineId = isset($data['turbineId']) ? intval($data['turbineId']) : null;
  $this->siteId = $data['siteId'];
  $this->serialNumber = $data['serialNumber'];
  $this->deployedDate = $data['deployedDate'];
  $this->totalFiredHours = $data['totalFiredHours'];
  $this->totalStarts = $data['totalStarts'];
  $this->lastPlannedOutageDate = $data['lastPlannedOutageDate'];
  $this->lastUnplannedOutageDate = $data['lastUnplannedOutageDate'];
}

public static function fetchByTurbineId(int $siteId) {
//trying this j
  $db = new PDO(DB_SERVER, DB_USER, DB_PW);

  //2. run a query
  $sql = 'SELECT * FROM turbine, turbineDeployed
  WHERE turbine.turbineId = turbineDeployed.turbineId
  AND turbineDeployed.siteId = ?';

  $statement = $db->prepare($sql);
  //3. read the results
  $success = $statement->execute(
    [$siteId]
  );
  //4. handle the results
  $arr = [];
  while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
    $theTurbine = new turbineDeployed($row);
    array_push($arr, $theTurbine);
  }
  return $arr;
}
}
