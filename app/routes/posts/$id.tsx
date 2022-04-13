import { Deepgram } from "@deepgram/sdk";
import type { LoaderFunction } from "@remix-run/node";
import { NavLink, useLoaderData, useParams } from "@remix-run/react";
import Layout from "~/components/layout";
import { supabase } from "~/lib/supabase-client";
import DOMPurify from "dompurify";

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
        <h1 className="pb-5 font-bold"> {data.podcastData.rss_title} </h1>
        <h2 className="pb-5 font-bold"> {data.podcastData.rss_feed_author} </h2>
        <h3 className="pb-5 font-bold"> {data.podcastData.feed_title} </h3>
        {
         data.podcastData.audio_link && <audio controls>
            <source src={data.podcastData.audio_link} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        }
        <div className="prose">
        <div  dangerouslySetInnerHTML={{__html : data.podcastData.rss_feed_description}}/> 
        </div>
      </Layout>
    </>
  );
};

export default Post;
