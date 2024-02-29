/************************************Base************************************/
export const BASE_URL = "https://upskilling-egypt.com:443/api/v1";

/************************************Categories************************************/

export const categoriesURL = `${BASE_URL}/Category`;

/************************************Tags************************************/
export const tagsURL = `${BASE_URL}/tag`;

/************************************Users************************************/

export const baseUsers = `${BASE_URL}/Users`;

export const usersURLs = {
  login: baseUsers + "/Login",
  register: baseUsers + "/Register",
  verify: baseUsers + "/verify",
  resetRequest: baseUsers + "/Reset/Request",
  reset: baseUsers + "/Reset",
  changePassword: baseUsers + "/ChangePassword",
  currentUser: baseUsers + "/currentUser",
  delete: baseUsers,
  getUser: baseUsers,
  getAllUsers: baseUsers,
  updateCurrentProfile: baseUsers,
};

/************************************Recipes************************************/
export const recipesURL = `${BASE_URL}/Recipe`;

/************************************Users Recipes************************************/

export const favoriteRecipesURL = `${BASE_URL}/userRecipe`;
