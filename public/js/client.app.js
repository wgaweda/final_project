var clientApp = new Vue({
  el: '#clientsMain',
  data:{
  clients: [],
  clientNotes: [],
  sites: [],
  clientList: [],
  noteForm: {}

},
methods: {

  fetchClient(cid) {
    fetch('api/client.php?clientId='+cid)
    .then( response => response.json() )
    .then( json => {this.clients = json; console.log(this.clients)} )
    .catch( err => {
        console.log('CLIENT FETCH ERROR:');
        console.log(err);
      })
    },


  fetchNotes(cid) {
    fetch('api/clientNotes.php?clientId='+cid)
    .then( response => response.json() )
    .then( json => {this.clientNotes = json; console.log(this.clientNotes)} )
    .catch( err => {
        console.log('CLIENT NOTES FETCH ERROR:');
        console.log(err);
      })
    },

  fetchSite(cid) {
    fetch('api/site.php?clientId='+cid)
    .then( response => response.json() )
    .then( json => {this.sites = json; console.log(this.sites)} )
    .catch( err => {
        console.log('SITE FETCH ERROR:');
        console.log(err);
      })
  },

    gotoClient (cid) {
    window.location = 'client.html?clientId=' + cid;
  },

  handleNoteForm(e) {

    const s = JSON.stringify(this.noteForm);

    console.log(s);

    // POST to remote server
    fetch('../api/clientNotes.php', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
          "Content-Type": "application/json; charset=utf-8"
      },
      body: s // body data type must match "Content-Type" header
    })

    .then( response => response.json() )
    .then( json => {this.clientNotes.push(json)})
    .catch( err => {
      console.error('NOTE POST ERROR:');
      console.error(err);
    })

    // Reset noteForm
    this.noteForm = this.getEmptyNoteForm();
  },

  getEmptyNoteForm() {
    return {
    }
  },

  gotoTurbine (sid) {
  window.location = 'turbine.html?siteId=' + sid;
  }

  },


created() {
  const url = new URL(window.location.href);
  const clientId = url.searchParams.get('clientId') || 0;
  console.log('Client: '+ clientId);
  this.clients.clientId = clientId;

  if (!clientId) {
    console.error('Client Id not defined in URL parameters.')
  }


  this.fetchClient(clientId);
  this.fetchNotes(clientId);
  this.fetchSite(clientId);
}

})
