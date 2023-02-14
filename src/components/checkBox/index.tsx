import React, { HTMLAttributes, DetailedHTMLProps } from 'react';

import './styles.scss';

export interface CheckBoxPropsType
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	label: string,
	value?: boolean,
	setValue: (value: boolean) => void;
}


const CheckBox: React.FC<CheckBoxPropsType> = ({
	label,
	value,
	setValue
}) => {
	return (
		<label className="checkBoxContainer">
			<div className="checkBoxLabel">{label}</div>
			<input
			type="checkbox"
			checked={value}
			onChange={() => setValue(!value)}
			/>
			<span className="checkmark"></span>
		</label>
	);
};

export default CheckBox;