import PropTypes from 'prop-types';

import { Spinner } from '../Spinner';
import { ReactPortal } from '../ReactPortal';

import { Overlay } from './styles';
import { useAnimatedUnmount } from '../../hooks/useAnimatedUnmount';

export function Loader({ isLoading }) {
  const { animatedElementRef, shouldRender } = useAnimatedUnmount(isLoading);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="loader-root">
      <Overlay ref={animatedElementRef} isLeaving={!isLoading}>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
