const applicants = [{
    "id": 1,
    "jobId": 1,
    "name": "Natasha",
    "email": "nattu@gmail.com",
    "contact": "9568471292",
    "resumePath": "public/resumes/1708279151713-Punit's Latest Resume.pdf"
}, {
    "id": 2,
    "jobId": 1,
    "name": "Punit",
    "email": "punit@gmail.com",
    "contact": "9568471292",
    "resumePath": "public/resumes/1708279151713-Punit's Latest Resume.pdf"
}, {
    "id": 3,
    "jobId": 2,
    "name": "Jayesh",
    "email": "jayesh@gmail.com",
    "contact": "9568471292",
    "resumePath": "public/resumes/1708279151713-Punit's Latest Resume.pdf"
}];
import JobModel from "./job.model.js";
export default class ApplicantModel {
    constructor(_jobId, _name, _email, _contact, _resumePath) {
        this.id = applicants.length + 1;
        this.jobId = _jobId
        this.name = _name;
        this.email = _email;
        this.contact = _contact;
        this.resumePath = _resumePath;
    }

    /**To Retrieve all the applicants */
    static getApplicants() {
        return applicants;
    }

    /**To save the response of the user apply for the job */
    static postApplicant(jobId, name, email, contact, fileName) {
        const applicantPresent = applicants.find(applicant => applicant.jobId == jobId && applicant.email == email);
        if (applicantPresent) {
            return { "success": false, "message": "Already Applied!", "errors": null };
        } else {
            const newApplicant = new ApplicantModel(jobId, name, email, contact, fileName);
            applicants.push(newApplicant);
            return { "success": true, "message": "Applied Successfully!", "errors": null }
        }
    }

    /**To retrieve all the applicants applied for the specific job */
    static get(jobId) {
        const applicant = applicants.filter(app => app.jobId == jobId);
        return applicant;
    }

    /**To retrieve the path of resume for the the spoecific applicant */
    static getPath(id) {
        let applicant = applicants.find(ele => ele.id == id);
        return applicant.resumePath;
    }

}