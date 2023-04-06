import React from "react";

export default function Feature() {
  const data = [
    {
      title: "Retouch Product z-10",
      src: "/assets/retouchpro.jpeg",
      description: "Enhance your product images with professional retouching",
    },
    {
      title: "Remove background",
      src: "/assets/removebg.jpeg",
      description:
        "Say goodbye to distracting backgrounds with our removal service",
    },
    {
      title: "Social Media Post",
      src: "/assets/sp.jpeg",
      description: "Level up your social media game with eye-catching posts.",
    },
    {
      title: "Wedding Photo Editing",
      src: "/assets/prewed.jpg",
      description:
        "Preserve your precious memories with our expert editing services",
    },
    {
      title: "Pillow",
      src: "/assets/pillow.jpeg",
      description:
        "Add a personal touch to your home decor with a custom photo pillow",
    },
    {
      title: "Mug",
      src: "/assets/mug.jpeg",
      description:
        "Turn your favorite photo into a custom mug that you can enjoy every day.",
    },
    {
      title: "Invitation Card",
      src: "https://d33wubrfki0l68.cloudfront.net/07865c265551d7a67bdf88188ff62a07b84ffd6f/7e12f/images/placeholders/square4.svg",
      description:
        "Set the tone for your event with custom-designed invitation cards.",
    },
    {
      title: "Mobile Cover",
      src: "https://d33wubrfki0l68.cloudfront.net/07865c265551d7a67bdf88188ff62a07b84ffd6f/7e12f/images/placeholders/square4.svg",
      description:
        "Personalize your phone with a unique and stylish mobile cover.",
    },
  ];
  return (
    <>
      <h1 className="text-center text-xl font-semibold text-[#AEC6CF] md:text-4xl">
        Our Services
      </h1>
      <section className="flex w-full items-center ">
        <div className="relative mx-auto w-full max-w-7xl items-center px-5 py-12 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 gap-7 py-12 md:grid-cols-2 lg:grid-cols-4">
            {data.map((item, index) => (
              <figure key={index}>
                <img
                  className="w-full bg-gray-200 "
                  src={item.src}
                  alt={item.title}
                  width="1310"
                  height="873"
                />

                <p className="mt-5 text-lg font-medium leading-6 text-white">
                  {item.title}
                </p>
                <p className="mt-3 text-base text-gray-400">
                  {item.description}
                </p>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
