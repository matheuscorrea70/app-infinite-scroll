import { useState, useEffect, useCallback, useRef } from "react";
import PhotosService, { Photo } from "../services/photos/photosService";

export const useFetchPhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const page = useRef(1)

  const loadMore = useCallback(async () => {
    setIsLoading(true);

    page.current += 1
    
    const response = await PhotosService.getPhotos({ page: page.current });

    setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
    setIsLoading(false);

    if (!response.data?.length) {
      setHasMore(false);
    }
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      setIsLoading(true);

      const response = await PhotosService.getPhotos({ page: 1 });

      setPhotos(response.data);
      setIsLoading(false);

      if (!response.data?.length) {
        setHasMore(false);
      }
    };

    fetchPhotos();
  }, []);

  return { photos, isLoading, hasMore, loadMore };
};
