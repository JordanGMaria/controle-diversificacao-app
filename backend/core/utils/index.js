exports.onlyRoot = (req, res, next) => {
  if (!req.decoded.root) {
    return res.status(403).send({
      success: false,
      message: 'Acesso negado, somente root!'
    });
  } else {
    next();
  }
};
