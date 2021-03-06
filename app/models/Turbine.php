<?php

class Turbine

{
  public $turbineId;
  public $turbineName;
  public $turbineDescription;
  public $capacity;
  public $rampUpTime;
  public $maintenanceInterval;


  public function __construct($data) {
  $this->turbineId = isset($data['turbineId']) ? intval($data['turbineId']) : null;
  $this->turbineName = $data['turbineName'];
  $this->turbineDescription = $data['turbineDescription'];
  $this->capacity = $data['capacity'];
  $this->rampUpTime = $data['rampUpTime'];
  $this->maintenanceInterval = $data['maintenanceInterval'];
}

  // public static function fetchAll() {
  //
  //   $db = new PDO(DB_SERVER, DB_USER, DB_PW);
  //
  //   //2. run a query
  //   $sql = 'SELECT * FROM turbine';
  //   $statement = $db->prepare($sql);
  //   //3. read the results
  //   $success = $statement->execute();
  //   //4. handle the results
  //   $arr = [];
  //   while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
  //     $theturbine = new Turbine($row);
  //     array_push($arr, $theturbine);
  //   }
  //   return $arr;
  // }

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
      $theTurbine = new Turbine($row);
      array_push($arr, $theTurbine);
    }
    return $arr;
  }

}
