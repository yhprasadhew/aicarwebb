"use client";

import React from "react";
import { Camera, Search } from "lucide-react";
import { useDropzone } from "react-dropzone";

const HomeSearch = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isImageSearch, setIsImageSearch] = React.useState(false);

  const [file, setFile] = React.useState(null);
  const [preview, setPreview] = React.useState(null);

  // TEXT SEARCH
  const handleTextSubmit = (e) => {
    e.preventDefault();
    console.log("Text search:", searchTerm);
  };

  // IMAGE SEARCH
  const handleImageSubmit = (e) => {
    e.preventDefault();
    console.log("Image search file:", file);
  };

  // DROP HANDLER
  const onDrop = (acceptedFiles) => {
    const selected = acceptedFiles[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  return (
    <div className="w-full max-w-2xl mx-auto">

      {/* ================= TEXT SEARCH ================= */}
      {!isImageSearch && (
        <form
          onSubmit={handleTextSubmit}
          className="flex items-center bg-[#0b1423] border border-white/10 rounded-full px-3 py-2"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search make, model or keyword..."
            className="flex-1 bg-transparent px-4 py-2 text-white placeholder-gray-500 focus:outline-none"
          />

          {/* IMAGE MODE BUTTON */}
          <button
            type="button"
            onClick={() => setIsImageSearch(true)}
            className="p-2 text-white/60 hover:text-cyan-400 transition"
          >
            <Camera className="w-5 h-5" />
          </button>

          {/* SEARCH BUTTON */}
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-5 py-2 rounded-full flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </form>
      )}

      {/* ================= IMAGE SEARCH ================= */}
      {isImageSearch && (
        <form
          onSubmit={handleImageSubmit}
          className="w-full"
        >
          {/* MAIN UPLOAD BOX */}
          <div
            {...getRootProps()}
            className="bg-[#0b1423] border border-white/10 rounded-2xl p-6 text-center cursor-pointer hover:border-cyan-400/40 transition"
          >
            <input {...getInputProps()} />

            {/* EMPTY STATE */}
            {!preview ? (
              <div className="flex flex-col items-center gap-2 py-10">
                <Camera className="w-8 h-8 text-cyan-400" />
                <p className="text-white">
                  Drag & drop image or click to upload
                </p>
                <p className="text-gray-400 text-sm">
                  JPG, PNG supported
                </p>
              </div>
            ) : (
              /* PREVIEW STATE */
              <div className="flex flex-col items-center gap-4 py-4">
                <img
                  src={preview}
                  alt="preview"
                  className="w-44 h-44 object-cover rounded-xl border border-white/10"
                />

                <p className="text-white text-sm truncate max-w-[250px]">
                  {file?.name}
                </p>
              </div>
            )}

            {/* ACTIONS INSIDE BOX */}
            <div className="flex items-center justify-between mt-4">

              {/* BACK TO TEXT */}
              <button
                type="button"
                onClick={() => {
                  setIsImageSearch(false);
                  setFile(null);
                  setPreview(null);
                }}
                className="text-gray-400 hover:text-white text-sm"
              >
                Back to text search
              </button>

              {/* SEARCH IMAGE */}
              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-2 rounded-full flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Search Image
              </button>

            </div>
          </div>
        </form>
      )}

    </div>
  );
};

export default HomeSearch;