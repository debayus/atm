import sinon from "sinon";
import {expect} from "chai";
import {GOODBYE} from "../../src/constants/resources.js";
import {login} from "../../src/services/authService.js";
import {handleLogout} from "../../src/handlers/handleLogout.js";
import {users} from "../../src/data.js";

describe('Handle Logout', function() {

    beforeEach(() => {
        users.length = 0;
    });

    it('Should get correct logout user', () => {
        const consoleSpy = sinon.spy(console, 'log');
        login('Alice')

        handleLogout();

        expect(consoleSpy.calledWith(GOODBYE.replace('@name', "Alice"))).to.be.true;

        consoleSpy.restore();
    });

});
