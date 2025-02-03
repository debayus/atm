import {expect} from "chai";
import {login} from "../../src/services/authService.js";
import sinon from "sinon";
import {handleBalance} from "../../src/handlers/handleBalance.js";
import {YOUR_BALANCE} from "../../src/constants/resources.js";
import {users} from "../../src/data.js";

describe('Handle Balance', function() {

    beforeEach(() => {
        users.length = 0;
    });

    it('Should get correct balance', () => {
        login('Alice');
        const consoleSpy = sinon.spy(console, 'log');

        handleBalance();

        expect(consoleSpy.calledWith(YOUR_BALANCE.replace('@balance', "0"))).to.be.true;

        consoleSpy.restore();
    });

});
