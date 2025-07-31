module.exports.createNote = (req, res) => {
  try {
    let { content, expire, pass } = req.body;

    console.log(content, expire, pass);

    return res.status(200).json({
      noteId: 12345,
      url: `SampleUrl`,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
};

module.exports.getNote = (req, res) => {
  try {
    console.log(req.params.id);

    return res.status(200).json({
      content: "Note Content Here",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
};

module.exports.deleteNote = (req, res) => {
  try {
    console.log(req.params.id);

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
};

module.exports.notifyNote = (req, res) => {
  try {
    let { email, noteId } = req.body;

    console.log(email, noteId);

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
};
