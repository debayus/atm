import {login, logout} from "../../src/services/authService.js";
import {transfer} from "../../src/services/transactionService.js";
import sinon from "sinon";
import {expect} from "chai";
import {OWED_FROM} from "../../src/constants/resources.js";
import {handleReceivables} from "../../src/handlers/handleReceivables.js";
import {users} from "../../src/data.js";

describe('Handle Receivables', function() {

    beforeEach(() => {
        users.length = 0;
    });

    it('Should get correct receivables', () => {
        login('Bob');
        logout();
        login('Alice');
        transfer('Bob', 10);
        logout();
        login('Bob');
        const consoleSpy = sinon.spy(console, 'log');

        handleReceivables();

        expect(consoleSpy.calledWith(
            OWED_FROM.replace("@amount", "10").replace(
                "@target",
                "Alice"
            )
        )).to.be.true;

        consoleSpy.restore();
    });

});
