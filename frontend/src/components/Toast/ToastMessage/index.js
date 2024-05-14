import PropTypes from 'prop-types';
import { useEffect } from 'react';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';
import { useAnimatedUnmount } from '../../../hooks/useAnimatedUnmount';

import { Container } from './styles';

export function ToastMessage({ message, onRemoveMessage, isLeaving }) {
  const { animatedElementRef, shouldRender } = useAnimatedUnmount(!isLeaving);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 7000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, onRemoveMessage]);

  function handleRemove() {
    onRemoveMessage(message.id);
  }

  if (!shouldRender) {
    return null;
  }

  return (
    <Container
      type={message.type}
      onClick={handleRemove}
      tabIndex={0}
      role="button"
      ref={animatedElementRef}
      isLeaving={isLeaving}
    >
      {message.type === 'danger' && <img src={xCircleIcon} alt="X" />}
      {message.type === 'success' && <img src={checkCircleIcon} alt="Check" />}
      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'success', 'danger']),
    duration: PropTypes.number,
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
  isLeaving: PropTypes.bool.isRequired,
};
