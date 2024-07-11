const Feedback= require("../models/Feedback");
const postFeedback = async (req, res) => {
const { name, email, message } = req.body;
console.log("Received form data:", {
name,
email,
message,
});
const feedback= await Feedback.create({name, email, message})
res.status(201).json({message});
};
module.exports = { postFeedback };
