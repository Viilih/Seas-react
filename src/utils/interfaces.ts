export interface ICartao {
  dataExpedicao?: string;
  codigoSeguranca?: number;
  tipo: 'DEBITO' | 'CREDITO';
  vencimento?: string;
  status?: 'ATIVO' | 'INATIVO';
  numeroCartao: number;
  limite?: number;
}
export interface IChildren {
  children?: React.ReactNode;
}

export interface ILogin {
  login: string;
  senha: string;
}

export interface IRegisterData {
  usuarioCreateDTO: {
    login: string;
    senha: string;
  };
  clienteCreateDTO: {
    nome: string;
    cpf: string;
  };
  contatoCreateDTO: {
    telefone: string;
    email: string;
  };
  enderecoCreateDTO: {
    logradouro: string;
    cidade: string;
    pais: 'Brasil';
    estado: string;
    cep: string;
    complemento: 'complemento';
    numero: number;
  };
}

export interface IAddress {
  logradouro: string;
  cidade: string;
  estado: string;
  pais: 'Brasil';
  cep: string;
  complemento?: string; // O campo complemento é opcional
  numero: number; // O campo numero é opcional
}

export interface IContact {
  telefone: string;
  email?: string;
}
export interface ICliente {
  cpf: string;
  idUsuario: number;
  nome: string;
}
export interface IConta extends ICliente {
  agencia: number;
  chequeEspecial: number;

  idConta: number;
  saldo: number;
  status?: 'INATIVO' | 'ATIVO';
}
