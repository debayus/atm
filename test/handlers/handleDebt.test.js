import {login, logout} from "../../src/services/authService.js";
import sinon from "sinon";
import {expect} from "chai";
import {OWED_TO} from "../../src/constants/resources.js";
import {handleDebt} from "../../src/handlers/handleDebt.js";
import {transfer} from "../../src/services/transactionService.js";
import {users} from "../../src/data.js";

describe('Handle Debt', function() {

    beforeEach(() => {
        users.length = 0;
    });

    it('Should get correct debts', () => {
        login('Bob');
        logout();
        login('Alice');
        transfer('Bob', 10);
        const consoleSpy = sinon.spy(console, 'log');

        handleDebt();

        expect(consoleSpy.calledWith(
            OWED_TO.replace("@amount", "10").replace(
                "@target",
                "Bob"
            )
        )).to.be.true;

        consoleSpy.restore();
    });

});
