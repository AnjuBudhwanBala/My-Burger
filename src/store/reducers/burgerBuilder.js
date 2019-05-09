import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};
const INGREDIENT_PRICE = {
  salad: 0.5,
  meat: 1.3,
  cheese: 0.4,
  bacon: 0.7
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
      };
    case actionTypes.SET_INGREDIENT:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
          bacon: action.ingredients.bacon
        },
        totalPrice: 4,
        error: false
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        error: true
      };
    default:
      return state;
  }
};

export default reducer;
