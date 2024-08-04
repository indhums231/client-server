import React, { useState } from "react";
import CustomImage from "./CustomImage";
import { faEdit, faTrashAlt, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RecipeCard({ recipe, onEdit, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState(recipe);

  const handleViewRecipeClick = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      onDelete(recipe.id);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRecipe(prevRecipe => ({
      ...prevRecipe,
      [name]: value.split('\n')
    }));
  };

  const handleSaveClick = () => {
    onEdit(editedRecipe);
    setEditMode(false);
  };

  return (
    <div className={`recipe-card ${isExpanded ? "expanded" : ""}`}>
      <CustomImage imgSrc={recipe.image} />
      <div className="recipe-card-info">
        <img className="author-img" src={recipe.authorImg} alt="" />
        <p className="recipe-title">{recipe.title}</p>
        <p className="recipe-desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        <a className="view-btn" onClick={handleViewRecipeClick}>VIEW RECIPE</a>
        {isExpanded && (
          <div className="recipe-details">
            <div className="details-header">
              <h3>Ingredients</h3>
              {editMode ? (
                <textarea
                  name="ingredients"
                  value={editedRecipe.ingredients.join('\n')}
                  onChange={handleInputChange}
                />
              ) : (
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="details-header">
              <h3>Instructions</h3>
              {editMode ? (
                <textarea
                  name="instructions"
                  value={editedRecipe.instructions.join('\n')}
                  onChange={handleInputChange}
                />
              ) : (
                <ol>
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              )}
            </div>
            <p><strong>Cooking Time:</strong> {editMode ? <input name="cookingTime" value={editedRecipe.cookingTime} onChange={handleInputChange} /> : recipe.cookingTime}</p>
            {recipe.difficulty && <p><strong>Difficulty:</strong> {editMode ? <input name="difficulty" value={editedRecipe.difficulty} onChange={handleInputChange} /> : recipe.difficulty}</p>}
            {recipe.author && <p><strong>Author:</strong> {editMode ? <input name="author" value={editedRecipe.author} onChange={handleInputChange} /> : recipe.author}</p>}
            <div className="recipe-actions">
              {editMode ? (
                <button onClick={handleSaveClick}>
                  <FontAwesomeIcon icon={faSave} /> Save
                </button>
              ) : (
                <>
                  <button onClick={handleEditClick}>
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </button>
                  <button onClick={handleDeleteClick}>
                    <FontAwesomeIcon icon={faTrashAlt} /> Delete
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
