export const getRandomCocktail = () => 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
export const getPopularCocktails = () => 'https://www.thecocktaildb.com/api/json/v2/9973533/popular.php'
export const getLatestCocktails = () => 'https://www.thecocktaildb.com/api/json/v2/9973533/latest.php'
export const getCocktailsCategories = () => 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
export const getCocktailsByCategories = (category) => `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
export const getCocktailsIngredients = () => "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";
export const getCocktailsByIngredients = (ingredient) => `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
export const getCocktailById = (id) => `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`