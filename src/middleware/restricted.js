//restricted to

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                res.status(403).json({
                    message: res.__('permission')
                })
            )
        }
        next()
    }
  }