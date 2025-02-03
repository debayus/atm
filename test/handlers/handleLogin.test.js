import {login} from "../../src/services/authService.js";
import sinon from "sinon";
import {expect} from "chai";
import {HELLO, YOUR_BALANCE} from "../../src/constants/resources.js";
import {handleLogin} from "../../src/handlers/handleLogin.js";
import {users} from "../../src/data.js";

describe('Handle Login', function() {

    beforeEach(() => {
        users.length = 0;
    });

    it('Should get correct login user', () => {
        const consoleSpy = sinon.spy(console, 'log');

        handleLogin(['login', 'Alice']);

        expect(consoleSpy.calledWith(HELLO.replace('@name', "Alice"))).to.be.true;
        expect(consoleSpy.calledWith(YOUR_BALANCE.replace('@balance', "0"))).to.be.true;

        consoleSpy.restore();
    });

});
