const adoption = artifacts.require("adoption");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("adoption", function (accounts) {

  describe('First group of Test', () => {
    let instance;

    before(async () => {
      instance = await adoption.deployed();
    });

    it('should return true', async () => {
      const result = await instance.adopt.call(1);
      assert.equal(result, true, "should return true");
    });

    it('should return false', async () => {
      const result = await instance.adopt.call(0);
      assert.equal(result, false, "should return false");
    });

    it('User should adopt a pet', async () => {
      await instance.adopt.sendTransaction(1, { from: accounts[0] });
      const result = await instance.adopters.call(1);
      assert.equal(result, accounts[0], "incorrect result");
    });
  });
});
