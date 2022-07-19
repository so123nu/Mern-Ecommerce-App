const NewsletterModel = require('../models/NewsletterModel');
const { fullUrl } = require('../helpers/Helper');


const createNewsletter = async (req, res) => {
    const { email } = req.body
    let url = fullUrl(req, res);

    try {
        let url = fullUrl(req, res);

        const newsletter = await NewsletterModel.create({
            email,
        });

        req.flash('message', 'Thank you for subscribing to our newsletter.!');
        res.redirect('back');


    } catch (error) {
        if (error.name === 'ValidationError') {
            let errors = [];

            Object.keys(error.errors).forEach((key) => {

                errors.push(errors[key] = error.errors[key].message);
            });

            if (errors[0] == 'Please enter an email') {
                let errs = [
                    {
                        "errors": [{ msg: "Please Enter an email to subscribe to newsletter.!" }]
                    }
                ];
                req.flash('errors', errs);
            }


            res.redirect('back');

        }
    }
}


module.exports = {
    createNewsletter,
}