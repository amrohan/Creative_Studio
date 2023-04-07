import React from "react";
import { useState } from "react";
import Navbar from "./Navbar";

function Upload() {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */

  function handleOnChange(changeEvent) {
    const reader: any = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */

  async function handleOnSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInout: any = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );

    const formData = new FormData();

    for (const file of fileInout.files) {
      formData.append("file", file);
    }

    // Upload the file to the cloudinary server
    formData.append("upload_preset", "pictures");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/creativestudio/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((response) => response.json());

    setImageSrc(data.secure_url);
    setUploadData(data.url);

    console.log("data", data);
  }
  return (
    <>
      <Navbar />
      <div className="text-bold w-full overflow-hidden dark:bg-gray-950 dark:text-white">
        <div className="mx-auto grid place-items-center">
          <main className="prose prose-slate">
            <div className="text-centerleading-10">
              <h1
                id="up"
                className="mt-6 text-2xl font-extrabold text-pink-800"
              >
                Upload Images
              </h1>
              <p className="text-lg dark:text-white">
                Here you can upload your images and share a link with anyone,
                anywhere.
              </p>
            </div>

            <form
              className="bg-gray-940 mt-8 w-auto "
              method="post"
              onChange={handleOnChange}
              onSubmit={handleOnSubmit}
            >
              <div className="mx-auto grid max-w-[300px] place-items-center">
                <input className="dark:text-white" type="file" name="file" />
                <img src={imageSrc} alt="Upload your images" className="pt-6" />
              </div>

              {imageSrc && !uploadData && (
                <div className="pb-16 pt-10 text-center">
                  <button className="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white">
                    Upload Picture
                  </button>
                </div>
              )}

              {uploadData && (
                <div className="mt-5 w-full text-center">
                  <button className=" mx-auto rounded bg-green-500 px-2 py-2 font-bold text-black hover:bg-indigo-800">
                    Upload Done
                  </button>
                </div>
              )}
            </form>
          </main>
        </div>
      </div>
    </>
  );
}

export default Upload;
