use team_7_db;

select * from client;

create table client (
	clientId int NOT NULL,
    clientName  varchar(30) NOT NULL,
    clientDescription TEXT NOT NULL,
    gicsSector varchar(30) NOT NULL,
    gicsSubIndustry varchar(30) NOT NULL,
    headquarters varchar(30) NOT NULL,
    primary key (clientId)
);

select * from sensor;

create table sensor (
	sensorId int NOT NULL,
    sensorName varchar(40) NOT NULL,
    sensorDescription TEXT NOT NULL,
    manufacturer varchar(40) NOT NULL,
    totalLifeExpentancyHours INT NOT NULL,
    primary key (sensorId)
);

select * from sensorDeployed;

create table sensorDeployed (
 	sensorDeployedId INT NOT NULL,
    sensorId INT NOT NULL,
    turbineDeployedId INT NOT NULL,
    serialNumber varchar(11) NOT NULL,
    deployedDate DATE NOT NULL,
    primary key (sensorDeployedId),
	Foreign Key (sensorId) References sensor(sensorId)
);

select * from sensorTimeSeries;

create table sensorTimeSeries (
	Id INT NOT NULL Auto_Increment,
	sensorDeployedId INT NOT NULL,
	dataCollectedDate DATE NOT NULL,
    output Decimal (12, 8) NOT NULL,
    heatRate Decimal (12, 8) NOT NULL,
    compressorEfficiency Decimal (12, 8) NOT NULL,
    availability Decimal (12, 8) NOT NULL,
    reliability Decimal (12, 8) NOT NULL,
    firedHours Decimal (12, 8) NOT NULL,
    trips INT NOT NULL,
    starts INT NOT NULL,
    Primary Key (Id),
    Foreign Key (sensorDeployedId) References sensorDeployed(sensorDeployedId)
);

select * from site;

create table site (
	siteId INT NOT NULL,
	clientId INT NOT NULL,
	siteName varchar(30) NOT NULL,
	siteDescription TEXT NOT NULL,
	primaryContact varchar(30) NOT NULL,
	capacity INT NOT NULL,
	commercialDate DATE NOT NULL,
	addrLine1 varchar(40) NOT NULL,
	addrLine2 varchar(40),
	addrCity varchar(30) NOT NULL,
	addrState varchar(2) NOT NULL,
	addrZip varchar(5) NOT NULL,
	addrCountry varchar(2) NOT NULL,
    Primary KEY (siteId),
	Foreign Key (clientId) References client(clientId)
);

select * from turbine;

create table turbine (
	turbineId INT NOT NULL,
	turbineName	varchar(10) NOT NULL,
	turbineDescription TEXT NOT NULL,
	capacity INT NOT NULL,
	rampUpTime INT NOT NULL,
	maintenanceInterval INT NOT NULL,
    primary key (turbineId)
);

select * from turbineDeployed;

create table turbineDeployed (
	turbineDeployedId INT NOT NULL,
	turbineId INT NOT NULL,
	siteId INT NOT NULL,
	serialNumber varchar(13) NOT NULL,
	deployedDate DATE NOT NULL,
	totalFiredHours INT NOT NULL,
	totalStarts INT NOT NULL,
	lastPlannedOutageDate DATE NOT NULL,
	lastUnplannedOutageDate DATE,
    Primary Key (turbineDeployedId),
    Foreign Key (turbineId) References turbine(turbineId),
    foreign key (siteId) References site(siteId)
);
