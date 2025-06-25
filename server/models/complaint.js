const mongoose = require('mongoose')


const complaintSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    category: String,
    status: { 
        type: String,
        enum: ["Pending", "In Progress", "Resolved"],
        default: 'Pending',
     },
    studentName: {
        type: String,
       
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Complaint = mongoose.model("Complaint",complaintSchema);

module.exports = Complaint;