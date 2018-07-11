var Device = require("../models/Device");

//Load input validation
const validate = require("../validation/device/register");

module.exports.register_post = (req, res) => {
	const errors = {};

	Device.findOne({ macaddress: req.body.macaddress }).then(device => {
		if (device) {
			errors.macaddress = "A device with that MAC address already exists";
			return res.status(400).json(errors);
		} else {
			const newDevice = new Device({
				name: req.body.name,
				macaddress: req.body.macaddress,
				manufacturer: req.body.manufacturer,
				model: req.body.model,
				category: req.body.category,
				owner: req.user.id,
				authorizedUsers: req.user.id
			});

			newDevice
				.save()
				.then(device => {
					return res.json(device);
				})
				.catch(err => {
					console.log(err);
					errors.server = "An error occured, please try again";
					return res.status(500).json(errors);
				});
		}
	});
};
