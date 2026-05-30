const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const UnlistedShare = require('../models/UnlistedShare');
const PreIPO = require('../models/PreIPO');
const FixedDeposit = require('../models/FixedDeposit');
const Insurance = require('../models/Insurance');
const MutualFund = require('../models/MutualFund');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.get('/unlisted-shares', async (req, res) => {
    try {
        const shares = await UnlistedShare.find({});
        res.render('unlistedshares', { shares });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});



router.get('/disclaimers', (req, res) => {
    res.render('disclaimers');
});

router.get('/unlisted-shares/:slug', async (req, res) => {
    try {
        const share = await UnlistedShare.findOne({ slug: req.params.slug });
        if (!share) {
            return res.status(404).send('Share not found');
        }
        res.render('unlistedsharesdetails', { share });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/pre-ipo', async (req, res) => {
    try {
        const companies = await PreIPO.find({});
        res.render('preipo', { companies });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
router.get('/physicaltodemat', (req, res) => {
    res.render('physicaltodemat');
});

router.get('/mutual-funds', async (req, res) => {
    try {
        const mutualFunds = await MutualFund.find({});
        res.render('mutual-funds', { mutualFunds });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/fixed-deposits', async (req, res) => {
    try {
        const fds = await FixedDeposit.find({});
        res.render('fd', { fds });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/insurance', async (req, res) => {
    try {
        const plans = await Insurance.find({});
        res.render('Insurance', { plans });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/send-email', async (req, res) => {
    try {
        const data = req.body;

        // Check if there is a specific form name or title passed, else default
        const formSource = data.formSource || 'Website';
        delete data.formSource; // remove from iteration if it exists

        let mailContent = `<h3>New Submission from: ${formSource}</h3><ul>`;
        for (const [key, value] of Object.entries(data)) {
            // Convert camelCase or dashed keys to Title Case for better readability
            const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace(/-/g, ' ');
            mailContent += `<li><strong>${formattedKey}:</strong> ${value}</li>`;
        }
        mailContent += '</ul>';

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.EMAIL, // Send to company email
            subject: `New Lead - ${formSource}`,
            html: mailContent
        };

        await transporter.sendMail(mailOptions);

        // Respond for AJAX or normal form
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            res.status(200).json({ success: true, message: 'Message sent successfully!' });
        } else {
            res.send('<script>alert("Message sent successfully!"); window.history.back();</script>');
        }
    } catch (err) {
        console.error(err);
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            res.status(500).json({ success: false, message: 'Failed to send message.' });
        } else {
            res.status(500).send('Failed to send message. Please try again.');
        }
    }
});

const Subscriber = require('../models/Subscriber');



router.post('/subscribe', async (req, res) => {
    try {
        const { email } = req.body;

        // Basic server-side email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Please provide a valid email address." });
        }

        // Check if subscriber already exists
        const existingSubscriber = await Subscriber.findOne({ email: email.toLowerCase() });
        if (existingSubscriber) {
            return res.status(409).json({ success: false, message: "This email is already subscribed to our newsletter." });
        }

        // Create new subscriber
        const newSubscriber = new Subscriber({ email: email.toLowerCase() });
        await newSubscriber.save();

        res.status(200).json({ success: true, message: "Thank you for subscribing to our newsletter!" });
    } catch (err) {
        console.error("Subscription Error:", err);
        res.status(500).json({ success: false, message: "An error occurred while processing your request. Please try again later." });
    }
});

module.exports = router;
