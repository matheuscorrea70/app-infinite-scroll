import { useFetchPhotos } from "./common/hooks/useFetchPhotos";
import { useInfiniteScroll } from "./common/hooks/useInfiniteScroll";

function App() {
  const { photos, isLoading, loadMore, hasMore } = useFetchPhotos();
  const { lastElementRef } = useInfiniteScroll({
    isLoading,
    loadMore,
    hasMore,
  });

  return (
    <div>
      {photos.map((item, index) => {
        return (
          <div key={item.id} style={{ width: 100, height: 100 }}>
            <img
              style={{ maxWidth: "100%", maxHeight: "100%" }}
              src={item.urls.thumb}
              ref={index === photos.length - 1 ? lastElementRef : null}
            />
          </div>
        );
      })}
      {isLoading && <span>Loading...</span>}
    </div>
  );
}

export default App;
