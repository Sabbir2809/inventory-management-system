const mongoose = require("mongoose");
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

const multipleCreate = async (req, ParentModel, ChildModel, joinPropertyName) => {
  // create transaction session
  const session = await mongoose.startSession();
  try {
    // begin transaction
    await session.startTransaction();

    // 1st database process
    const { email } = req.user;
    const parent = req.body["parent"];
    parent.userEmail = email;
    const parentCreation = await ParentModel.create([parent], { session });

    // 2nd database process
    const child = req.body["child"];
    const PurchaseSummaryId = parentCreation[0]["_id"];
    await child.forEach((element) => {
      element[joinPropertyName] = PurchaseSummaryId;
      element["userEmail"] = email;
    });
    const childCreation = await ChildModel.insertMany(child, { session });

    // transaction success
    await session.commitTransaction();
    session.endSession();
    return {
      parent: parentCreation,
      child: childCreation,
    };
  } catch (error) {
    // roll back transaction if fail
    await session.abortTransaction();
    session.endSession();
    throw new AppError(400, "Purchase Fail");
  }
};

module.exports = {
  create,
  update,
  dropDown,
  list,
  multipleCreate,
};
