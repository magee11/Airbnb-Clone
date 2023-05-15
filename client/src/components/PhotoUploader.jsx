import axios from "axios";
import React, { useState } from "react";

function PhotoUploader({addedPhotos,onChange}) {
  const [photoLink, setPhotoLink] = useState("");
  async function addPhoto_by_link(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post("user/image_download", {
      link: photoLink,
    });
    onChange((pre) => {
      return [...pre, filename];
    });
    setPhotoLink("");
  }
  function UploadImages(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/user/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        onChange((pre) => {
          return [...pre, ...filenames];
        });
      });
  }

  return (
    <div>
      <h2 className="text-2xl mt-4">Photos</h2>
      <p className="text-gray-500 text-sm">More = better</p>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Add using link ..."
          value={photoLink}
          onChange={(ev) => {
            setPhotoLink(ev.target.value);
          }}
        />
        <button
          onClick={addPhoto_by_link}
          className="bg-gray-200 px-4 rounded-2xl"
        >
          Add&nbsp;Photos
        </button>
      </div>
      <div className="mt-4 grid lg:grid-cols-5 sm:grid-cols-4 gap-3 ">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <div className="h-32 flex">
              <img
                className="rounded-2xl object-cover"
                src={"http://localhost:4000/uploads/" + link}
                alt=""
              />
            </div>
          ))}

        <label className=" h-32 flex cursor-pointer justify-center items-center  border bg-gray-200 rounded-2xl px-5 py-2 text-sm text-gray-900">
          <input type="file" className="hidden" onChange={UploadImages} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
        </label>
      </div>
    </div>
  );
}

export default PhotoUploader;
