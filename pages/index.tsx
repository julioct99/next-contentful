import React from 'react';
import { createClient, Entry } from 'contentful';
import { GetStaticProps } from 'next';
import RecipeCard from '../components/RecipeCard';

export const getStaticProps: GetStaticProps<RecipesProps> = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_API_KEY,
  });

  const res = await client.getEntries({ content_type: 'recipe' });

  return {
    props: {
      recipes: res.items,
    },
  };
};

export interface RecipesProps {
  recipes: Entry<unknown>[] | any;
}

const Recipes: React.FC<RecipesProps> = ({ recipes }) => {
  console.log(recipes);

  return (
    <div className='recipe-list'>
      {recipes.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe.sys.id} />
      ))}

      <style jsx>{`
        .recipe-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px 60px;
        }
      `}</style>
    </div>
  );
};

export default Recipes;
