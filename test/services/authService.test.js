import { expect } from 'chai';

const users = [
    { uuid: 'uuidAlice', name: 'Alice' },
    { uuid: 'uuidBob', name: 'Bob' },
];
const userLogin = { uuid: null };

const mockGetUserByName = (name) => {
    return users.find((user) => user.name === name);
};

const mockGetUserByUuid = (uuid) => {
    return users.find((user) => user.uuid === uuid);
};

const mockGetUserLogin = () => {
    return users.find((user) => user.uuid === userLogin.uuid);
};

const mockLogin = (name) => {
    let user = mockGetUserByName(name);
    if (!user) {
        user = { uuid: 'uuid', name };
        users.push(user);
    }
    userLogin.uuid = user.uuid;
};

const mockLogout = () => {
    userLogin.uuid = null;
};

describe('Auth Service', function() {
    it('Should retrieve a user by name', function() {
        const user = mockGetUserByName('Alice');
        expect(user).to.have.property('name').that.equals('Alice');
    });

    it('Should retrieve a user by uuid', function() {
        const user = mockGetUserByUuid('uuidAlice');
        expect(user).to.have.property('uuid').that.equals('uuidAlice');
    });

    it('Should retrieve the logged-in user', function() {
        mockLogin('Alice');
        const user = mockGetUserLogin();
        expect(user).to.have.property('name').that.equals('Alice');
    });

    it('Should log in a user', function() {
        mockLogin('Charlie');
        const user = mockGetUserByName('Charlie');
        expect(user).to.have.property('name').that.equals('Charlie');
        expect(userLogin.uuid).to.equal(user.uuid);
    });

    it('Should log out a user', function() {
        mockLogin('Alice');
        mockLogout();
        expect(userLogin.uuid).to.be.null;
    });
});