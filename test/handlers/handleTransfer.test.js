import {login, logout} from "../../src/services/authService.js";
import sinon from "sinon";
import {expect} from "chai";
import {TRANSFERRED, YOUR_BALANCE} from "../../src/constants/resources.js";
import {handleTransfer} from "../../src/handlers/handleTransfer.js";
import {deposit} from "../../src/services/transactionService.js";
import {users} from "../../src/data.js";

describe('Handle Transfer', function() {

    beforeEach(() => {
        users.length = 0;
    });

    it('Should get correct transfer', () => {
        login('Bob');
        logout();
        login('Alice');
        deposit(10);
        const consoleSpy = sinon.spy(console, 'log');

        handleTransfer(["transfer", "Bob", "10"]);

        expect(consoleSpy.calledWith(
            TRANSFERRED.replace("@amount", "10")
                .replace("@target", "Bob")
        )).to.be.true;
        expect(consoleSpy.calledWith(
            YOUR_BALANCE.replace("@balance", "0")
        )).to.be.true;

        consoleSpy.restore();
    });

});
