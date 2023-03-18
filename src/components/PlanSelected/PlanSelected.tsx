import React from 'react';

interface IPlanSelectedProps {
	plan: 'gold' | 'silver' | 'platinum';
	title: string;
}

const PlanSelected: React.FC<IPlanSelectedProps> = ({ plan, title }) => {
	const colors = {
		gold: '#EBB62D',
		silver: '#F0F0F0',
		platinum: '#4A7686',
	};
	return (
		<div>
			<span>{title}</span>
			<div style={{ backgroundColor: colors[plan] }}>{plan}</div>
		</div>
	);
};

export default PlanSelected;
