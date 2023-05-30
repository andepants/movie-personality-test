"use client";
import React from "react";
import { useState, useEffect } from "react";
import "./movie.css";

export default function Movie(props) {
  const { movieID } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log(`movie ID: ${movieID}`);
    try {
      const response = await fetch("/api/imageAPI", {
        method: "POST",
        body: movieID,
      });
      const responseData = await response.json();
      setData(responseData);
      console.log("response data: ");
      console.log(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="h-1/2vh">
      <p>{movieID}</p>
      <img className="movie-image" src={data} />
    </div>
  );
}
