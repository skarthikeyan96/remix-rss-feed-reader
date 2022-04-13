import type { LoaderFunction } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import Layout from "~/components/layout";
import { supabase } from "../lib/supabase-client";

export const loader: LoaderFunction = async () => {
  const { data } = await supabase
    .from("feeds")
    .select("id,audio_link,audio_type,rss_title,feed_title");
  return data;
};

export default function Index() {
  const feeds = useLoaderData();
  console.log(feeds);

  return (
    <>
      <Layout>
        {feeds && feeds.length > 0 ? (
          feeds.map((feed: any) => {
            return (
              <div className="pb-4">
                <NavLink
                  to={`/posts/${feed.id}`}
                  className="mr-5 hover:text-gray-900"
                >
                  {feed.feed_title}
                </NavLink>
              </div>
            );
          })
        ) : (
          <p> No feed data </p>
        )}

        <Outlet />
      </Layout>
    </>
  );
}
