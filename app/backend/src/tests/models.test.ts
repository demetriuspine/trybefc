
import * as chai from 'chai';

import User from '../database/models/User';
import Club from '../database/models/Club';
import Match from '../database/models/Match';

const { expect } = chai;

describe('Models tests', () => {
  it('User model should exist.', () => {
    const newUser = new User();
    expect(newUser).to.exist;
  });
  it('Club model should exist.', () => {
    const newClub = new Club();
    expect(newClub).to.exist;
  });
  it('Match model should exist.', () => {
    const newMatch = new Match();
    expect(newMatch).to.exist;
  });
});