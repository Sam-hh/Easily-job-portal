import { body, validationResult } from 'express-validator'
/**Create New Job Validation middleware */
export const validateNewJob = async(req, res, next) => {
    const rules = [
        body('jobCategory').notEmpty().withMessage("Job Category is required"),
        body('jobDesignation').notEmpty().withMessage("Job Designation is required"),
        body('jobLocation').notEmpty().withMessage("Job Loaction is required"),
        body('companyName').notEmpty().withMessage('Company Name is required'),
        body('salary').notEmpty().withMessage('Salary is required'),
        body('numberOfOpenings').notEmpty().withMessage('Openings are required')
    ]

    await Promise.all(rules.map(rule => rule.run(req)));

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array();
        return res.render('add-job', { "errors": errors[0], "userEmail": req.cookies.userEmail });
    }
    next();
}