import Bb from 'backbone';
import settings from '../settings';
import Person from '../models/person';

const personList = Bb.Collection.extend({
  url: `https://baas.kinvey.com/appdata/${settings.appId}/people`,
  model: Person
});

let rolodex = new personList ();

export default rolodex;
