const users = [{
    "name": "punit vijay dekate",
    "email": "punitdekate.1999@gmail.com",
    "password": "punitdekate"
}];
export default class UserModel {
    constructor(_name, _email, _password) {
        this.id = users.length + 1;
        this.name = _name;
        this.email = _email;
        this.password = _password;
    }

    /**To add new user */
    static addUser(user) {
        const { name, email, password } = user;
        const newUser = new UserModel(name, email, password);
        users.push(newUser);
        return true;
    }

    /**Validate the user */
    static postLogin(_email, _password) {
        const result = users.find(user => (user.email == _email && user.password == _password));
        return result;
    }
}