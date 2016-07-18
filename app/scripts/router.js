import $ from 'jquery';
import Bb from 'backbone';
import _ from 'underscore';

import renderLogin from './views/login';
import renderAddressPage from './views/addresspage';

const Router = Bb.Router.extend({
  routes: {
    'login'       : 'loginFunction',
    'rolodex'     : 'rolodexFunction',
    // 'rolodex/:id' : 'personFunction',
    '/*'          : 'loginFunction'
  },
  loginFunction: function() {
    renderLogin();
  },
  rolodexFunction: function() {
    renderAddressPage();
  }
});

const router = new Router();

export default router;
