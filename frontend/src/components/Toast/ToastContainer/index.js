import { useEffect } from 'react';
import { ToastMessage } from '../ToastMessage';
import { Container } from './styles';
import { toastEventManager } from '../../../utils/toast';
import { useAnimatedList } from '../../../hooks/useAnimatedList';

export function ToastContainer() {
  const {
    setItems: setMessages,
    renderList,
    handleAnimationEnd,
    handleRemoveMessage,
  } = useAnimatedList();

  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(),
          type,
          text,
          duration,
        },
      ]);
    }

    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, [setMessages]);

  return (
    <Container>
      {renderList((message, { isLeaving }) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
          isLeaving={isLeaving}
          onAnimationEnd={handleAnimationEnd}
        />
      ))}
    </Container>
  );
}
