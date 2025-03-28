const mongoose = require('mongoose');

// create mongoose schema
const ClientSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
	},
	phone: {
		type: String,
	},
})

module.exports = mongoose.model('Client', ClientSchema);