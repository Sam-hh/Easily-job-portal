const jobs = [{
    id: 1,
    jobCategory: 'software',
    jobDesignation: 'Developer',
    jobLocation: 'Delhi',
    companyName: 'Infosys',
    salary: '500000',
    applyBy: 'Infosys',
    skillsRequired: 'C++,Java,PHP,Jquery',
    numberOfOpenings: '10',
    jobPosted: '2024-03-03',
    applicants: 'Engineer',
    createdBy: 'punitdekate.1999@gmail.com'
}, {
    id: 2,
    jobCategory: 'software',
    jobDesignation: 'Tester',
    jobLocation: 'Noida',
    companyName: 'Deloitte',
    salary: '500000',
    applyBy: 'Deloitte',
    skillsRequired: 'C++,Java,HTML,CSS',
    numberOfOpenings: '100',
    jobPosted: '2024-03-03',
    applicants: 'Engineer',
    createdBy: "punitdekate.1999@gmail.com"
}, {
    id: 3,
    jobCategory: 'Tester',
    jobDesignation: 'Automation',
    jobLocation: 'Pune',
    companyName: 'TCS',
    salary: '500000',
    applyBy: 'HM ',
    skillsRequired: 'C++,Java',
    numberOfOpenings: '100',
    jobPosted: '2024-03-03',
    applicants: 'Engineer',
    createdBy: "punitdekateofficial@gmail.com"

}, {
    id: 4,
    jobCategory: 'software',
    jobDesignation: 'Developer',
    jobLocation: 'Noida',
    companyName: 'HM',
    salary: '500000',
    applyBy: 'HM ',
    skillsRequired: 'C++,Java',
    numberOfOpenings: '100',
    jobPosted: '2024-03-03',
    applicants: 'Engineer',
    createdBy: "nuttubandar.1999@gmail.com"

}];
export default class JobModel {
    constructor(_jobCategory, _jobDesignation, _jobLocation, _companyName, _salary, _applyBy, _skillsRequired, _numberOfOpening, _jobPosted, _applicants, _createdBy) {
        this.id = jobs.length + 1;
        this.jobCategory = _jobCategory;
        this.jobDesignation = _jobDesignation;
        this.jobLocation = _jobLocation;
        this.companyName = _companyName;
        this.salary = _salary;
        this.applyBy = _applyBy;
        this.skillsRequired = _skillsRequired;
        this.numberOfOpening = _numberOfOpening;
        this.jobPosted = _jobPosted;
        this.applicants = _applicants;
        this.createdBy = _createdBy;
    }

    /**To recieve response from the create new job form */
    static createJob(jobDetails, email) {
        const { jobCategory, jobDesignation, jobLocation, companyName, salary, applyBy, skillsRequired, numberOfOpening, jobPosted, applicants } = jobDetails;
        const createdBy = email
        const newJob = new JobModel(jobCategory, jobDesignation, jobLocation, companyName, salary, applyBy, skillsRequired, numberOfOpening, jobPosted, applicants, createdBy);
        jobs.push(newJob);
        return true;
    }

    /**Retrieve the list of jobs */
    static getJobList() {
        return jobs;
    }

    /**To retrieve the specific job */
    static getSpecificJob(id) {
        const job = jobs.find(job => job.id == id);
        return job;
    }

    /**To delete the specific job */
    static delete(id) {
        const index = jobs.findIndex(job => job.id == id);
        if (index >= 0) {
            const deletedJob = jobs[index];
            jobs.splice(index, 1);
            return { "success": true, "msg": deletedJob };
        }
        return { "success": false, "msg": "Job not found!" };

    }

    /**To update the specific job on the site */
    static update(id, jobDetails) {
        const index = jobs.findIndex(job => job.id == id);
        if (index >= 0) {
            const updatedJob = {
                "id": id,
                "jobCategory": jobDetails.jobCategory,
                "jobDesignation": jobDetails.jobDesignation,
                "jobLocation": jobDetails.jobLocation,
                "companyName": jobDetails.companyName,
                "salary": jobDetails.salary,
                "applyBy": jobDetails.applyBy,
                "skillsRequired": jobDetails.skillsRequired,
                "numberOfOpening": jobDetails.numberOfOpening,
                "jobPosted": jobDetails.jobPosted,
                "applicants": jobDetails.applicants,
            }
            jobs[index] = updatedJob;
            return { "success": true, "msg": updatedJob }
        } else {
            return { "success": false, "msg": "Something went wrong" }
        }
    }

    /**To filter the jobs on the search query */
    static filter(query) {
        query = query.toLowerCase();
        const jobsFiltered = jobs.filter((ele) => {
            return ele.companyName.toLowerCase().includes(query) || ele.jobCategory.toLowerCase().includes(query) || ele.jobCategory.toLowerCase().includes(query);
        })
        return { "success": true, "msg": jobsFiltered };
    }

    /**To filter out the jobs posted by the recuiter */
    static postedByLoginUser(userEmail) {
        const filteredByLoginUser = jobs.filter(job => job.createdBy == userEmail);
        return { "success": true, "msg": filteredByLoginUser };
    }
}