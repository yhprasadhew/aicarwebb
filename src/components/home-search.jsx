"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Camera, Loader2, Search } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

const HomeSearch = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isImageSearch, setIsImageSearch] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [preview, setPreview] = React.useState(null);

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast.error("Enter a search term");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/search/text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchTerm.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Search failed");

      sessionStorage.setItem(
        "aiSearchResults",
        JSON.stringify({ cars: data.cars, ai: data.ai })
      );
      router.push(`/search?mode=text&q=${encodeURIComponent(searchTerm.trim())}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Upload an image first");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/search/image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Image search failed");

      sessionStorage.setItem(
        "aiSearchResults",
        JSON.stringify({ cars: data.cars, ai: data.ai })
      );
      router.push("/search?mode=image");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

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
            disabled={loading}
            className="flex-1 bg-transparent px-4 py-2 text-white placeholder-gray-500 focus:outline-none disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => setIsImageSearch(true)}
            disabled={loading}
            className="p-2 text-white/60 hover:text-cyan-400 transition disabled:opacity-50"
          >
            <Camera className="w-5 h-5" />
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-5 py-2 rounded-full flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            Search
          </button>
        </form>
      )}

      {isImageSearch && (
        <form onSubmit={handleImageSubmit} className="w-full">
          <div
            {...getRootProps()}
            className="bg-[#0b1423] border border-white/10 rounded-2xl p-6 text-center cursor-pointer hover:border-cyan-400/40 transition"
          >
            <input {...getInputProps()} />

            {!preview ? (
              <div className="flex flex-col items-center gap-2 py-10">
                <Camera className="w-8 h-8 text-cyan-400" />
                <p className="text-white">
                  Drag & drop image or click to upload
                </p>
                <p className="text-gray-400 text-sm">JPG, PNG supported</p>
              </div>
            ) : (
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

            <div className="flex items-center justify-between mt-4">
              <button
                type="button"
                onClick={() => {
                  setIsImageSearch(false);
                  setFile(null);
                  setPreview(null);
                }}
                disabled={loading}
                className="text-gray-400 hover:text-white text-sm"
              >
                Back to text search
              </button>
              <button
                type="submit"
                disabled={loading || !file}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-2 rounded-full flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
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
