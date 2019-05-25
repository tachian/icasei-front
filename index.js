/* jshint browser: true */
/* global console */
/* global $ */

var tableTrack;

var app = {

  // Application Constructor
  initialize: function () {
    console.log("Entering app.initialize()");

    $('.content').hide();

    var guid = newguid();
    localStorage.setItem('guid', guid);

    $(".nav-link").on('click', function (e) {
      console.log("Entering click event" + guid);

      $('.navbar-nav').find('.active').removeClass('active');
      $(this).addClass('active');

      $('.content').hide();
      $($(this).attr('href')).show();

      if($(this).attr('href') == '#track'){
        tableTrack.destroy();
        createTrackDataTable();
      }

    });
    
    console.log("Leaving app.initialize()");
  }
};

$(window).bind('hashchange', function() {

  var guid = localStorage.getItem('guid');

  data = {'track': {'guid': guid, 'url': window.location.href, 'created': new Date()}}

  $.ajax({
    type: "POST",
    url: 'http://localhost:3000/tracks',
    data: data,
    success: function(){
      console.log( "Track saved( " + data + ")");
    }
  });
});

function newguid($) {
  uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8; return v.toString(16); });
  return uuid;
};

function submitContactForm() {
  var contactForm = document.getElementById("contactForm");
  var nameValue = document.getElementById("name").value;
  var emailValue = document.getElementById("email").value;

  if (!contactForm.checkValidity()){
    alert("Invalid data");
    return;
  }

  data = {'contact': {'name': nameValue, 'email': emailValue}};

  $.ajax({
    type: "POST",
    url: 'http://localhost:3000/contacts',
    data: data,
    success: function(data){
      alert( "Contact " + data.name +  " saved");

    }
  });
}

function createTrackDataTable(data){
  $.ajax({
    type: "GET",
    url: 'http://localhost:3000/tracks',
    success: function(data){
      dataTable = Object.values(data);
      tableTrack = $('#trackTable').DataTable( {
        data: data,
        "paging":   false,
        "ordering": false,
        "info":     false,
        "searching": false,
        "columns": [
          { "data": "guid" },
          { "data": "url" },
          { "data": "created" }
        ]
      });
    }
  });
}
