import React, { useState,useEffect } from "react"
import PreviousSearches from "../components/PreviousSearches"
import RecipesCard from "../components/RecipesCard"
import AddRecipe from "../components/AddRecipe"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndo, faPlus } from '@fortawesome/free-solid-svg-icons'
import Model from "../components/Model"

export default function Recipes(){
        const initialRecipes = [ 
        {
            id: 1,
            title: "Chicken Pan Pizza",
            image: "/Images/gallery/img_1.jpg",
            authorImg: "/Images/top chiefs/img_1.jpg",
             ingredients: ["Chicken", "Cheese", "Tomato Sauce", "Dough"],
             instructions: ["Preheat oven", "Prepare dough", "Add toppings", "Bake"],
             cookingTime: "30 mins",
             difficulty: "Medium",
             author: "Chef John",
        }, 
        {
            id: 2,
            title: "Spaghetti and Meatballs",
            image: "/Images/gallery/img_4.jpg",
            authorImg: "/Images/top chiefs/img_2.jpg",
            ingredients: ["Spaghetti", "Meatballs", "Tomato Sauce"],
            instructions: ["Cook spaghetti", "Prepare meatballs", "Combine with sauce"],
            cookingTime: "45 mins",
            difficulty: "Hard",
            author: "Chef Maria",
        },
        {
            id: 3,
            title: "American Cheese Burger",
            image: "/Images/gallery/img_5.jpg",
            authorImg: "/Images/top chiefs/img_3.jpg",
            ingredients: ["Ground Beef", "Cheese", "Lettuce", "Tomato", "Bun"],
            instructions: ["Grill beef patty", "Assemble burger with cheese and veggies", "Serve"],
            cookingTime: "20 mins",
            difficulty: "Easy",
            author: "Chef Mike",
        },
        {
            id: 4,
            title: "Mutton Biriyani",
            image: "/Images/gallery/img_6.jpg",
            authorImg: "/Images/top chiefs/img_5.jpg",
            ingredients: ["Mutton", "Rice", "Yogurt", "Spices"],
            instructions: ["Marinate mutton", "Cook rice with spices", "Combine and cook"],
            cookingTime: "1.5 hrs",
            difficulty: "Medium",
            author: "Chef Arjun",
        },
        {
            id: 5,
            title: "Japanese Sushi",
            image: "/Images/gallery/img_10.jpg",
            authorImg: "/Images/top chiefs/img_6.jpg",
            ingredients: ["Sushi Rice", "Nori", "Fish", "Vegetables"],
            instructions: ["Prepare sushi rice", "Assemble sushi with nori and fillings", "Serve with soy sauce"],
            cookingTime: "1 hr",
            difficulty: "Medium",
            author: "Chef Yuki"
        },
        {
            id: 6,
            title: "Chicken Pan Pizza",
            image: "/Images/gallery/img_1.jpg",
            authorImg: "/Images/top chiefs/img_1.jpg",
            ingredients: ["Chicken", "Cheese", "Tomato Sauce", "Dough"],
             instructions: ["Preheat oven", "Prepare dough", "Add toppings", "Bake"],
             cookingTime: "30 mins",
             difficulty: "Medium",
             author: "Chef John",
        }, 
        {
            id: 7,
            title: "Spaghetti and Meatballs",
            image: "/Images/gallery/img_4.jpg",
            authorImg: "/Images/top chiefs/img_2.jpg",
            ingredients: ["Spaghetti", "Meatballs", "Tomato Sauce"],
            instructions: ["Cook spaghetti", "Prepare meatballs", "Combine with sauce"],
            cookingTime: "45 mins",
            difficulty: "Hard",
            author: "Chef Maria",
        },
        {
            id: 8,
            title: "American Cheese Burger",
            image: "/Images/gallery/img_5.jpg",
            authorImg: "/Images/top chiefs/img_3.jpg",
            ingredients: ["Ground Beef", "Cheese", "Lettuce", "Tomato", "Bun"],
            instructions: ["Grill beef patty", "Assemble burger with cheese and veggies", "Serve"],
            cookingTime: "20 mins",
            difficulty: "Easy",
            author: "Chef Mike",
            junkFood: true
        },
        {
            id: 9,
            title: "Mutton Biriyani",
            image: "/Images/gallery/img_6.jpg",
            authorImg: "/Images/top chiefs/img_5.jpg",
            ingredients: ["Mutton", "Rice", "Yogurt", "Spices"],
            instructions: ["Marinate mutton", "Cook rice with spices", "Combine and cook"],
            cookingTime: "1.5 hrs",
            difficulty: "Medium",
            author: "Chef Arjun",
        },
        {
            id: 10,
            title: "Japanese Sushi",
            image: "/Images/gallery/img_10.jpg",
            authorImg: "/Images/top chiefs/img_6.jpg",
            ingredients: ["Sushi Rice", "Nori", "Fish", "Vegetables"],
            instructions: ["Prepare sushi rice", "Assemble sushi with nori and fillings", "Serve with soy sauce"],
            cookingTime: "1 hr",
            difficulty: "Medium",
            author: "Chef Yuki"
        },
        {
            id: 11,
            title: "American Cheese Burger",
            image: "/Images/gallery/img_5.jpg",
            authorImg: "/Images/top chiefs/img_3.jpg",
            ingredients: ["Ground Beef", "Cheese", "Lettuce", "Tomato", "Bun"],
            instructions: ["Grill beef patty", "Assemble burger with cheese and veggies", "Serve"],
            cookingTime: "20 mins",
            difficulty: "Easy",
            author: "Chef Mike",
        },
        {
            id: 12,
            title: "Mutton Biriyani",
            image: "/Images/gallery/img_6.jpg",
            authorImg: "/Images/top chiefs/img_5.jpg",
            ingredients: ["Mutton", "Rice", "Yogurt", "Spices"],
            instructions: ["Marinate mutton", "Cook rice with spices", "Combine and cook"],
            cookingTime: "1.5 hrs",
            difficulty: "Medium",
            author: "Chef Arjun",
        }
    ].sort(() => Math.random() - 0.5);

    const saveRecipes = (recipes) => {
        localStorage.setItem('recipes', JSON.stringify(recipes));
        console.log("Recipes saved to local storage.");
    };

    const loadRecipes = () => {
        const storedRecipes = localStorage.getItem('recipes');
        if (storedRecipes) {
            console.log("Loaded recipes from local storage.");
            return JSON.parse(storedRecipes);
        } else {
            console.log("No recipes found in local storage. Using initial recipes.");
            return initialRecipes;
        }
    };
    
    
    const [filteredRecipes, setFilteredRecipes] = useState(loadRecipes());
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddRecipe = (newRecipe) => {
        const updatedRecipes = [...filteredRecipes, newRecipe];
        setFilteredRecipes(updatedRecipes);
        saveRecipes(updatedRecipes);
        setIsModalOpen(false);
        alert("Recipe added successfully!");
    };
    
    const handleEdit = (updatedRecipe) => {
        const updatedRecipes = filteredRecipes.map(recipe =>
            recipe.id === updatedRecipe.id ? updatedRecipe : recipe
        );
        setFilteredRecipes(updatedRecipes);
        saveRecipes(updatedRecipes);
        alert("Recipe updated successfully!");
    };
    
    const handleDelete = (recipeId) => {
        if (window.confirm("Are you sure you want to delete this recipe?")) {
            const updatedRecipes = filteredRecipes.filter(recipe => recipe.id !== recipeId);
            setFilteredRecipes(updatedRecipes);
            saveRecipes(updatedRecipes);
            alert("Recipe deleted successfully!");
        }
    };
    
    const restoreRecipes = () => {
        setFilteredRecipes(initialRecipes);
        saveRecipes(initialRecipes);
        alert("Recipes restored successfully!");
    };


        // Persist changes to local storage
       useEffect(() => {
            saveRecipes(filteredRecipes);
        }, [filteredRecipes])

        useEffect(() => {
    setFilteredRecipes(loadRecipes());
}, []); // Include loadRecipes here
    
    return (
        <div>
            <PreviousSearches recipes={filteredRecipes} setFilteredRecipes={setFilteredRecipes} />
            <div className="button-container">
            <button onClick={() => setIsModalOpen(true)} className="addrecipe-button">
        <FontAwesomeIcon icon={faPlus} /> 
    </button>
            <button onClick={restoreRecipes} className="restore-button"><FontAwesomeIcon icon={faUndo} />Restore Recipe</button>
            </div>
            <div className="recipes-container">
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map(recipe => (
                    <RecipesCard
                        key={recipe.id}
                        recipe={recipe}
                        onEdit={() =>handleEdit(recipe)}
                        onDelete={() => handleDelete(recipe.id)}
                    />
                ))
            ) : (
                <p>No recipes available</p>
            )}
            </div>
            <Model isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <AddRecipe onAddRecipe={handleAddRecipe} />
            </Model>
        </div>
    );
}