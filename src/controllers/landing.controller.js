export default class LandingController {
    getLandingPage(req, res) {
        return res.render("landing-page", { "userEmail": req.cookies.userEmail });
    }
}