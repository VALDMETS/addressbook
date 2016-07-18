import $ from 'jquery';
import Bb from 'backbone';
import _ from 'underscore';

import settings from './settings';

$('main').append(`
  <input type="text" id="signupfield" value="" placeholder="SIGN UP">
  <input type="password" id="signuppassword" value="" placeholder="PASSWORD">
  <input type="button" id="submitsignup" data-login="" value="SIGN UP">
  `);

$('main').append(`
  <input type="text" id="loginfield" value="" placeholder="LOGIN NAME">
  <input type="password" id="password" value="" placeholder="PASSWORD">
  <input type="button" id="submitlogin" data-login="/login" value="SUBMIT">
  `);

let authToken = '';

const Person = Bb.Model.extend({
  urlRoot: `https://baas.kinvey.com/appdata/${settings.appId}/people`,
});

const personList = Bb.Collection.extend({
  url: `https://baas.kinvey.com/appdata/${settings.appId}/people`,
  model: Person
});

let rolodex = new personList ();

function firstPageButton() {
  let login = '';
  let username = $('#signupfield').val() || $('#loginfield').val();
  let password = $('#signuppassword').val() || $('#password').val();
  console.log(username, password);
  $.ajax({
    type: 'POST',
    url: (`https://baas.kinvey.com/user/${settings.appId}` + $(this).data().login),
    data: JSON.stringify({
      username: username,
      password: password
    }),
    contentType: 'application/json',
    headers: {
      Authorization: `Basic ${settings.basicAuth}`
    },
    success: function (resp) {
      console.log('it sent, babyyy');
      authToken = resp._kmd.authtoken;
      renderAddressPage();
    },
    error: function () {
      console.log('something is mad');
    }
  });
}

function renderAddressPage () {

  $('main').empty().append(`
    <div class="newperson">
      <input type="text" id="newname" value="" placeholder="Full Name">
      <input type="text" id="newnick" value="" placeholder="Nickname">
      <input type="text" id="newemail" value="" placeholder="Email Address">
      <input type="text" id="newphone" value="" placeholder="Phone Number">
      <input type="button" id="submitnewperson" value="SUBMIT">
    </div>
    <section class="sidebar">
    </section>
    <section class="personwindow">
    </section>
    `);

  rolodex.fetch({
    contentType: 'application/json',
    headers: {
      Authorization: 'Kinvey ' + authToken
    },
    success: function () {
      console.log('I Live');
    },
    error: function () {
      console.log('I Die');
    }
  });

  rolodex.on('add', function(){
    $('.sidebar').empty();
    rolodex.models.forEach(function(person, i){
      $('.sidebar').append(`<a class="displayperson" data-index="${i}">${person.get('nick')}</a>`);
    });
    $('.displayperson').click(function(){
      let currentIndex = $(this).data().index;
      // console.log($(this).data().index);
      $('.personwindow').empty().append(`
        <div class="personholder" data-index="${currentIndex}">
          <h3>${rolodex.models[currentIndex].get('name')}</h3>
          <p>Nickname: ${rolodex.models[currentIndex].get('nick')}</p>
          <p>Email: ${rolodex.models[currentIndex].get('email')}</p>
          <p>Phone: ${rolodex.models[currentIndex].get('phone')}</p>
        </div>
        `);
    });
  });


  $('#submitnewperson').click(function(){
    console.log('wow wheeeeee');
    let currentPerson = new Person({
      name: $('#newname').val(),
      nick: $('#newnick').val(),
      email: $('#newemail').val(),
      phone: $('#newphone').val(),
    });
    console.log(currentPerson);
    console.log(authToken);
    currentPerson.save(null, {
      contentType: 'application/json',
      headers: {
        Authorization: 'Kinvey ' + authToken
      },
      success: function () {
        console.log('I Live');
      },
      error: function () {
        console.log('I Die');
      }
    });
    rolodex.add(currentPerson);
  });
}

$('#submitlogin').click(firstPageButton);
$('#submitsignup').click(firstPageButton);
