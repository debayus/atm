import sinon from "sinon";
import {login} from "../../src/services/authService.js";
import {expect} from "chai";
import {YOUR_BALANCE} from "../../src/constants/resources.js";
import {deposit} from "../../src/services/transactionService.js";
import {handleWithdraw} from "../../src/handlers/handleWithdraw.js";
import {users} from "../../src/data.js";

describe('Handle Withdraw', function() {

    beforeEach(() => {
        users.length = 0;
    });

    it('Should get correct withdraw', () => {
        const consoleSpy = sinon.spy(console, 'log');
        login('Alice')
        deposit(100);

        handleWithdraw(["withdraw", "100"]);

        expect(consoleSpy.calledWith(YOUR_BALANCE.replace('@balance', "0"))).to.be.true;

        consoleSpy.restore();
    });

});
