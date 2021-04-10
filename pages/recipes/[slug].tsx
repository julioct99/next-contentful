import { createClient } from 'contentful';
import { GetStaticPaths } from 'next';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_API_KEY,
});

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await client.getEntries({ content_type: 'recipe' });

  const paths = res.items.map((item: any) => ({
    params: { slug: item.fields.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<RecipeDetailsProps> = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: 'recipe',
    'fields.slug': params.slug,
  });

  return {
    props: { recipe: items[0] },
  };
};

export interface RecipeDetailsProps {
  recipe: any;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe }) => {
  console.log(recipe);

  return <div>Recipe Details</div>;
};

export default RecipeDetails;
