const { describe, it, beforeEach, expect, sandbox } = require('./util');
const dotenvExtended = require('dotenv-extended');
const WebpackDotenvExtendedPlugin = require('../index');

describe('WebpackDotenvExtendedPlugin', () => {
    describe('constructor(options)', () => {
        describe('sets options', () => {
            it('with given options arg', () => {
                const options = { foo: 'bar' };
                const plugin = new WebpackDotenvExtendedPlugin(options);
                expect(plugin.options).to.deep.equal(options);
            });
            it('with default options when not given options arg', () => {
                const plugin = new WebpackDotenvExtendedPlugin();
                expect(plugin.options).to.deep.equal({});
            });
        });
        describe('sets config', () => {
            it('with dotenv-extended loaded with given options', () => {
                const options = { foo: 'bar' };
                const config = { biz: 'baz' };
                sandbox.stub(dotenvExtended, 'load').withArgs(options).returns(config);
                const plugin = new WebpackDotenvExtendedPlugin(options);
                expect(plugin.config).to.deep.equal(config);
            });
            it('uses dotenv-extended to load environment into config with default options', () => {
                const config = { biz: 'baz' };
                sandbox.stub(dotenvExtended, 'load').returns(config);
                const plugin = new WebpackDotenvExtendedPlugin();
                expect(plugin.config).to.deep.equal(config);
            });
        });
        // it('loads dotenv-extended into environment with default options and sets config', () => {
        //     const config = { biz: 'baz' };
        //     sandbox.stub(dotenvExtended, 'load').withArgs({}).returns(config);
        //     const plugin = new WebpackDotenvExtendedPlugin(options);
        //     expect(plugin.config).to.deep.equal(config);
        // });
    });
});
