import { MetaFunction } from "@remix-run/node";
import Parser from "rss-parser";
import {redirect} from '@remix-run/node';
import { supabase } from "~/lib/supabase-client";

export const meta: MetaFunction = () => {
  return { title: "Add Form" };
};

export const action = async ({request}:any) => {
    const formResponse = await request.formData()
    // validate if it is a legitimate url
    const parser = new Parser();
    const rssResponse = await parser.parseURL(formResponse.get('url'))
    const todaysDate = new Date().getDate()
    const filteredFeed = rssResponse.items.filter(item => new Date(item.pubDate as string).getDate() === todaysDate)
    for(let i=0;i<filteredFeed.length;i++){
    const response = filteredFeed[i]

    const feedData:{
      [key: string]: string | boolean | number | undefined
    }  = {
        feed_url: response.link,
        audio_link: response.enclosure?.url,
        audio_type: response.enclosure?.type,
        audio_length: response.enclosure?.length,
        rss_title: rssResponse.title,
        feed_title: response.title,
        isPodcast: response.hasOwnProperty('enclosure') && Object.entries(response).length === 0,
        rss_feed_id: response.guid, // unique feed id
        rss_feed_author: response.author,
        rss_feed_description: response.content
         
    }
    // TODO: error handling
    await supabase.from("feeds").insert([feedData]).single()
   }
    
   return redirect('/')
  }

const Add = () => {
  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-8 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span className="text-xl">Transcribe</span>
          </a>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            <a className="mr-5 hover:text-gray-900">Add Feed</a>
          </nav>
        </div>
      </header>
      <div>
        <form  className="container  mx-auto p-8" method="post">
        <label className="block">
          <span className="text-gray-700">Feed URL</span>
          <input
            type="text"
            name="url"
            className="mt-1 block w-full mb-2"
            placeholder="Enter the Feed URL"
          />
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Add Feed
          </button>
        </label>
        </form>
      
      </div>
    </>
  );
};

export default Add;
