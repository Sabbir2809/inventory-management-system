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
  let session;
  try {
    // begin transaction
    session = await mongoose.startSession();
    await session.startTransaction();

    const { email } = req.user;
    const { parent, child } = req.body;
    parent.userEmail = email;

    // 1st database process
    const parentCreation = await ParentModel.create([parent], { session });

    for (const element of child) {
      element[joinPropertyName] = parentCreation[0]["_id"];
      element["userEmail"] = email;
    }
    // 2nd database process
    const childCreation = await ChildModel.insertMany(child, { session });

    // transaction success
    await session.commitTransaction();
    session.endSession();
    return {
      parent: parentCreation,
      child: childCreation,
    };
  } catch (error) {
    // Rollback transaction and handle errors
    if (session) {
      await session.abortTransaction();
    }
    throw new Error("Transaction failed. Please try again.");
  } finally {
    // End session
    if (session) {
      session.endSession();
    }
  }
};

const multipleDelete = async (req, ParentModel, ChildModel, joinPropertyName) => {
  // create transaction session
  let session;
  try {
    // begin transaction
    session = await mongoose.startSession();
    await session.startTransaction();

    // Define queries
    const { email } = req.user;
    const id = req.params.id;
    const childQuery = { [joinPropertyName]: id, userEmail: email };
    const parentQuery = { _id: id, userEmail: email };

    // 1st database process
    const childDelete = await ChildModel.deleteMany(childQuery).session(session);

    // 2nd database process
    const parentDelete = await ParentModel.deleteOne(parentQuery).session(session);

    // transaction success
    await session.commitTransaction();
    session.endSession();
    return {
      parent: parentDelete,
      child: childDelete,
    };
  } catch (error) {
    // Rollback transaction and handle errors
    if (session) {
      await session.abortTransaction();
    }
    throw new Error(error);
  } finally {
    // End session
    if (session) {
      session.endSession();
    }
  }
};

const remove = async (req, Model) => {
  // Define queries
  const { email } = req.user;
  const result = await Model.deleteMany({ _id: req.params.id, userEmail: email });

  if (result.deletedCount === 0) {
    throw new AppError(404, "Data Not Found!");
  }
  return result;
};

const checkAssociate = async (queryObj, Model) => {
  const result = await Model.aggregate([{ $match: queryObj }]);
  return result.length > 0;
};

module.exports = {
  create,
  update,
  dropDown,
  list,
  multipleCreate,
  multipleDelete,
  remove,
  checkAssociate,
};
