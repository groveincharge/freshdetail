const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {
		type: String,
		required:true,
		min: 2,
		max: 50
	},
	price: {
		type: Number,
		required:true,
		min: 2,
		max: 255
	},	
	productImage: {
		type: String,
		required:true,
		min: 2,
		max: 50
	},
	date: {
		type: Date,
		required: true,
		default: Date.now
	    }
});

//let Product = module.exports = mongoose.model('Product', productSchema);
module.exports = mongoose.model('Product', productSchema);