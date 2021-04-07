import React from 'react';
import Link from 'next/link';

export interface RecipeCardProps {
  recipe: any;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { title, slug, cookingTime, thumbnail } = recipe.fields;

  return (
    <div className='card'>
      <div className='featured'>{/* Image - thumb */}</div>
      <div className='content'>
        <div className='info'>
          <h4>{title}</h4>
          <p>Takes approx {cookingTime} mins to make</p>
        </div>
        <div className='actions'>
          <Link href={`/recipes/${slug}`}>
            <a>Cook This</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
