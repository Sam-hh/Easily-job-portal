import UserModel from '../models/user.model.js';

export default class UserController {
    /**To render the registration form to the user */
    getRegisterUser(req, res) {
        return res.render('register-user', { "errors": null });
    }

    /**To retrive the response of user from registration form */
    postRegisterUser(req, res) {
        const user = req.body;
        const result = UserModel.addUser(user);
        if (!result) {
            return res.render("error404")
        }
        return res.render("login-user", { "errors": null });
    }

    /**To render the login form */
    getLoginUser(req, res) {
        return res.render("login-user", { "errors": null });
    }

    /**To validate the user and render the screen as per the recruiter */
    postLoginUser(req, res) {
        const { email, password } = req.body;
        const result = UserModel.postLogin(email, password);
        if (!result) {
            return res.render("login-user", { "errors": "Invalid Credentials" })
        }
        res.cookie("userEmail", email, {
            maxAge: 1 * 24 * 60 * 60
        });
        req.session.userId = email;
        return res.redirect('/jobs');
    }

    /**Logout from the website */
    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                return res.render("error404");
            } else {
                const cookies = req.cookies;
                for (const cookieName in cookies) {
                    res.clearCookie(cookieName);
                }
                return res.redirect("/");
            }
        })
    }
}