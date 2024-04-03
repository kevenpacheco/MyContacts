import PropTypes from 'prop-types';
import { StyledButton } from './styles';
import { Spinner } from '../Spinner';

export function Button({
  type, disabled, isLoading, children,
}) {
  return (
    <StyledButton type={type} disabled={disabled || isLoading}>
      {isLoading ? <Spinner size={16} /> : children}
    </StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  isLoading: false,
};
