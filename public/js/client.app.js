var clientApp = new Vue({
  el: '#clientsMain',
  data:{
  clients: [],
  clientNotes: [],
  sites: [],


  clientList:[],


  workForm: {
    notes: '',
  
   },   // populated by this.getEmptyWorkForm()

},
methods: {
  handleWorkForm(e) {

    // TODO: Check validity in a better way
    if (this.notes_input <= 0) {
      console.error('Cannot submit, invalid values');
      return;
    }


    // Stop field not used by the API
    // this.workForm.stop_date = this.workForm.stop + ' ' + this.workForm.stop_time;

    const s = JSON.stringify(this.workForm);

    console.log(s);

    // POST to remote server
    fetch('api/clientNotesPost.php', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
          "Content-Type": "application/json; charset=utf-8"
      },
      body: s // body data type must match "Content-Type" header
    })
    .then( response => response.json() )
    .then( json => {this.workForm.push(json)})
    .catch( err => {
      console.error('WORK POST ERROR:');
      console.error(err);
    })

    // Reset workForm
    this.workForm = this.getEmptyWorkForm();
  },

  getEmptyWorkForm() {
    return {

      notes: null,


    }
  },















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
  }

  },


created() {
  const url = new URL(window.location.href);
  const clientId = url.searchParams.get('clientId') || 0;
  console.log('Client: '+ clientId);
  this.clients.clientId = clientId;


  fetch('api/client.php')
  .then( response => response.json() )
  .then( json => {clientsMain.clientList = json} )
  .catch( err => {
    console.log('TEAM LIST ERROR:');
    console.log(err); })


      if (!clientId) {
        console.error('Client Id not defined in URL parameters.')
      }


  this.fetchClient(clientId);
  this.fetchNotes(clientId);
  this.fetchSite(clientId);
}

})
