export interface ICartao {
  dataExpedicao?: string;
  codigoSeguranca?: number;
  tipo: 'DEBITO' | 'CREDITO';
  vencimento?: string;
  status?: 'ATIVO' | 'INATIVO';
  numeroCartao: number;
}

export interface IChildren {
  children?: React.ReactNode;
}

export interface ICostumerReport {
  numeroConta: number;
  agencia: number;
  saldo: number;
  chequeEspecial: number;
  status: string;
  idCliente: number;
  cpf: string;
  nome: string;
  idContato: number;
  telefone: string;
  email: string;
  idEndereco: number;
  cidade: string;
  logradouro: string;
  estado: string;
  pais: string;
  cep: string;
  complemento: string;
  numero: number;
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

export interface ICostumer {
  nome: string;
  cpf: string;
  idCliente: number;
}

export interface IAddress {
  logradouro: string;
  cidade: string;
  estado: string;
  pais: string;
  cep: string;
  complemento?: string;
  numero: number;
  idEndereco: number;
}

export interface IContact {
  idContato: number;
  telefone: string;
  email?: string;
  idCliente: number;
}

export interface IConta {
  agencia: number;
  chequeEspecial: number;
  cliente: {
    cpf: string;
    idUsuario: number;
    nome: string;
  };
  idConta: number;
  saldo: number | undefined;
  status?: 'INATIVO' | 'ATIVO';
}

export interface IPagamento {
  numeroCartao: number;
  // docVendedor: string;
  // itens: {
  // 	nome: string;
  // 	valor: number;
  // 	quantidade: number;
  // };
  codigoSeguranca: number;
}
