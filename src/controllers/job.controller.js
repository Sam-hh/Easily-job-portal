import JobModel from '../models/job.model.js'

export default class JobController {

    /**Accept response from the  create new job form */
    postJobs(req, res) {
        const jobDetails = req.body;
        const email = req.cookies.userEmail;
        const result = JobModel.createJob(jobDetails, email);
        if (result) {
            const jobs = JobModel.getJobList();
            return res.render("jobs", { "jobs": jobs, "userEmail": req.cookies.userEmail });
        } else {
            return res.render("error404");
        }

    }

    /**List down all the jobs*/
    getJobs(req, res) {
        const jobs = JobModel.getJobList();
        return res.render('jobs', { "jobs": jobs, "userEmail": req.cookies.userEmail });
    }

    /**Get Details of the specific job picked */
    getJobDetails(req, res) {
        const id = req.params.id;
        const result = JobModel.getSpecificJob(id);
        if (result) {
            return res.render("view-details", { "job": result, "userEmail": req.cookies.userEmail });
        } else {
            return res.render("error404");
        }

    }

    /**To update the specific job */
    putJobDetails(req, res) {
        const jobDetails = req.body;
        const id = req.params.id;
        const result = JobModel.update(id, jobDetails);
        if (result.success) {
            return res.redirect(`/jobs/${id}`);
        } else {
            return res.render("error404");
        }
    }

    /**To delete the specific job*/
    deleteJob(req, res) {
        const result = JobModel.delete(req.params.id);
        if (result.success) {
            const jobs = JobModel.getJobList();
            return res.render('jobs', { "jobs": jobs, "userEmail": req.cookies.userEmail });
        } else {
            return res.render("error404");
        }
    }

    addNewJob(req, res) {
        return res.render("add-job", { "errors": null, "userEmail": req.cookies.userEmail });
    }

    /**Search the job based on the query */
    search(req, res) {
        let { search } = req.body;
        const jobsFiltered = JobModel.filter(search);
        return res.render('jobs', { "jobs": jobsFiltered.msg, "userEmail": req.cookies.userEmail })
    }

    /**Filter the jobs posted by the logged in user*/
    filter(req, res) {
        let userEmail = req.cookies.userEmail;
        const filterJobs = JobModel.postedByLoginUser(userEmail);
        return res.render('jobs', { "jobs": filterJobs.msg, "userEmail": req.cookies.userEmail })
    }
}