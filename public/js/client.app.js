var clientApp = new Vue({
  el: '#clientsMain',
  data:{
  clients: []
},
methods: {
  fetchClient(cid) {
    fetch('api/client.php?clientId='+cid)
    .then( response => response.json() )
    .then( json => {this.clients = json; console.log(this.clients)} )
    .catch( err => {
        console.log('COMMENTS FETCH ERROR:');
        console.log(err);
      })
    }
  },

  fetchClientNotes(cid)  {
    fetch('api/client.php?clientId='+cid)
    .then( response => response.json() )
    .then( json => {this.clients = json; console.log(this.clients)} )
    .catch( err => {
        console.log('COMMENTS FETCH ERROR:');
        console.log(err);
      })
    },

created() {
  const url = new URL(window.location.href);
  const clientId = url.searchParams.get('clientId') || 0;
  console.log('Client: '+ clientId);
  this.clients.clientId = clientId;

  if (!clientId) {
    console.error('Client Id not defined in URL parameters.')
  }


  this.fetchClient(clientId)
}

})
