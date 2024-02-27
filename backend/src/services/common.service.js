const create = async (req, Modal) => {
  const { email } = req.user;

  const payload = req.body;
  payload.userEmail = email;

  const result = await Modal.create(payload);
  return result;
};

const dropDown = async (req, Modal, projection) => {
  const { email } = req.user;

  const result = await Modal.aggregate([{ $match: { userEmail: email } }, { $project: projection }]);
  return result;
};

const list = async (req, Modal, searchArray) => {
  const { email } = req.user;

  const pageNumber = Number(req.params.pageNumber);
  const perPage = Number(req.params.perPage);
  const searchKeyword = req.params.searchKeyword;

  const skipRow = (pageNumber - 1) * perPage;

  let result;
  if (searchKeyword !== "0") {
    const searchQuery = { $or: searchArray };
    result = await Modal.aggregate([
      { $match: { userEmail: email } },
      { $match: searchQuery },
      {
        $facet: {
          Total: [{ $count: "count" }],
          Rows: [{ $skip: skipRow }, { $limit: perPage }],
        },
      },
    ]);
  } else {
    result = await Modal.aggregate([
      { $match: { userEmail: email } },
      {
        $facet: {
          Total: [{ $count: "count" }],
          Rows: [{ $skip: skipRow }, { $limit: perPage }],
        },
      },
    ]);
  }
  return result;
};

const update = async (req, Modal) => {
  const { email } = req.user;

  const payload = req.body;
  const id = req.params.id;

  const result = await Modal.updateOne({ _id: id, userEmail: email }, payload);
  return result;
};

module.exports = {
  create,
  dropDown,
  list,
  update,
};
