import $ from 'jquery';
import Bb from 'backbone';

import rolodex from '../collections/personlist';
import Person from '../models/person';
import user from '../models/session';
import router from '../router';


function renderAddressPage () {

  console.log('got em');
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
      Authorization: 'Kinvey ' + user.authToken
    },
    success: function () {
      console.log('I Live');
    },
    error: function () {
      console.log('I Die');
      router.navigate('login', {trigger: true});
    }
  });

  rolodex.on('add', function(){
    $('.sidebar').empty();
    rolodex.models.forEach(function(person, i){
      $('.sidebar').append(`<a class="displayperson" data-index="${i}">${person.get('nick')}</a>`);
    });
    $('.displayperson').click(function(){
      let currentIndex = $(this).data().index;
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
    let currentPerson = new Person({
      name: $('#newname').val(),
      nick: $('#newnick').val(),
      email: $('#newemail').val(),
      phone: $('#newphone').val(),
    });
    currentPerson.save(null, {
      contentType: 'application/json',
      headers: {
        Authorization: 'Kinvey ' + user.authToken
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


export default renderAddressPage;
