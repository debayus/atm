import { expect } from 'chai';
import {getUserByName, getUserByUuid, getUserLogin, login, logout} from "../../src/services/authService.js";
import { users, userLogin } from "../../src/data.js";

const sampleUsers = [
    { uuid: 'uuidAlice', name: 'Alice' },
    { uuid: 'uuidBob', name: 'Bob' },
];

describe('Auth Service', function() {

    sampleUsers.forEach(user => users.push(user));

    it('Should retrieve a user by name', function() {
        const user = getUserByName('Alice');
        expect(user).to.have.property('name').that.equals('Alice');
    });

    it('Should retrieve a user by uuid', function() {
        const user = getUserByUuid('uuidAlice');
        expect(user).to.have.property('uuid').that.equals('uuidAlice');
    });

    it('Should retrieve the logged-in user', function() {
        login('Alice')
        const user = getUserLogin();
        expect(user).to.have.property('name').that.equals('Alice');
    });

    it('Should log in a user', function() {
        login('Alice')
        const user = getUserByName('Alice');
        expect(user).to.have.property('name').that.equals('Alice');
        expect('uuidAlice').to.equal(user.uuid);
    });

    it('Should log in a new user', function() {
        login('Elon')
        const user = getUserByName('Elon');
        expect(user).to.have.property('name').that.equals('Elon');
    });

    it('Should log out a user', function() {
        login('Alice');
        logout();
        expect(userLogin.uuid).to.be.null;
    });
});