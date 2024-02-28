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

  const data = await Model.findById(id);
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

const list = async (req, Model, searchArray, joinStages = []) => {
  const { email } = req.user;

  const pageNumber = Number(req.params.pageNumber) || 1;
  const perPage = Number(req.params.perPage) || 10;
  const searchKeyword = req.params.searchKeyword || "0";

  const skipRow = (pageNumber - 1) * perPage;

  // stage-1
  const matchStage = { $match: { userEmail: email } };
  // stage-2
  const facetStage = {
    Total: [{ $count: "count" }],
    Rows: [{ $skip: skipRow }, { $limit: perPage }],
  };

  let pipeline = [matchStage, ...joinStages];

  if (searchKeyword !== "0") {
    const searchQuery = { $or: searchArray };
    pipeline = [...pipeline, { $match: searchQuery }];
  }

  const result = await Model.aggregate([...pipeline, { $facet: facetStage }]);
  return result;
};

module.exports = {
  create,
  update,
  dropDown,
  list,
};
