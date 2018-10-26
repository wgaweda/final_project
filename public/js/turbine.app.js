var turbineApp = new Vue({
  el: '#turbinesMain',
  data:{
    turbines:[],
    sensors: [],
    sensorsDeployed: [],
    timeSeries: []
},

methods: {

  pretty_date: function (d) {
      return moment(d).format('l')
    },

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

fetchSensorTimeSeries (sid) {
  fetch('api/sensorTimeSeries.php?siteId='+sid)
  .then( response => response.json() )
  .then( json => {this.timeSeries = json;
    console.log(this.timeSeries);
    this.formatOutput();
    this.buildOutputChart();
  } )
  .catch( err => {
    console.log('SENSOR TIME SERIES ERROR:');
    console.log(err);
})
},

formatOutput() {
      this.timeSeries.forEach(
        (entry) => {
          entry.dataCollectedDate = Date.parse(entry.dataCollectedDate); // Convert to ms since Jan 1, 1970 UTC
      });

      // DEBUG: Make sure the data is how we want it:
      console.log(this.timeSeries);
},

buildOutputChart() {
     Highcharts.chart('outputChart', {
           title: {
               text: 'Output Chart'
           },
           xAxis: {
               type: 'datetime'
           },
           yAxis: {
               title: {
                   text: 'Output'
               }
           },
           legend: {
               enabled: false
           },
           plotOptions: {
               area: {
                   fillColor: {
                       linearGradient: {
                           x1: 0,
                           y1: 0,
                           x2: 0,
                           y2: 1
                       },
                       stops: [
                           [0, Highcharts.getOptions().colors[0]],
                           [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                       ]
                   },
                   marker: {
                       radius: 2
                   },
                   lineWidth: 1,
                   states: {
                       hover: {
                           lineWidth: 1
                       }
                   },
                   threshold: null
               }
           },

           series: [{
               type: 'area',
               name: 'Output',

               data: this.timeSeries.map( item => [item.dataCollectedDate, item.output] )
           }]
       });
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
  this.fetchSensorTimeSeries(siteId);

  this.buildOutputChart();

}

})
