const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
	name: {
		// this are all validation that are used to validate a task definition in Mongoose schema 
		type: String,
		required: [true, "name cannot be empty"],
		trim: true,
		maxLength: [20, "name cannot be 20 characters long"],
	},
	completed: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model("Task", TaskSchema);


