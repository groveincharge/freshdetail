const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require("./../../models/Product");
const {authmiddleware} = require('./../auth');
const multer = require('multer');

const storage = multer.diskStorage({
                          destination: function(req, file, cb) {
                                        cb(null, './uploads');        
                                      },
                          filename: function(req, file, cb) {
                                   cb(null, file.originalname);
                                     }
								 });	
								 							 
const upload = multer({storage: storage});

/* GET users listing. */
router.get('/', authmiddleware, function(req, res, next) {
        Product.find()
        .select('name price productImage _id')
        .exec()
        .then(docs => {
			res.status(200).json({
					count: docs.length,
					products: docs.map(doc => {
						return {
							name: doc.name,
							price: doc.price,
							productImage: doc.productImage,
							_id: doc._id,
							request: {
								type: 'GET',
								url: 'http://localhost:4000/api/product/' + _id
							}
						}
					})
			})
        })
     .catch(err => {
                 res.status(500).json({
                         error: err
                          })
              });
   });

router.get('/:productId', authmiddleware, function(req, res, next) {
	const id = req.params.productId;
	User.findById(id)
	.select('name price productImage _id')
	.exec()
    .then(doc => {
    	console.log(doc);
    	if(doc){
    	res.status(200).json({
    		   product: doc,
    		   request: {
    		   	    type: 'GET',
    		   	    url: 'http://localhost:4000/api/product/' + product._id
    		   }
    	});
       }
  })
    .catch(err => {
    	console.log(err);
        res.status(500).json({error: err })
     });
});

router.post('/', authmiddleware, upload.single('productImage'), (req, res) => {
	console.log('Inside POST /api/product callback');
	console.log(`req.session.id: ${JSON.stringify(req.session.id)}`);
	console.log(`req.session from POST /api/product route ${JSON.stringify(req.session)}`);
	console.log(`req.isAuthenticated from POST /api/product route ${req.isAuthenticated()}`);
	 console.log(`req.user from POST /api/product route ${req.user}`);
   console.log(`req.file from inside POST /api/product router ${JSON.stringify(req.file)}`);
const product = new Product({
                 _id: new mongoose.Types.ObjectId(),
                 name: req.body.name,
                 price: req.body.price,
                 productImage: req.file.path
    });

   product.save()
          .then(result => {
	console.log(`Saved item from inside POST router ${result}`);
	res.status(201).json({
		 message: 'Product successfully saved to database.',
         createdProduct: {
         	        name: result.name,
         	        price: result.price,
                    productImage: result.productImage,
         	        _id: result._id,
         	       request: {
         	       	       type: 'GET',
         	       	       url: 'http://localhost:4000/api/product/' + result._id
         	               }

         }
	});
       })
.catch(err => {
	console.log(err);
	res.status(500).json({ error: err })
    });
});

router.delete('/:productId', authmiddleware, function(req, res, next) {
	const id = req.params.productId;
	User.deleteOne({ _id: id })
	.exec()
	.then(result => {
		res.status(200).json({
			 message: 'Product Deleted',
			 request: {
			 	type: 'POST',
			 	url: 'http://localhost:4000/api/product/',
			 	body: {name: 'String', price: 'Number'}
			 }
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({ error: err });
	  });
	});

router.patch("/:productId", authmiddleware, function(req, res, next) {
	const id = req.params.productId;
	const updateOps = {};
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	User.update({_id: id}, { $set: updateOps})
	.exec()
	.then(result =>{
		res.status(200).json({
			message: 'Product Update',
			request: {
				type: 'GET',
				url: 'http://localhost:4000/api/product/' + id
			}
		});
	})
	.catch(err =>{
		console.log(err);
		res.status(500).json({error: err});
	})
});

module.exports = router;