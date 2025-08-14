import { useState } from 'react';

interface CepData {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

interface UseCepSearchResult {
  data: CepData | null;
  loading: boolean;
  error: string | null;
  searchCep: (cep: string) => Promise<void>;
}

export const useCepSearch = (): UseCepSearchResult => {
  const [data, setData] = useState<CepData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchCep = async (cep: string) => {
    // Remove caracteres não numéricos
    const cleanCep = cep.replace(/\D/g, '');
    
    if (cleanCep.length !== 8) {
      setError('CEP deve ter 8 dígitos');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const result = await response.json();

      if (result.erro) {
        setError('CEP não encontrado');
        setData(null);
      } else {
        setData(result);
        setError(null);
      }
    } catch (err) {
      setError('Erro ao buscar CEP. Verifique sua conexão.');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    searchCep,
  };
};