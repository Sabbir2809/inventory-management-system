const AppError = require("../errors/AppError");

const create = async (req, Model) => {
  const { email } = req.user;

  const payload = req.body;
  payload.userEmail = email;

  const result = await Model.create(payload);
  return result;
};

const update = async (req, Model) => {
  const { email } = req.user;

  const payload = req.body;
  const id = req.params.id;

  const data = await Model.findOne({ _id: id });
  if (!data) {
    throw new AppError(404, "Data Not Found!");
  }

  const result = await Model.updateOne({ _id: id, userEmail: email }, payload);
  return result;
};

const dropDown = async (req, Model, projection) => {
  const { email } = req.user;

  const result = await Model.aggregate([{ $match: { userEmail: email } }, { $project: projection }]);
  return result;
};

const list = async (req, Model, searchArray) => {
  const { email } = req.user;

  const pageNumber = Number(req.params.pageNumber);
  const perPage = Number(req.params.perPage);
  const searchKeyword = req.params.searchKeyword;

  const skipRow = (pageNumber - 1) * perPage;

  let result;
  if (searchKeyword !== "0") {
    const searchQuery = { $or: searchArray };
    result = await Model.aggregate([
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
    result = await Model.aggregate([
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

const listWithJoin = async (req, Model, searchArray, joinState) => {
  const { email } = req.user;

  const pageNumber = Number(req.params.pageNumber);
  const perPage = Number(req.params.perPage);
  const searchKeyword = req.params.searchKeyword;

  const skipRow = (pageNumber - 1) * perPage;

  let result;
  if (searchKeyword !== "0") {
    const searchQuery = { $or: searchArray };
    result = await Model.aggregate([
      { $match: { userEmail: email } },
      joinState,
      { $match: searchQuery },
      {
        $facet: {
          Total: [{ $count: "count" }],
          Rows: [{ $skip: skipRow }, { $limit: perPage }],
        },
      },
    ]);
  } else {
    result = await Model.aggregate([
      { $match: { userEmail: email } },
      joinState,
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

module.exports = {
  create,
  update,
  dropDown,
  list,
  listWithJoin,
};
