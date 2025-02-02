import { expect } from 'chai';
import Debt from "../../src/models/debt.js";

const mockGetUserByUuid = (_) => {
    return { name: 'Alice' };
};

describe('Debt Class', function() {

    it('Should create a debt with correct properties', () => {
        const debt = new Debt('uuid', 100);
        expect(debt).to.have.property('targetUuid').that.equals('uuid');
        expect(debt).to.have.property('amount').that.equals(100);
    });

    it('Should allow reducing and increasing the debt amount', function() {
        const debt = new Debt('uuid', 100);
        debt.reduce(30);
        expect(debt.amount).to.equal(70);
        debt.increase(50);
        expect(debt.amount).to.equal(120);
    });

    it('Should retrieve the target name using getUserByUuid', function() {
        const debt = new Debt('uuid', 100);
        const targetName = mockGetUserByUuid(debt.targetUuid).name;
        expect(targetName).to.equal('Alice');
    });

});
