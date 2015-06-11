module.exports = {
	attributes: {
		name: {
			type: 'string'
		},

		is_complete: {
			type: 'boolean',
			defaultsTo: false
		}
	},

	toggleComplete: function (task, cb) {

		Tasks.update(task.id, {is_complete: !task.is_complete}, function createCB(err, updated)
		{
			if (err) {
				console.log(err);
				return false;
			} else {
				return true;
			}

		});
	}
}