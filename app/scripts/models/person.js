import Bb from 'backbone';
import settings from '../settings';

const Person = Bb.Model.extend({
  urlRoot: `https://baas.kinvey.com/appdata/${settings.appId}/people`,
});

export default Person;
