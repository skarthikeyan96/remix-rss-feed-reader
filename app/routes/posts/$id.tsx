import { Deepgram } from "@deepgram/sdk";
import type { LoaderFunction } from "@remix-run/node";
import { NavLink, useLoaderData, useParams } from "@remix-run/react";
import { supabase } from "~/lib/supabase-client";

export async function loader({ params }: any) {
  const { data } = await supabase
    .from("feeds")
    .select("*")
    .eq("id", params.id)
    .single();

  if (data) {
    console.log(data);

    return {
      podcastData: data,
      // transcript: transcript.results?.channels[0].alternatives[0].transcript,
    };
  }

  return "Error Loading information";
}

const Post = () => {
  const data = useLoaderData();

  console.log(data);
  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-8 flex-col md:flex-row items-center">
          <NavLink
            to="/"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <span className="ml-3 text-xl">Transcribe</span>
          </NavLink>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            <NavLink to={"/add"} className="mr-5 hover:text-gray-900">
              Add Feed
            </NavLink>
          </nav>
        </div>
      </header>
      <div className="container mx-auto p-8">
        <h1> {data.podcastData.rss_title} </h1>
        <audio controls>
          <source src={data.podcastData.audio_link} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </>
  );
};

export default Post;
