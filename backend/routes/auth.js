module.exports = {
 authmiddleware: function(req, res, next) {
	if (req.isAuthenticated()) {
	    return next();
	}
	res.redirect('/');
	}
};