/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import { Container } from './styles';

export function Header({ hasError, qtyOfContacts, qtyOfFilteredContacts }) {
  const alignment = hasError
    ? 'flex-end'
    : qtyOfContacts > 0
      ? 'space-between'
      : 'center';

  return (
    <Container justifyContent={alignment}>
      {!hasError && qtyOfContacts > 0 && (
        <strong>
          {qtyOfFilteredContacts}
          {qtyOfFilteredContacts === 1 ? ' contato' : ' contatos'}
        </strong>
      )}

      <a href="/new">Novo contato</a>
    </Container>
  );
}

Header.propTypes = {
  hasError: PropTypes.bool.isRequired,
  qtyOfContacts: PropTypes.number.isRequired,
  qtyOfFilteredContacts: PropTypes.number.isRequired,
};
