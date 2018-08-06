const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogSchema = new Schema({
	type: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	device: {
		type: Schema.Types.ObjectId,
		ref: "devices"
	},
	device: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},
	status: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Log = mongoose.model("logs", DeviceSchema);
