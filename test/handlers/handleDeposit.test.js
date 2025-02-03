import sinon from "sinon";
import {login} from "../../src/services/authService.js";
import {expect} from "chai";
import {YOUR_BALANCE} from "../../src/constants/resources.js";
import {handleDeposit} from "../../src/handlers/handleDeposit.js";
import {users} from "../../src/data.js";

describe('Handle Deposit', function() {

    beforeEach(() => {
        users.length = 0;
    });

    it('Should get correct deposit', () => {
        const consoleSpy = sinon.spy(console, 'log');
        login('Alice')

        handleDeposit(["deposit", "100"]);

        expect(consoleSpy.calledWith(YOUR_BALANCE.replace('@balance', "100"))).to.be.true;

        consoleSpy.restore();
    });

});
