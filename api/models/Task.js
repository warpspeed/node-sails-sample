module.exports = {
	attributes: {
		name: {
			type: 'string'
		},

		is_complete: {
			type: 'boolean',
			defaultsTo: false
		},

		created_at: {
			type: 'datetime'
		},

		updated_at: {
			type: 'datetime'
		}
	},
};