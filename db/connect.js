const mongoose = require("mongoose");

// const connect = async (url) => {
// 	try {
// 		await mongoose.connect(url, {
// 			useNewUrlParser: true,
// 			useUnifiedTopology: true,
// 		});
// 		console.log("Connected successfully to DB...");
// 	} catch (error) {
// 		console.log(error.message);
// 	}
// };
// connect('mongodb+srv://debanganBR:LNAX1h0dZoAyznJ0@cluster0.pab7wjt.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority'
// );
// module.exports = connect



const connecteDB = (url) => {
	return mongoose.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
};

module.exports = connecteDB;
