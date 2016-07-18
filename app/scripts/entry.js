import $ from 'jquery';
import Bb from 'backbone';

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
      // renderAddressPage();
    },
    error: function () {
      console.log('something is mad');
    }
  });
}

$('#submitlogin').click(firstPageButton);
$('#submitsignup').click(firstPageButton);
