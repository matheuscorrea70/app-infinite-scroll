import { useState, useCallback, useEffect } from "react";
import PhotosService, { Photo } from "./common/services/photos/photosService";

export const useFetchPhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const fetchPhotos = useCallback(async (page: number) => {
      if (page > 5) {
        return
      }

      const response = await PhotosService.getPhotos({ page });

      setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
  }, []);

  useEffect(() => {
    fetchPhotos(1)
  }, [fetchPhotos])

  return { photos, fetchPhotos }
};
