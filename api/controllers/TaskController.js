module.exports = {
	all: function(req, res) {
		Tasks.find().sort({ _id : -1 }).exec(function createCB (err, tasks) {
			return res.view('index', {tasks: tasks});
		});
	},

	create: function(req, res) {
		var name = req.param('name');
		if(req.param('name') == '') {
			return res.redirect('/')
		}

		Tasks.create({name: name}).exec(function createCB(err, created){

			if(err) { return res.json({error: err})}
			console.log('Created user with the name' + created.name);
			return res.redirect('/');
		});
	},

	toggleComplete: function(req, res) {
		var id = req.params.id;

		Tasks.findOne(id).exec(function createCB(err, task) {
			Tasks.update(task.id, {is_complete: !task.is_complete}).exec(function createCB(err, updated) {
				if(err) { console.log(err); }
				return res.redirect('/');
			});
		});
	},

	clearComplete: function(req, res) {
		Tasks.destroy({is_complete: true}).exec(function createCB(err, cleared) {
			if (err) { return res.json({error: err}) }

			return res.redirect('/');
		})
	}
}