<?php

class Client

{
  public $clientId;
  public $clientName;
  public $clientDescription;
  public $gicsSector;
  public $gicsSubIndustry;
  public $headquarters;

  public function __construct($data) {
  $this->clientId = isset($data['clientId']) ? intval($data['clientId']) : null;
  $this->clientName = $data['clientName'];
  $this->clientDescription = $data['clientDescription'];
  $this->gicsSector = $data['gicsSector'];
  $this->gicsSubIndustry = $data['gicsSubIndustry'];
  $this->headquarters = $data['headquarters'];

}

  public static function fetchAll() {

    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    //2. run a query
    $sql = 'SELECT * FROM Client';
    $statement = $db->prepare($sql);
    //3. read the results
    $success = $statement->execute();
    //4. handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theClient = new Client($row);
      array_push($arr, $theClient);
    }
    return $arr;
  }

  public function create() {

  $db = new PDO(DB_SERVER, DB_USER, DB_PW);

  $sql = 'INSERT Client (clientId, clientName, clientDescription, gicsSector, gicsSubIndustry, headquarters)
          Values (?, ?, ?, ?, ?, ?)';

  $statement = $db->prepare($sql);
  $success = $statement->execute([
    $this->clientId,
    $this->clientName,
    $this->clientDescription,
    $this->gicsSector,
    $this->gicsSubIndustry,
    $this->$headquarters
  ]);

  $this->clientId = $db->lastInsertId();
}
}
