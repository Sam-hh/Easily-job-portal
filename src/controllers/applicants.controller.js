import ApplicantModel from "../models/applicants.model.js";
import fs from 'fs';
import { sendNotification } from "./mail.controller.js";
export default class ApplicantController {
    /**Recieve the applicants response after apply */
    postApply(req, res) {
        const jobId = req.params.id;
        const { name, email, contact } = req.body;
        const fileName = "public/resumes/" + req.file.filename;
        const result = ApplicantModel.postApplicant(jobId, name, email, contact, fileName);
        if (result.success) {
            sendNotification(email, "Application has been recieved", "Hello,you have successfully applied for the job");
            return res.redirect(`/jobs/${jobId}`);
        } else {
            return res.render('error404');
        }
    }

    /**To retrieve applicants applied to the spcific job */
    getApplicants(req, res) {
        const applicants = ApplicantModel.get(req.params.id);
        return res.render("applicants", { "applicants": applicants, "userEmail": req.cookies.userEmail });
    }

    /**To render the resume pdf of applicant */
    viewPdf(req, res) {
        let id = req.params.id;
        const filePath = ApplicantModel.getPath(id);
        fs.readFile(filePath, function(err, data) {
            if (err) {
                return res.render("error404");
            }
            res.contentType("application/pdf");
            return res.send(data);
        });
    }
}