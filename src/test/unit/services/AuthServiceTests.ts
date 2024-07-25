import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai';
import { describe, it } from "node:test";
import { getTokenByloggingIn, URL } from '../../../main/services/AuthService';
import { LoginRequest } from "../../../main/models/LoginRequest";

const loginResquest: LoginRequest = {
  email: "adam@random.com",
  password: "pass123"
}

const mock = new MockAdapter(axios);

describe('AuthService', function () {

    describe('getToken', function () {
      it('should get Jwt token', async () => {
        mock.onPost(URL).reply(200);

        const result = await getTokenByloggingIn(loginResquest);

        expect(result).toString.length > 100;
      })

      it('should throw exception when 404 error returned from axios', async () => {
        const loginResquest2: LoginRequest = {
          email: "sadkjfhdsaijkfh",
          password: "pass123"
        }
        mock.onPost(URL).reply(404);
        try {
          await getTokenByloggingIn(loginResquest2);
        } catch (e) {
          expect(e.message).to.equal('user does not exist.');
          return;
        }
    })

    it('should throw exception when 400 error returned from axios', async () => {
      const loginResquest3: LoginRequest = {
        email: "adam@random.com",
        password: "asdadasda"
      }
      mock.onPost(URL).reply(400);
      try {
        await getTokenByloggingIn(loginResquest3);
      } catch (e) {
        expect(e.message).to.equal('user is not valid: Invalid Credentials.');
        return;
      }
  })

  it('should throw exception when 500 error returned from axios', async () => {
    const loginResquest4: LoginRequest = {
      email: "string",
      password: "string"
    }
    mock.onPost(URL).reply(500);
    try {
      await getTokenByloggingIn(loginResquest4);
    } catch (e) {
      expect(e.message).to.equal('Internal Server Error.');
      return;
    }
})

    

  })
})