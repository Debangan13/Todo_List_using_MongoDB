// const Task = require("../modeles/task");

// --------------------------------Using Try and catch blocks--------------------------------

// const getallTasks = async (req, res) => {
// 	try {
// 		const allTask = await Task.find({});
// 		// if (allTask.length == 0) {
// 		// 	return res.json({ message: "No tasks found in database" });
// 		// }
// 		res.status(200).json({ allTask });
// 	} catch (error) {
// 		res.status(500).json({ msg: error });
// 	}
// };

// const createTask = async (req, res) => {
// 	try {
// 		const task = await Task.create(req.body);
// 		res.status(201).json({ task });
// 	} catch (error) {
// 		// console.log(error.errors['name'].message);
// 		res.status(500).json({ msg: error });
// 	}
// };

// const getTask = async (req, res) => {
// 	try {
// 		// const findData = await Task.findById(req.params.id).exec()
// 		// res.send(findData);

// 		const { id: taskID } = req.params;
// 		const task = await Task.findOne({ _id: taskID });
// 		if (!task) {
// 			return res.status(404).json({ msg: `not task with id ${taskID}` });
// 		}

// 		res.status(200).json({ task });
// 	} catch (error) {
// 		res.status(500).json({ msg: error });
// 	}
// };

// const updateTask = async (req, res) => {
// 	try {
// 		const { id: taskID } = req.params;
		
// 		const task = await Task.findOneAndUpdate({ _id: taskID }, req.body,{
// 			//new - if true ,return the modified document rather than the original
// 			new: true,
// 			// it runs the validation set on the task
// 			runValidators:true
// 		});		
// 		if (!task) {
// 			return res.status(404).json({ msg: `not task with id ${taskID}` });
// 		}
// 		res.status(200).json({ task });
// 	} catch (error) {
// 		res.status(500).json({ msg: error });
// 	}
// };

// const deleteTask = async (req, res) => {
// 	try {
// 		const { id: taskID } = req.params;
// 		const task = await Task.findOneAndDelete({ _id: taskID });
// 		if (!task) {
// 			return res.status(404).json({ msg: `not task with id ${taskID}` });
// 		}
// 		res.status(200).send({ task });
// 	} catch (error) {
// 		res.status(500).json({ msg: error });
// 	}
// };

// -------------------------------- Using asyncWrapper --------------------------------
const Task = require('../modeles/task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custome-error.js')
const getallTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Task.findOne({ _id: taskID })
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }

  res.status(200).json({ task })
})
const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndDelete({ _id: taskID })
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }
  res.status(200).json({ task })
})
const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }

  res.status(200).json({ task })
})

module.exports = {
	getallTasks,
	createTask,
	getTask,
	updateTask,
	deleteTask,
};
