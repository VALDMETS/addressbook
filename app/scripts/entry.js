import $ from 'jquery';
import Bb from 'backbone';
import _ from 'underscore';

import router from './router';
import settings from './settings';
import user from './models/session';
import Person from './models/person';
import rolodex from './collections/personlist';

Bb.history.start();
