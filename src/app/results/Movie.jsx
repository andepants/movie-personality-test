"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Movie(props) {
  const { movieID } = props;
  const [data, setData] = useState(null);
  const [posterPath, setPosterPath] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

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

  if (!data) {
    return;
  }

  return (
    <div className="h-1/2vh p-8 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <div className="flex items-center">
        <Image className="rounded-md mr-4" src={posterPath} width="200" height="300" alt="movie poster" />
        <p className="flex-grow">{data.overview}</p>
      </div>
    </div>
  );
}
