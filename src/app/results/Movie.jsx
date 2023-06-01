"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Movie(props) {
  const { movieID } = props;
  const [data, setData] = useState(null);
  const [posterPath, setPosterPath] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/imageAPI", {
          method: "POST",
          body: movieID,
        });
        const responseData = await response.json();
        setData(responseData);
        setPosterPath(
          `https://image.tmdb.org/t/p/original${responseData.poster_path}`
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [ movieID ]);

  if (!data) {
    return;
  }

  return (
    <div className="p-4 bg-gray-900 text-white">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{data.title}</h1>
      <div className="flex flex-col md:flex-row items-center">
        <Image className="rounded-md mb-4 md:mr-4" src={posterPath} width="200" height="300" alt="movie poster" />
        <p className="text-justify">{data.overview}</p>
      </div>
    </div>
  );
}
