import { useRef, useEffect, useState } from "react";
import { useFetchPhotos } from "./useFetchPhotos";

let page = 1

function App() {
  const { photos, fetchPhotos } = useFetchPhotos();
  const lastElementRef = useRef<HTMLImageElement>(null);
  const lastElement = lastElementRef.current

  useEffect(() => {

    console.log('useEffect')

    const callback = () => {
      console.log("callback");
      fetchPhotos(2);
    };

    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    });

    lastElement && observer.observe(lastElement);
  }, []);

  return (
    <div>
      {photos.map((item, index) => {
        return (
          <div key={`${item.id}-${item.urls.thumb}`}>
            <img
              src={item.urls.thumb}
              ref={index === photos.length - 1 ? lastElementRef : null}
            />
          </div>
        );
      })}
    </div>
  );
}

export default App;
