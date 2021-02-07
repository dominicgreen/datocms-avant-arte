import Head from "next/head";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import Container from "../../components/container";
import Header from "../../components/header";
import Layout from "../../components/layout";
import MoreStories from "../../components/more-stories";
import PostBody from "../../components/post-body";
import PostHeader from "../../components/post-header";
import SectionSeparator from "../../components/section-separator";
import { request } from "../../lib/datocms";
import { metaTagsFragment, responsiveImageFragment } from "../../lib/fragments";

export async function getStaticPaths() {
  const data = await request({ query: `{ allPosts { slug } }` });

  return {
    paths: data.allPosts.map((post) => `/artists/${post.slug}`),
    fallback: false,
  };
}

export async function getStaticProps({ params, preview = false }) {
  const graphqlRequest = {
    query: `
      query PostBySlug($slug: String) {
       
        artist(filter: {slug: {eq: $slug}}) {
          id
          slug
        }

      }
    `,
    preview,
    variables: {
      slug: params.slug,
    },
  };

  return {
    props: {
      subscription: preview
        ? {
            ...graphqlRequest,
            initialData: await request(graphqlRequest),
            token: process.env.NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN,
          }
        : {
            enabled: false,
            initialData: await request(graphqlRequest),
          },
    },
  };
}

export default function Post({ subscription, preview }) {
  const {
    data: { site, artist },
  } = useQuerySubscription(subscription);


  return (
    <Layout preview={preview}>
      Artist
      {artist.id}
    </Layout>
  );
}
