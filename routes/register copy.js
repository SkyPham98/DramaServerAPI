const router = require("express").Router();

//ADD DRAMA
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    }
    if (!user) {
      return res.status(401).json({
        message: 'Email or password is incorrect'
      });
    }

    // Compare the hashed password
    bcrypt.compare(password, user.password, (error, result) => {
      if (error) {
        return res.status(401).json({
          message: 'Email or password is incorrect'
        });
      }
      if (result) {
        const token = jwt.sign({
            email: user.email,
            userId: user._id
          },
          'secret',
          {
            expiresIn: '1h'
          });
        return res.status(200).json({
          message: 'Auth successful',
          token
        });
      }
      return res.status(401).json({
        message: 'Email or password is incorrect'
      });
    });
  });
});

module.exports = router;