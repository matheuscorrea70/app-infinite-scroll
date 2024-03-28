import { useCallback, useRef } from "react";

export const useInfiniteScroll = ({
  isLoading,
  loadMore,
  hasMore,
}: {
  isLoading: boolean;
  loadMore: () => Promise<void>;
  hasMore: boolean;
}) => {
  const observe = useRef<IntersectionObserver>();

  const lastElementRef = useCallback(
    (node: HTMLImageElement) => {
      if (isLoading) {
        return;
      }

      if (observe.current) {
        observe.current.disconnect();
      }

      observe.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) {
        observe.current.observe(node);
      }
    },
    [isLoading, hasMore, loadMore]
  );

  return { lastElementRef };
};
