import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { PageHeader } from '../../components/PageHeader';

export function NewContact() {
  return (
    <div>
      <PageHeader title="Novo contato" />

      <Input type="text" placeholder="Nome" />
      <Select>
        <option value="1">Instagram</option>
        <option value="1">Instagram</option>
        <option value="1">Instagram</option>
        <option value="1">Instagram</option>
        <option value="1">Instagram</option>
      </Select>
    </div>
  );
}
