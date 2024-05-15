import {
  createRef, useCallback, useEffect, useRef, useState,
} from 'react';

export function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue);
  const [pendingRemovalItemIds, setPendingRemovalItemIds] = useState([]);

  const animatedRefs = useRef(new Map());
  const animationEndListeners = useRef(new Map());

  const handleAnimationEnd = useCallback((itemId) => {
    const removeListener = animationEndListeners.current.get(itemId);
    removeListener();

    animatedRefs.current.delete(itemId);
    animationEndListeners.current.delete(itemId);

    setItems((prevState) => prevState.filter((item) => item.id !== itemId));
    setPendingRemovalItemIds((prevState) => prevState.filter((id) => itemId !== id));
  }, []);

  useEffect(() => {
    const removeListeners = animationEndListeners.current;

    pendingRemovalItemIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId);
      const alreadyHasListener = removeListeners.has(itemId);

      if (animatedRef?.current && !alreadyHasListener) {
        const onAnimationEnd = () => handleAnimationEnd(itemId);
        const removeListener = () => {
          animatedRef.current.removeEventListener(
            'animationend',
            onAnimationEnd,
          );
        };

        removeListeners.set(itemId, removeListener);

        animatedRef.current.addEventListener('animationend', onAnimationEnd);
      }
    });
  }, [pendingRemovalItemIds, handleAnimationEnd]);

  useEffect(() => {
    const removeListeners = animationEndListeners.current;

    return () => {
      removeListeners.forEach((removeListener) => removeListener());
    };
  }, []);

  const handleRemoveMessage = useCallback((id) => {
    setPendingRemovalItemIds((prevState) => [...prevState, id]);
  }, []);

  const getAnimatedRef = useCallback((itemId) => {
    let animatedRef = animatedRefs.current.get(itemId);

    if (!animatedRef) {
      animatedRef = createRef();
      animatedRefs.current.set(itemId, animatedRef);
    }

    return animatedRef;
  }, []);

  const renderList = useCallback(
    (renderItem) => items.map((item) => {
      const isLeaving = pendingRemovalItemIds.includes(item.id);
      const animatedRef = getAnimatedRef(item.id);

      return renderItem(item, { isLeaving, animatedRef });
    }),
    [items, pendingRemovalItemIds, getAnimatedRef],
  );

  return {
    items,
    setItems,
    renderList,
    handleRemoveMessage,
  };
}
