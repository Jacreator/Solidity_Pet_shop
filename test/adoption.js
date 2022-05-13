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

    it('calling a right pet id should return true', async () => {
      const result = await instance.adopt.call(1);
      assert.equal(result, true, "should return true");
    });

    it('calling a wrong pet id should return false', async () => {
      const result = await instance.adopt.call(0);
      assert.equal(result, false, "should return false");
    });

    it('User should adopt a pet', async () => {
      await instance.adopt.sendTransaction(1, { from: accounts[0] });
      const result = await instance.adopters.call(1);
      assert.equal(result, accounts[0], "incorrect result");
    });

    it('Should get adopter address by pet id in an array', async () => {
      const result = await instance.getAdopters.call(); 
      assert.equal(result[1], accounts[0], "Owner should be the first element");
    });
      
    it('Should throw error if invalid pet id is given', async () => {
      try {
        await instance.adopt.sendTransaction(20, { from: accounts[0] });
        // case the test did not catch an error
        assert.fail(true, false, "should have thrown an error");
      } catch (error) {
        assert.include(error.message, "VM Exception while processing transaction: revert", "should throw error and revert");
      }
    });
  });
});
