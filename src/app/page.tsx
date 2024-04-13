"use client";

import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

type DataType = {
  thumbnail: string;
  title: string;
  videoLinks: {
    quality: string;
    link: string;
  }[];
};

type fetchResultType = {
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  error: string | null;
  data: DataType | null;
};

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [fetchResult, setFetchResult] = useState<fetchResultType>({
    isSuccess: false,
    isError: false,
    isLoading: false,
    error: null,
    data: null,
  });
  const { data, error, isError, isLoading, isSuccess } = fetchResult;

  const getVideoDetailAndDownloadLinks = async () => {
    setFetchResult((prev) => ({ ...prev, isLoading: true }));
    try {
      const res = await fetch(`/api/youtube?url=${url}`);

      if (!res.ok)
        return setFetchResult({
          isSuccess: false,
          isError: true,
          isLoading: false,
          error: "something wrong try again",
          data: null,
        });

      const data = await res.json();
      if (!data?.success)
        return setFetchResult({
          isSuccess: false,
          isError: true,
          isLoading: false,
          error: data?.msg || "something wrong try again",
          data: null,
        });

      setFetchResult({
        data: data?.videoInfo,
        isLoading: false,
        isSuccess: data.success,
        error: null,
        isError: false,
      });
    } catch (error) {
      setFetchResult({
        isSuccess: false,
        isError: true,
        isLoading: false,
        error: "Something wrong try again",
        data: null,
      });
    }
  };

  return (
    <main className="px-2 flex flex-col justify-center items-center m-auto text-center">
      <div className="flex flex-col justify-center items-center gap-2 h-[200px]">
        <h1 className="text-[1.6rem] mb-2 font-extrabold">
          Download YouTube Videos in Seconds with TubeGrab
        </h1>
        <div
          id="searchbar"
          className="flex gap-0 items-center text-black w-[70%] max-w-[350px] min-w-[285px] [&>*]:border-[#EC0F5B] [&>*]:border-[2px] [&>*]:ps-[.7rem] [&>*]:pe-3 [&>*]:py-[5px]"
        >
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-[70%] outline-none rounded-s-md"
            type="text"
            placeholder="Paste link here..."
          />
          <button
            disabled={isLoading}
            onClick={getVideoDetailAndDownloadLinks}
            className="bg-[#EC0F5B] w-[30%] font-[500] tracking-wider text-black rounded-e-md flex gap-2 items-center disabled:cursor-not-allowed"
          >
            <span>Start</span>
            <div className="box-border">
              <FaArrowRight />
            </div>
          </button>
        </div>
        <p className="text-[.7rem]">
          Unleash the Power to Download and Enjoy Your Favorite YouTube Content
          Anytime, Anywhere!
        </p>
      </div>
      <div className="flex flex-col justify-center gap-2 items-center">
        {isLoading ? (
          <Loader />
        ) : isSuccess && !isError && data ? (
          <>
            <img width={320} src={data.thumbnail || ""} alt="thumbnail" />
            <h2 className="">{data.title}</h2>
            <ul className="flex flex-wrap gap-2 justify-center mb-2">
              {data.videoLinks.map((videoLink, index) => (
                <li key={index}>
                  <button
                    className="bg-red-700 p-3 "
                    onClick={() => window.open(videoLink.link, "_blank")}
                  >
                    {videoLink.quality || "mp3"}
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-red-800">{error}</p>
        )}
      </div>
    </main>
  );
}

function Loader() {
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="w-16 h-16 border-t-4 border-b-4 border-[#EC0F5B] rounded-full animate-spin"></div>
    </div>
  );
}
