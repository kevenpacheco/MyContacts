import {
  createRef, useCallback, useRef, useState,
} from 'react';

export function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue);
  const [pendingRemovalItemIds, setPendingRemovalItemIds] = useState([]);

  const animatedRefs = useRef(new Map());

  const handleRemoveMessage = useCallback((id) => {
    setPendingRemovalItemIds((prevState) => [...prevState, id]);
  }, []);

  // const handleAnimationEnd = useCallback((id) => {
  //   setItems((prevState) => prevState.filter((item) => item.id !== id));
  //   setPendingRemovalItemIds((prevState) => prevState.filter((itemId) => itemId !== id));
  // }, []);

  const getAnimatedRef = useCallback((itemId) => {
    let animatedRef = animatedRefs.current.get(itemId);

    if (!animatedRef) {
      animatedRef = createRef();
      animatedRefs.current.set(itemId, animatedRef);
    }

    return animatedRef;
  }, []);

  const renderList = useCallback(
    (renderItem) => items.map(
      (item) => {
        const isLeaving = pendingRemovalItemIds.includes(item.id);
        const animatedRef = getAnimatedRef(item.id);

        return renderItem(item, { isLeaving, animatedRef });
      },
    ),
    [items, pendingRemovalItemIds, getAnimatedRef],
  );

  return {
    items,
    setItems,
    renderList,
    handleRemoveMessage,
  };
}
