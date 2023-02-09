const router = require("express").Router();

//ADD DRAMA
router.post("/register", (req, res) => {
    const { name, email, password } = req.body;
  
    // Hash the password
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      } else {
        // Create a new user
        const user = new User({
          name,
          email,
          password: hash
        });
  
        // Save the user to the database
        user.save((error) => {
          if (error) {
            return res.status(500).json({
              error
            });
          }
          res.json({
            message: 'User created successfully'
          });
        });
      }
    });
  });

module.exports = router;