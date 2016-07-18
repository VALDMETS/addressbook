import $ from 'jquery';
import settings from '../settings';
import user from '../models/session';
import router from '../router';

function renderLogin() {

  $('main').empty().append(`
    <h2>LOG IN</h2>
    <input type="text" id="loginfield" value="" placeholder="LOGIN NAME">
    <input type="password" id="password" value="" placeholder="PASSWORD">
    <input type="button" id="submitlogin" data-login="/login" value="SUBMIT">
    <h4>Or sign up!</h4>
    <input type="text" id="signupfield" value="" placeholder="SIGN UP">
    <input type="password" id="signuppassword" value="" placeholder="PASSWORD">
    <input type="button" id="submitsignup" data-login="" value="SIGN UP">
    `);

  $('#submitlogin').click(firstPageButton);
  $('#submitsignup').click(firstPageButton);
}

function firstPageButton() {
  let login = '';
  let username = $('#signupfield').val() || $('#loginfield').val();
  let password = $('#signuppassword').val() || $('#password').val();
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
      user.authToken = resp._kmd.authtoken;
      router.navigate('rolodex', {trigger: true});
    },
    error: function () {
      console.log('something is mad');
      location.hash = 'error';
      $('main').empty().append(`
        <h3>Oh no! Something was incorrect with your login.</h3>
        <input type="button" id="loginreturn" value="Return to Login">
      `);
      $('#loginreturn').click(function(){
        router.navigate('login', {trigger: true});
      });
    }
  });
}

export default renderLogin;
