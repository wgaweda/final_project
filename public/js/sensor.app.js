var sensorApp = new Vue({
  el: '#sensorsMain',
  data:{
    sensors:[]
},

methods: {
  fetchsensorDeployed(sDid) {
    fetch('api/sensorDeployed.php?sensorDeployedId='+sid)
    .then( response => response.json() )
    .then( json => {this.sensors = json; console.log(this.sensors)} )
    .catch( err => {
        console.log('CLIENT FETCH ERROR:');
        console.log(err);
      })
    },

gotosensor (sDid) {
window.location = 'sensor.html?sensorDeployedId=' + sDid;
},

},

created() {
  const url = new URL(window.location.href);
  const sensorDeployedId = url.searchParams.get('sensorDeployedId') || 0;
  console.log('sensor: '+ sensorDeployedId);
  this.sensors.sensorDeployedId = sensorDeployedId;

  if (!sensorDeployedId) {
    console.error('Client Id not defined in URL parameters.')
  }


  this.fetchsensorDeployed(sensorDeployedId);
}

})
