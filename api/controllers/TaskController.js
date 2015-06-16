module.exports = {
	all: function(req, res) {
		Task.find().sort({ _id : -1 }).exec(function createCB (err, tasks) {
			return res.view('index', {tasks: tasks});
		});
	},

	create: function(req, res) {
		var name = req.param('name');
		// var now  = Date().
		if(!req.param('name')) {
			return res.redirect('/')
		}

		Task.create({name: name}).exec(function createCB(err, created){

			if(err) { return res.json({error: err})}
			return res.redirect('/');
		});
	},

	toggleComplete: function(req, res) {
		var id = req.params.id;

		Task.findOne(id).exec(function createCB(err, task) {
			Task.update(task.id, {is_complete: !task.is_complete}).exec(function createCB(err, updated) {
				if(err) { console.log(err); }
				return res.redirect('/');
			});
		});
	},

	clearComplete: function(req, res) {
		Task.destroy({is_complete: true}).exec(function createCB(err, cleared) {
			if (err) { return res.json({error: err}) }
			return res.redirect('/');
		})
	}
}