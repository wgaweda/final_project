var clientApp = new Vue({
  el: '#clientsMain',
  data:{
  clients: [],
},
methods: {

created () {

  // Do data fetch
  const url = new URL(window.location.href);
  const taskId = url.searchParams.get('clientId');
  console.log('Client: '+ clientId);
  this.client.id = clientId;

  if (!clientId) {
  }

},

  fetchClient() {
    fetch('api/client.php?clientId='+clientId)
    .then( response => response.json() )
    .then( json => {this.clients = json; console.log(this.clients);} )
    .catch( err => {
        console.log('COMMENTS FETCH ERROR:');
        console.log(err);
      })
    }
  },
created() {
  console.log('inside created.');
this.fetchClient()
}

})
