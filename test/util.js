const mocha = require('mocha');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');

chai.use(sinonChai);

const { describe, it, beforeEach, afterEach } = mocha;
const { expect } = chai;

const sandbox = sinon.sandbox.create();
afterEach(() => sandbox.restore());

module.exports = {
    describe,
    it,
    beforeEach,
    afterEach,
    expect,
    sandbox
};