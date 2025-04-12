const authUser = (req, res, next) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  };
  
const authFarmer = (req, res, next) => {
if (req.session.userType !== 'farmer') {
    return res.status(403).json({ message: 'Farmer access required' });
}
next();
};

const authAdmin = (req, res, next) => {
  if (req.session.userType !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
  }
  next();
  };

module.exports = { authUser, authFarmer, authAdmin };