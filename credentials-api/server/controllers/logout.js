const logout = async (req, res) => {
  try {
    // returns cookies blank token and username to logout
    res.cookie('token', '', { httpOnly: true });
    res.cookie('username', '', { httpOnly: true });

    return res.status(200).json({ success: true, status: 200 });
  } catch (error) {
    console.error('Error logging out', { error });
    res.status(500).send({
      message: `Try-catch - login - Error logging out ${{ error }}`,
    });
  }
};

module.exports = { logout };