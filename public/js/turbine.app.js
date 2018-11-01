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
    this.buildHeatRateChart();
    this.buildCompChart();
    this.buildAvailabilityChart();
    this.buildReliabilityChart();
    this.buildFiredHoursChart();
  } )
  .catch( err => {
    console.log('SENSOR TIME SERIES ERROR:');
    console.log(err);
})
},

formatOutput() {
      this.timeSeries.forEach (
        (entry) => {
          entry.dataCollectedDate = Date.parse(entry.dataCollectedDate); // Convert to ms since Jan 1, 1970 UTC
      });

      // DEBUG: Make sure the data is how we want it:
      console.log(this.timeSeries);
},

buildOutputChart() {

    var data = {};
    console.log('start data is', data);
    this.timeSeries.forEach(i => {
      if (!(i.sensorDeployedId in data)) {
        data[i.sensorDeployedId] = [];
        console.log('created', data[i.sensorDeployedId]);
      } else {
        console.log('array is already defined');
      }
      data[i.sensorDeployedId].push([i.dataCollectedDate, i.output]);
    });
    console.log('Restructured data');
    console.log(data);

    var mySeries = Object.keys(data);
    console.log(Object.keys(data));
    mySeries = mySeries.map(function (s) { return {name: 'Sensor ' + s, data: data[s]} } );
    console.log('Restructured data as series');
    console.log(mySeries);


     Highcharts.chart('outputChart', {
           title: {
               text: 'Output Chart'
           },
           xAxis: {
               text: 'datetime'
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

           series: mySeries
       });
   },


   buildHeatRateChart() {

       var data = {};
       console.log('start data is', data);
       this.timeSeries.forEach(i => {
         if (!(i.sensorDeployedId in data)) {
           data[i.sensorDeployedId] = [];
           console.log('created', data[i.sensorDeployedId]);
         } else {
           console.log('array is already defined');
         }
         data[i.sensorDeployedId].push([i.dataCollectedDate, i.heatRate]);
       });
       console.log('Restructured data');
       console.log(data);

       var mySeries = Object.keys(data);
       console.log(Object.keys(data));
       mySeries = mySeries.map(function (s) { return {name: 'Sensor ' + s, data: data[s]} } );
       console.log('Restructured data as series');
       console.log(mySeries);


        Highcharts.chart('heatRateChart', {
              title: {
                  text: 'Heat Rate Chart'
              },
              xAxis: {
                  text: 'datetime'
              },
              yAxis: {
                  title: {
                      text: 'Heat Rate'
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

              series: mySeries
          });
      },

      buildCompChart() {

          var data = {};
          console.log('start data is', data);
          this.timeSeries.forEach(i => {
            if (!(i.sensorDeployedId in data)) {
              data[i.sensorDeployedId] = [];
              console.log('created', data[i.sensorDeployedId]);
            } else {
              console.log('array is already defined');
            }
            data[i.sensorDeployedId].push([i.dataCollectedDate, i.compressorEfficiency]);
          });
          console.log('Restructured data');
          console.log(data);

          var mySeries = Object.keys(data);
          console.log(Object.keys(data));
          mySeries = mySeries.map(function (s) { return {name: 'Sensor ' + s, data: data[s]} } );
          console.log('Restructured data as series');
          console.log(mySeries);


           Highcharts.chart('compChart', {
                 title: {
                     text: 'Compressor Efficiency Chart'
                 },
                 xAxis: {
                     text: 'datetime'
                 },
                 yAxis: {
                     title: {
                         text: 'Compressor Efficiency'
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

                 series: mySeries
             });
         },


      buildAvailabilityChart() {

          var data = {};
          console.log('start data is', data);
          this.timeSeries.forEach(i => {
            if (!(i.sensorDeployedId in data)) {
              data[i.sensorDeployedId] = [];
              console.log('created', data[i.sensorDeployedId]);
            } else {
              console.log('array is already defined');
            }
            data[i.sensorDeployedId].push([i.dataCollectedDate, i.availability]);
          });
          console.log('Restructured data');
          console.log(data);

          var mySeries = Object.keys(data);
          console.log(Object.keys(data));
          mySeries = mySeries.map(function (s) { return {name: 'Sensor ' + s, data: data[s]} } );
          console.log('Restructured data as series');
          console.log(mySeries);


           Highcharts.chart('availChart', {
                 title: {
                     text: 'Availability Chart'
                 },
                 xAxis: {
                     text: 'datetime'
                 },
                 yAxis: {
                     title: {
                         text: 'Availability'
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

                 series: mySeries
             });
         },

         buildReliabilityChart() {

             var data = {};
             console.log('start data is', data);
             this.timeSeries.forEach(i => {
               if (!(i.sensorDeployedId in data)) {
                 data[i.sensorDeployedId] = [];
                 console.log('created', data[i.sensorDeployedId]);
               } else {
                 console.log('array is already defined');
               }
               data[i.sensorDeployedId].push([i.dataCollectedDate, i.reliability]);
             });
             console.log('Restructured data');
             console.log(data);

             var mySeries = Object.keys(data);
             console.log(Object.keys(data));
             mySeries = mySeries.map(function (s) { return {name: 'Sensor ' + s, data: data[s]} } );
             console.log('Restructured data as series');
             console.log(mySeries);


              Highcharts.chart('reliaChart', {
                    title: {
                        text: 'Reliability Chart'
                    },
                    xAxis: {
                        text: 'datetime'
                    },
                    yAxis: {
                        title: {
                            text: 'Reliability'
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

                    series: mySeries
                });
            },


          buildFiredHoursChart() {

              var data = {};
              console.log('start data is', data);
              this.timeSeries.forEach(i => {
                if (!(i.sensorDeployedId in data)) {
                  data[i.sensorDeployedId] = [];
                  console.log('created', data[i.sensorDeployedId]);
                } else {
                  console.log('array is already defined');
                }
                data[i.sensorDeployedId].push([i.dataCollectedDate, i.firedHours]);
              });
              console.log('Restructured data');
              console.log(data);

              var mySeries = Object.keys(data);
              console.log(Object.keys(data));
              mySeries = mySeries.map(function (s) { return {name: 'Sensor ' + s, data: data[s]} } );
              console.log('Restructured data as series');
              console.log(mySeries);


               Highcharts.chart('firedChart', {
                     title: {
                         text: 'Fired Hours Chart'
                     },
                     xAxis: {
                         text: 'datetime'
                     },
                     yAxis: {
                         title: {
                             text: 'Fired Hours'
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

                     series: mySeries
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


}

});
