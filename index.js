import express, { urlencoded } from "express";
import expressLayout from 'express-ejs-layouts'
import path from 'path';
import UserController from './src/controllers/user.controller.js';
import JobController from "./src/controllers/job.controller.js";
import LandingController from "./src/controllers/landing.controller.js";
import session from "express-session";
import ApplicantController from "./src/controllers/applicants.controller.js";
import { upload } from "./src/middlewares/upload-pdf.middleware.js";
import { auth } from "./src/middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";
import { validateApplication } from "./src/middlewares/apply-job.middleware.js";
import { validateUser } from "./src/middlewares/user-validation.middleware.js";
import fs from 'fs';
import { validateNewJob } from "./src/middlewares/create-job-validation.middleware.js";
const server = express();

server.use(cookieParser());
server.use(session({
    secret: "Keypad Cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))


// Setup view engine 
server.use(express.static("public"));
server.set('view engine', 'ejs') //setup chich engine we are using
server.set('views', path.join(path.resolve(), 'src', 'views')) //setup path where is our views
server.use(expressLayout);
server.use(express.urlencoded({ 'extended': false }));


const UsersController = new UserController();
const JobsController = new JobController()
const LandingPage = new LandingController();
const ApplicantsController = new ApplicantController();
server.get('/', LandingPage.getLandingPage);
server.get('/jobs', JobsController.getJobs) //retrieve all jobs
server.post('/jobs', auth, validateNewJob, JobsController.postJobs) //post create new job
server.get('/add-job', auth, JobsController.addNewJob) // render create new job
server.get('/jobs/:id', JobsController.getJobDetails) //to show details
server.post('/jobs/update/:id', auth, JobsController.putJobDetails)
server.post('/jobs/delete/:id', auth, JobsController.deleteJob)
server.post('/jobs/apply/:id', upload.single('resume'), validateApplication, ApplicantsController.postApply)
server.get("/posted-by-user", auth, JobsController.filter)


server.get("/jobs/applicants/:id", auth, ApplicantsController.getApplicants);
server.get("/get-pdf/:id", auth, ApplicantsController.viewPdf);

server.post('/search', JobsController.search)

server.get('/login', UsersController.getLoginUser)
server.post('/login', UsersController.postLoginUser)
server.get("/register", UsersController.getRegisterUser)
server.post("/register", validateUser, UsersController.postRegisterUser)
server.get('/logout', UsersController.logout);
server.listen("3400", () => {
    console.log("Server is listening on port no 3400");
})