import axios from 'axios';
import assert from 'assert';



let token = '';

export default function password_reset() {

  describe('GET /needingTokenAndEmailVerified', function () {

    before(async function() {
      const signupRes = await axios.post(`${global.authApi.BASEURL}/signup`, {
        email: `${global.authApi.EMAIL_RECEIVING_VERIFICATION}`,
        name: `tim`,
        password: '123',
      }).catch((res) => {
        console.log('before message:', res.data);
      });

      const loginRes = await axios.post(`${global.authApi.BASEURL}/login`, {
        name: 'tim',
        password: '123',
      }).catch((res) => { throw res.data; });

      token = loginRes.data.token;
    });

    it('should need token', function () {
      return axios.get(`${global.authApi.BASEURL}/needingTokenAndEmailVerified`)
        .then((res) => {
          throw res;
        }).catch((res) => {
          // console.log(res.data);
          assert.equal(res.data.success, false, 'should be false');
        });
    });

    it('should need email verified', function () {
      return axios.get(`${global.authApi.BASEURL}/needingTokenAndEmailVerified`, {params: {token}})
        .then((res) => { throw res; })
        .catch((res) => {
          assert.equal(res.data.success, false, 'should be false');
          assert.equal(res.data.message, global.authApi.USER_MESSAGE.NEED_EMAIL_VERIFICATION, 'shoud need email verification');
        });
    });

    // it('should success', function  () {
    //   return User.findOne({name: 'tim'}, (err, user) => {
    //     user.verified = true;
    //     user.save((err) => {
    //       if (err) throw err;
    //
    //     })
    //   })
    // });

  });
}
