import React, { useState } from 'react';


export default function AddRecipe ({ onAddRecipe }) {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [difficulty, setDifficulty] = useState(''); // Added difficulty state
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [authorImage, setAuthorImage] = useState(null);
  const [authorImagePreview, setAuthorImagePreview] = useState(null);
 

  const handleIngredientChange = (index, event) => {
    const values = [...ingredients];
    values[index] = event.target.value;
    setIngredients(values);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleRemoveIngredient = (index) => {
    const values = [...ingredients];
    values.splice(index, 1);
    setIngredients(values);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAuthorImageChange = (event) => {
    const file = event.target.files[0];
    setAuthorImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAuthorImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newRecipe = {
      id: Date.now(),
      title: recipeName,
      ingredients: ingredients.filter(ingredient => ingredient),
      instructions: instructions.split('\n'),
      cookingTime: `${cookingTime} mins`,
      difficulty, // Added difficulty field
      author, // Added author field
      image: imagePreview,
      authorImg: authorImagePreview, // Placeholder for author image
    };

    onAddRecipe(newRecipe);
    // Reset form
    setRecipeName('');
    setIngredients(['']);
    setInstructions('');
    setCookingTime('');
    setDifficulty(''); // Reset difficulty
    setAuthor(''); // Reset author
    setImage(null);
    setImagePreview(null);
    setAuthorImage(null);
    setAuthorImagePreview(null);
  };

  return (
    <form onSubmit={handleSubmit} className="add-recipe-form">
      <div>
        <label>Recipe Name</label>
        <input
          type="text"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Ingredients</label>
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e)}
              required
            />
            {index > 0 && (
              <button type="button" onClick={() => handleRemoveIngredient(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddIngredient}>
          Add Ingredient
        </button>
      </div>
      <div>
        <label>Instructions</label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Cooking Time (minutes)</label>
        <input
          type="number"
          value={cookingTime}
          onChange={(e) => setCookingTime(e.target.value)}
          required
          min="1"
        />
      </div>
      <div>
        <label>Difficulty</label>
        <input
          type="text"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        />
      </div>
      <div>
        <label>Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <label>Image Upload</label>
        <input type="file" onChange={handleImageChange} />
        {imagePreview && <img src={imagePreview} alt="Recipe" />}
      </div>
      <div>
        <label>Author Image Upload</label>
        <input type="file" onChange={handleAuthorImageChange} />
        {authorImagePreview && <img src={authorImagePreview} alt="Author" />}
      </div>
      <button type="submit">Add Recipe</button>
    </form>
  );
};
