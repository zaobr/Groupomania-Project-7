const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_K);
    const user_id = decodedToken.payload.user_id;
    const isAdmin = decodedToken.payload.isAdmin;
    req.auth = {user_id, isAdmin};
    if (req.body.user_id && req.body.user_id !== user_id) {
      throw new Error("Identifiant de l'utilisateur non reconnu");
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Requête invalide!')
    });
  }
};