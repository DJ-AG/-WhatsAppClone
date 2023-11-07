import createHttpError from "http-errors";

export const createUser = async (userData) => {
  const { name, email, password, avatar, status } = userData;

  // check if fields are empty

  if (!name || !email || !password) {
    throw createHttpError.BadRequest("Please fill in all fields");
  }
};
