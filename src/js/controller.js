// https://forkify-api.herokuapp.com/v2
import * as model from './model.js';
import 'regenerator-runtime/runtime'; //Polyfil Async/Await
import 'core-js/stable'; //Polyfil rest of stuff
import recipeView from './views/RecipeView.js';
import { async } from 'regenerator-runtime';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksVIew from './views/bookmarksVIew.js';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    //0. Render result active
    resultsView.update(model.resultsPerPage());
    bookmarksVIew.update(model.state.bookmarks);
    // 1.Render Spinner
    recipeView.renderSpinner();

    // 2.Load recipe
    await model.loadRecipe(id);

    // 3.Render data
    recipeView.render(model.state.recipe);
  } catch (e) {
    console.log(e);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // 0. Render Spinner
    resultsView.renderSpinner();
    // 1. Get result
    const keyword = searchView.getQuery();
    if (!keyword) return;

    // 2.Load result
    await model.loadSearchResults(keyword);

    // 3. Render results
    resultsView.render(model.resultsPerPage());

    // 4. Pagination
    paginationView.render(model.state.search);
  } catch (e) {
    throw e;
  }
};

const controlServings = function (op) {
  if (!op) return;
  model.updateServings(op);
  recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const bookmarks = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  bookmarksVIew.render(model.state.bookmarks);
  recipeView.update(model.state.recipe);
};

const controlPagination = function (op) {
  model.state.search.page += op;
  console.log(model.state.search.page);
  resultsView.render(model.resultsPerPage());
  paginationView.render(model.state.search);
};

const controlBookmarks = function () {
  bookmarksVIew.render(model.state.bookmarks);
};

const newFeature = function () {
  console.log(
    'Welcome to the application! This side is on continious deployment integration'
  );
};

const init = function () {
  bookmarksVIew.addHandler(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPage(controlPagination);
  recipeView.updateServings(controlServings);
  recipeView.addBookmark(bookmarks);
  newFeature();
};

init();

// const test = async function () {
//   const res = await fetch(
//     'https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza'
//   );
//   const { data } = await res.json();
//   console.log(data);
// };

// test();
// const testArr = [2, 3, 4, 5, 6, 7, 8, 9];

// const index = testArr.findIndex(el => el === 3);
// console.log(testArr.splice(index, 1));

// console.log(testArr);
