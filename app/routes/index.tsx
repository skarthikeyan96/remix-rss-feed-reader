
import type { LoaderFunction } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { supabase } from '../lib/supabase-client';


export const loader: LoaderFunction = async () => {
  const {data} = await supabase.from('feeds').select('id,audio_link,audio_type,rss_title,feed_title')
  return data
};

export default function Index() {
  const feeds = useLoaderData();
  console.log(feeds)

  

  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-8 flex-col md:flex-row items-center">
          <NavLink to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
       
            <span className="text-xl">Transcribe</span>
         
          </NavLink>
         
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            <NavLink to={'/add'} className="mr-5 hover:text-gray-900">Add Feed</NavLink>
          </nav>
         
        </div>
        <div className="mx-auto container p-8">

        {
         feeds && feeds.length > 0 ? feeds.map((feed: any) => {
            return (
              <div className="pb-4">
                <NavLink to={`/posts/${feed.id}`} className="mr-5 hover:text-gray-900">{feed.feed_title}</NavLink>
                </div>
            )
          }) : (<p> No feed data </p>)
        }
        </div>

        <Outlet/>
      </header>
    </>
  );
}
