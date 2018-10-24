var turbineApp = new Vue({
  el: '#turbinesMain',
  data:{
    turbines:[],
    sensors: [],
    sensorsDeployed: []
},

methods: {
  fetchTurbineDeployed(sid) {
    fetch('api/turbineDeployed.php?siteId='+sid)
    .then( response => response.json() )
    .then( json => {this.turbines = json; console.log(this.turbines)} )
    .catch( err => {
        console.log('TURBINE FETCH ERROR:');
        console.log(err);
      })
    },

  fetchSensor(sid) {
    fetch('api/sensor.php?siteId='+sid)
    .then( response => response.json() )
    .then( json => {this.sensors = json; console.log(this.sensors)} )
    .catch( err => {
      console.log('SENSOR ERROR:');
      console.log(err);
  })
},

  fetchSensorDeployed (sid) {
    fetch('api/sensorDeployed.php?siteId='+sid)
    .then( response => response.json() )
    .then( json => {this.sensorsDeployed = json; console.log(this.sensorsDeployed)} )
    .catch( err => {
      console.log('SENSOR DEPLOYED ERROR:');
      console.log(err);
  })
},

gotoTurbine (sid) {
window.location = 'turbine.html?siteId=' + sid;
}

},

created() {
  const url = new URL(window.location.href);
  const siteId = url.searchParams.get('siteId') || 0;
  console.log('Turbine: '+ siteId);
  this.turbines.siteId = siteId;

  if (!siteId) {
    console.error('Site Id not defined in URL parameters.')
  }


  this.fetchTurbineDeployed(siteId);
  this.fetchSensor(siteId);
  this.fetchSensorDeployed(siteId);

}

})
