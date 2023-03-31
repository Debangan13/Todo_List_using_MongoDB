const mongoose = require("mongoose");

const connecteDB = (url) => {
	return mongoose.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
};

module.exports = connecteDB;
