const moongoose = require('mongoose');

const newsletterSchema = moongoose.Schema({
    email: {
        type: "String",
        required: [true, 'Please enter an email'],

    },
    type: {
        type: String,
        default: 'newsletter'
    }
}, {
    timestamps: true
});

module.exports = moongoose.model('Newsletter', newsletterSchema);