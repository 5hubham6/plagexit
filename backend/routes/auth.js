// backend/routes/auth.js
router.post('/login', async (req, res) => {
    const { token } = req.body;
    const user = await authenticateUser(token);
    const jwtToken = generateJWT(user);
    res.json({ token: jwtToken });
  });