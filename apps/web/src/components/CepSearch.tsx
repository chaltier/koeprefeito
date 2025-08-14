import { useState, useEffect } from 'react';
import { Input } from '@koeprefeito/ui';
import { useCepSearch } from '../hooks/useCepSearch';

interface CepSearchProps {
  onAddressChange: (address: string) => void;
  initialValue?: string;
}

export const CepSearch: React.FC<CepSearchProps> = ({ onAddressChange, initialValue = '' }) => {
  const [cep, setCep] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const { data, loading, error, searchCep } = useCepSearch();

  // Formatar CEP enquanto digita
  const formatCep = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCep = formatCep(e.target.value);
    setCep(formattedCep);

    // Buscar automaticamente quando CEP tiver 9 caracteres (00000-000)
    if (formattedCep.length === 9) {
      searchCep(formattedCep);
    }
  };

  // Atualizar endereço completo quando dados do CEP mudarem
  useEffect(() => {
    if (data) {
      let fullAddress = '';
      
      if (data.logradouro) {
        fullAddress += data.logradouro;
        if (number) {
          fullAddress += `, ${number}`;
        }
        if (complement) {
          fullAddress += `, ${complement}`;
        }
      }
      
      if (data.bairro) {
        fullAddress += ` - ${data.bairro}`;
      }
      
      if (data.localidade && data.uf) {
        fullAddress += `, ${data.localidade} - ${data.uf}`;
      }
      
      onAddressChange(fullAddress);
    }
  }, [data, number, complement, onAddressChange]);

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="cep" className="block text-sm font-medium text-gray-700 mb-2">
          CEP *
        </label>
        <div className="relative">
          <Input
            id="cep"
            type="text"
            placeholder="00000-000"
            value={cep}
            onChange={handleCepChange}
            maxLength={9}
            required
          />
          {loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
        {data && (
          <p className="mt-1 text-sm text-green-600">
            ✅ CEP encontrado: {data.bairro}, {data.localidade} - {data.uf}
          </p>
        )}
      </div>

      {data && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-2">
                Número *
              </label>
              <Input
                id="number"
                type="text"
                placeholder="123"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label htmlFor="complement" className="block text-sm font-medium text-gray-700 mb-2">
                Complemento
              </label>
              <Input
                id="complement"
                type="text"
                placeholder="Apto 45, Bloco B..."
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Endereço encontrado:</h4>
            <p className="text-sm text-gray-700">
              <strong>Logradouro:</strong> {data.logradouro || 'Não informado'}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Bairro:</strong> {data.bairro || 'Não informado'}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Cidade:</strong> {data.localidade} - {data.uf}
            </p>
          </div>
        </>
      )}

      <div className="text-xs text-gray-500">
        <p>💡 <strong>Dica:</strong> Digite o CEP e os dados do endereço serão preenchidos automaticamente.</p>
        <p>Para Maricá/RJ, os CEPs começam com <strong>24900-000</strong> até <strong>24999-999</strong>.</p>
      </div>
    </div>
  );
};