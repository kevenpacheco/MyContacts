import { Container } from './styles';

import { Loader } from '../../components/Loader';
import { Modal } from '../../components/Modal';

import { useHome } from './useHome';

import { InputSearch } from './components/InputSearch';
import { Header } from './components/Header';
import { ErrorStatus } from './components/ErrorStatus';
import { EmptyList } from './components/EmptyList';
import { SearchNotFound } from './components/SearchNotFound';
import { ContactsList } from './components/ContactsList';

export function Home() {
  const {
    contacts,
    contactBeingDeleted,
    filteredContacts,
    handleChangeSearchTerm,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    handleDeleteContact,
    handleToggleOrderBy,
    handleTryAgain,
    hasError,
    isDeleteModalVisible,
    isLoading,
    isLoadingDelete,
    orderBy,
    searchTerm,
  } = useHome();

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <Modal
        title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
        danger
        visible={isDeleteModalVisible}
        isLoading={isLoadingDelete}
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteContact}
      >
        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>

      {contacts.length > 0 && (
        <InputSearch value={searchTerm} onChange={handleChangeSearchTerm} />
      )}

      <Header
        hasError={hasError}
        qtyOfContacts={contacts.length}
        qtyOfFilteredContacts={filteredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}

      {!hasError && (
        <>
          {contacts.length < 1 && !isLoading && <EmptyList />}

          {contacts.length > 0 && filteredContacts.length < 1 && (
            <SearchNotFound searchTerm={searchTerm} />
          )}

          <ContactsList
            filteredContacts={filteredContacts}
            onDeleteContact={handleDeleteContact}
            onToggleOrderBy={handleToggleOrderBy}
            orderBy={orderBy}
          />
        </>
      )}
    </Container>
  );
}
