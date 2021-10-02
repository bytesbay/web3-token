describe('Verify', () => {

  beforeAll(async done => {
    done()
  })

  describe('Pass recover', () => {
    it('must send SMS', async () => {
      const user = {
        mobile: '+380932502176'
      }
      await PassRecoverService._sendCode(user)
    });
  });

  afterAll(async done => {
    done();
  });
})