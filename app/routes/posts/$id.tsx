import { Deepgram } from "@deepgram/sdk";
import type { LoaderFunction } from "@remix-run/node";
import { NavLink, useLoaderData, useParams } from "@remix-run/react";
import Layout from "~/components/layout";
import { supabase } from "~/lib/supabase-client";

export async function loader({ params }: any) {
  const { data } = await supabase
    .from("feeds")
    .select("*")
    .eq("id", params.id)
    .single();

  if (data) {
    return {
      podcastData: data,
    };
  }

  return "Error Loading information";
}

const Post = () => {
  const data = useLoaderData();

  console.log(data);
  return (
    <>
      <Layout>
        <h1> {data.podcastData.rss_title} </h1>
        <audio controls>
          <source src={data.podcastData.audio_link} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </Layout>
    </>
  );
};

export default Post;
