export interface ICartao {
  dataExpedicao?: string;
  codigoSeguranca?: number;
  tipo: 'DEBITO' | 'CREDITO';
  vencimento?: string;
  status?: 'ATIVO' | 'INATIVO';
  numeroCartao: number;
  limite?: number;
}

export interface IAddress {
  logradouro: string;
  cidade: string;
  estado: string;
  pais: string;
  cep: string;
  complemento?: string; // O campo complemento é opcional
  numero?: number; // O campo numero é opcional
}

export interface IContact {
  telefone: string;
  email?: string;
}
