const mongoose = require('mongoose');

// create mongoose schema
const ProjectSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	description: {
		type: String,
	},
	status: {
		type: String,
		enum: ['Not Started', 'In Progress', 'Completed'],
	},
	clientId: {
		type: mongoose.Schema.Types.ObjectId, // object id = the index in mongo
		ref: 'Client', // refer to client model
	},

})

module.exports = mongoose.model('Project', ProjectSchema);