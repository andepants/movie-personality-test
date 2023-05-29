"use client";
import React from "react";
import { useState, useEffect } from "react";

export default function Movie(props) {
  const { movieTitle } = props;
  const [images, setImages] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/imageAPI"); // Replace "/api/your-endpoint" with your actual endpoint URL
      const responseData = await response.json();
      setImages(responseData);
      console.log(images);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="h-full">
      <p>{movieTitle}</p>
    </div>
  );
}
