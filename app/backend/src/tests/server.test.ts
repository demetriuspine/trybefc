import * as chai from 'chai';
import { App } from "../app";

const { expect } = chai;

describe('Server test', () => {
  it('Server should exist.', () => {
    const newApp = new App();
    expect(newApp).to.exist;
  });
})