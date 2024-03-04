import { body, validationResult } from 'express-validator'

/**Apply form validation */
export const validateApplication = async(req, res, next) => {
    const rules = [
        body('name').notEmpty().withMessage("Name is required"),
        body('email').isEmail().withMessage("Invalid email"),
        body('contact').notEmpty().withMessage('Contact is required'),
        body('resume').custom((value, { req }) => {
            if (!req.file) {
                throw new Error("File is required");
            } else {
                return true;
            }
        })
    ]

    await Promise.all(rules.map(rule => rule.run(req)));

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array();
        return res.render('apply', { "errors": errors[0], "userEmail": req.cookies.userEmail });
    }
    next();
}