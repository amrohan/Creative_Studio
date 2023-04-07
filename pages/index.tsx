import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Modal from "../components/Modal";
import cloudinary from "../utils/cloudinary";
import getBase64ImageUrl from "../utils/generateBlurPlaceholder";
import type { ImageProps } from "../utils/types";
import { useLastViewedPhoto } from "../utils/useLastViewedPhoto";
import Navbar from "../components/Navbar";
import Feature from "../components/Feature";
import cn from "clsx";
import Slide from "react-reveal/Slide";
// import Fade from "react-reveal/Fade";

const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
  const router = useRouter();
  const { photoId } = router.query;
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  const [blur, setBlur] = useState(true);
  setTimeout(() => {
    setBlur(false);
  }, 300);

  return (
    <>
      <Head>
        <title>Creative Studio</title>
        <meta property="og:image" content="" />
        <meta name="twitter:image" content="" />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(photoId);
            }}
          />
        )}
        <Navbar />
        <section>
          <div className="container mx-auto flex max-w-5xl flex-col items-center px-5 pt-24 md:h-screen md:flex-row md:pt-0">
            <div className="mb-16 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:pr-16 md:text-left lg:flex-grow lg:pr-24">
              <h1 className="mb-4 bg-gradient-to-r from-green-400 via-pink-500 to-purple-500 bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
                Unleash your creativity&nbsp;
                <br className="hidden lg:inline-block" />
                with our expert editing services for all your visual needs!
              </h1>
              <p className="mb-8 leading-relaxed text-gray-400">
                Professional editing services for your brand and life's moments.
              </p>
              <div className="flex justify-center">
                <Slide bottom>
                  <a href="#services">
                    <button className="rounded-md border border-zinc-800 px-8 py-2 text-zinc-900 decoration-wavy underline-offset-4 outline hover:animate-pulse hover:underline dark:border-green-500 dark:text-green-400 md:mt-0">
                      Services
                    </button>
                  </a>
                  <Link href="https://www.instagram.com/creative_studio_2712/">
                    <button className="ml-3 rounded-md border border-zinc-800 px-2 py-2 text-zinc-900 decoration-wavy underline-offset-4 outline hover:animate-pulse hover:underline dark:border-pink-500 dark:text-pink-400 md:mt-0">
                      Instagram
                    </button>
                  </Link>
                </Slide>
              </div>
            </div>
            <div className="w-5/6 md:w-1/2 lg:w-full lg:max-w-lg">
              <img
                className={cn(
                  "w-full rounded-xl object-cover object-center duration-700 ease-in-out md:w-9/12 lg:w-full",
                  blur ? "blur-lg grayscale" : "blur-0 grayscale-0"
                )}
                src="/per.gif"
                alt="Homage page gif"
              />
            </div>
          </div>
        </section>
        <Feature />
        <h1
          className="pb-10 text-center text-3xl text-white md:text-4xl"
          id="showcase"
        >
          Showcase
        </h1>
        <div className="mx-auto max-w-5xl columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          {images.map(({ id, public_id, format, blurDataUrl }) => (
            <Link
              key={id}
              href={`/?photoId=${id}`}
              as={`/p/${id}`}
              ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              shallow
              className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              <Image
                alt="Creative Studio"
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: "translate3d(0, 0, 0)" }}
                placeholder="blur"
                blurDataURL={blurDataUrl}
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
            </Link>
          ))}
        </div>
      </main>
      <footer className="p-6 text-center text-white/80 sm:p-12">
        Made with ❤️{" "}
        <a
          href="https://twitter.com/amrohxn"
          target="_blank"
          className="font-semibold hover:text-white"
          rel="noreferrer"
        >
          Rohan Salunkhe
        </a>
      </footer>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by("created_at", "desc")
    .max_results(400)
    .execute();
  let reducedResults: ImageProps[] = [];

  let i = 0;
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    });
    i++;
  }

  const blurImagePromises = results.resources.map((image: ImageProps) => {
    return getBase64ImageUrl(image);
  });
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

  for (let i = 0; i < reducedResults.length; i++) {
    reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i];
  }

  return {
    props: {
      images: reducedResults,
    },
  };
}
