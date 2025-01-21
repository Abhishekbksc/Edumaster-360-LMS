const Complain = require('../models/complainSchema.js');

// Create a new complaint
const complainCreate = async (req, res) => {
    try {
        // Validate required fields
        if (!req.body.user || !req.body.complaint || !req.body.school) {
            return res.status(400).json({ message: "All required fields (user, complaint, school) must be provided." });
        }

        // Create a new complaint document using request body
        const complain = new Complain({
            user: req.body.user,
            complaint: req.body.complaint,
            school: req.body.school,
            date: new Date()
        });

        // Save the complaint in the database
        const result = await complain.save();
        return res.status(201).json(result); // Send the created complaint as response
    } catch (err) {
        console.error('Error creating complaint:', err);
        res.status(500).json({ message: "Error saving complaint", error: err });
    }
};

// Get the list of complaints for a specific school
const complainList = async (req, res) => {
    try {
        // Check if school ID is provided in the request parameters
        if (!req.params.id) {
            return res.status(400).json({ message: "School ID is required." });
        }

        // Fetch complaints for the given school ID and populate 'user' and 'school' references
        const complains = await Complain.find({ school: req.params.id })
            .populate('user', 'name') // Populating student details (only 'name' in this case)
            .populate('school', 'name'); // Populating admin details (you can adjust what you want to populate here)

        // Return complaints if found, otherwise return a message
        if (complains.length > 0) {
            return res.status(200).json(complains);
        } else {
            return res.status(404).json({ message: "No complaints found for this school." });
        }
    } catch (err) {
        console.error('Error fetching complaints:', err);
        res.status(500).json({ message: "Error fetching complaints", error: err });
    }
};

// Optional: Endpoint to get complaints by student ID (if needed)
const complainListByStudent = async (req, res) => {
    try {
        // Validate student ID is passed in request params
        if (!req.params.studentId) {
            return res.status(400).json({ message: "Student ID is required." });
        }

        const complains = await Complain.find({ user: req.params.studentId })
            .populate('school', 'name'); // Optionally populate school details if needed

        if (complains.length > 0) {
            return res.status(200).json(complains);
        } else {
            return res.status(404).json({ message: "No complaints found for this student." });
        }
    } catch (err) {
        console.error('Error fetching student complaints:', err);
        res.status(500).json({ message: "Error fetching student complaints", error: err });
    }
};

module.exports = { complainCreate, complainList, complainListByStudent };
