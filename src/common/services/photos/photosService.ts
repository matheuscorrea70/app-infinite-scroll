import axios from "axios";

export type Photo = {
  id: string;
  description: string;
  urls: {
    thumb: string;
  };
};

class PhotosService {
  static getPhotos = ({ page }: { page: number }) => {
    return axios.get<Photo[]>("https://api.unsplash.com/photos", {
      params: { page },
      headers: {
        Authorization: `Client-ID 1Pq-l-E8sKTW76b7p9xdcui6XLXiIzuMmsZ9B8NnQtQ`
      }
    });
  };
}

export default PhotosService;
