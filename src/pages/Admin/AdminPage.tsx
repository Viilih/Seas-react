import React, { useState } from 'react';
import { useContext } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { AdminContext } from '../../context/AdminContext';
import { ICostumerReport } from '../../utils/interfaces';
import styles from './AdminPage.module.scss';

export const AdminPage = () => {
	const [customerReport, setCustomerReport] = useState<ICostumerReport>();
	const [showReport, setShowReport] = useState(false);
	const { getCostumerReport, disableAccount, reactivateAccount } =
		useContext(AdminContext);

	const handleCostumerReport = async () => {
		const cpf = document.querySelector('input')?.value;
		const costumerReportObj = await getCostumerReport(cpf);
		const report = costumerReportObj?.elementos[0];
		setCustomerReport(report);
	};
	const toggleReport = () => {
		setShowReport(!showReport);
	};

	const handleActivateAccount = async () => {
		const cpf = document.querySelector('input')?.value;
		await reactivateAccount(cpf);
	};

	const handleDisableAccount = async () => {
		const accountNumberInput: any = document.getElementById('accountNumber');
		const accountNumber: number = Number(accountNumberInput.value);
		await disableAccount(accountNumber);
	};

	return (
		<div>
			<Sidebar />
			<div className={styles.container}>
				<div className={styles.contentContainer}>
					<h3>Relatório do cliente</h3>
					<div className={styles.inputContainer}>
						<input
							type="text"
							placeholder="Digite o CPF do cliente"
							name="cpf"
						/>
						<input
							type="text"
							placeholder="Digite o número da conta do cliente"
							name="numeroConta"
							id="accountNumber"
						/>
						<button
							onClick={() => {
								handleCostumerReport();
								toggleReport();
							}}
							className={styles.btn}
						>
							Buscar relatório
						</button>
						<button
							className={styles.btn}
							onClick={() => {
								handleDisableAccount();
							}}
						>
							Desativar Conta
						</button>
						<button
							className={styles.btn}
							onClick={() => handleActivateAccount()}
						>
							{' '}
							Ativar Conta
						</button>
					</div>
					{showReport ? (
						<div>
							<ul className={styles.costumerReport}>
								<li>
									<span>Número da conta:</span>
									<span> {customerReport?.numeroConta}</span>
								</li>
								<li>
									<span>Agência:</span>
									<span> {customerReport?.agencia}</span>
								</li>
								<li>
									<span>Saldo:</span>
									<span> {customerReport?.saldo}</span>
								</li>
								<li>
									<span>Cheque especial:</span>
									<span> {customerReport?.chequeEspecial}</span>
								</li>
								<li>
									<span>Status:</span>
									<span> {customerReport?.status}</span>
								</li>
								<li>
									<span>ID do cliente:</span>
									<span> {customerReport?.idCliente}</span>
								</li>
								<li>
									<span>CPF:</span>
									<span> {customerReport?.cpf}</span>
								</li>
								<li>
									<span>Nome:</span>
									<span> {customerReport?.nome}</span>
								</li>
								<li>
									<span>ID do contato:</span>
									<span> {customerReport?.idContato}</span>
								</li>
								<li>
									<span>Telefone:</span>
									<span> {customerReport?.telefone}</span>
								</li>
								<li>
									<span>Email:</span>
									<span> {customerReport?.email}</span>
								</li>
								<li>
									<span>ID do endereço:</span>
									<span> {customerReport?.idEndereco}</span>
								</li>
								<li>
									<span>Cidade:</span>
									<span> {customerReport?.cidade}</span>
								</li>
								<li>
									<span>Logradouro:</span>
									<span> {customerReport?.logradouro}</span>
								</li>
								<li>
									<span>Estado:</span>
									<span> {customerReport?.estado}</span>
								</li>
								<li>
									<span>País:</span>
									<span> {customerReport?.pais}</span>
								</li>
								<li>
									<span>CEP:</span>
									<span> {customerReport?.cep}</span>
								</li>
								<li>
									<span>Complemento:</span>
									<span> {customerReport?.complemento}</span>
								</li>
								<li>
									<span>Número:</span>
									<span> {customerReport?.numero}</span>
								</li>
							</ul>
						</div>
					) : (
						<div></div>
					)}
				</div>
			</div>
		</div>
	);
};
