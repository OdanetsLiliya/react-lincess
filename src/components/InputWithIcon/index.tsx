import React, { HTMLAttributes, DetailedHTMLProps } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

import './styles.scss';

export interface InputWithIconPropsType
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	placeholder: string,
	icon?: string,
	visible?: boolean,
	value?: string,
	setValue?: (value: string) => void;
	isFormInput?: boolean;
	title?: string;
	style?: React.CSSProperties;
	center?: boolean;
	onClick?: () => void;
	register?: UseFormRegister<FieldValues>;
	inputStyle?: React.CSSProperties;
	multiline?: boolean;
	onClickOnInput?: () => void;
	errorText?: string,
	label: string,
	pattern?: Object,
	autoComplete?: string,
	type?: string,
}


const InputWithIcon: React.FC<InputWithIconPropsType> = ({
	placeholder,
	icon,
	visible = true,
	value,
	setValue,
	isFormInput = false,
	title,
	style = {},
	center = false,
	onClick = () => { },
	register = () => { return {} },
	inputStyle = {},
	multiline = false,
	onClickOnInput = () => { },
	errorText,
	...props
}) => {
	const customProps = !isFormInput ? {
		value,
		onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
			if (setValue) {
				setValue(e.target.value)
			}
		}
	} : {};

	return (
		<div className={`inputWrapper ${!visible ? 'notVisible' : ''}  ${center ? 'centerAlignInput' : ''}`}>
			{title ? <div className="inputWithIconTitle">{title}</div> : <></>}
			<div className="inputItem" style={style}>
				{icon ? <img src={icon}
					className={`inputIcon ${!visible ? 'notVisible' : ''}`}
					style={{}}
					onClick={onClick}
					alt="" /> : <></>}
				{multiline ? <textarea
					className="inputWithIcon"
					placeholder={placeholder}
					{...customProps}
					{...register(props.label, {})}
					style={inputStyle}
					maxLength={2001}
					autoComplete={props.autoComplete}
				/> : <input
					className="inputWithIcon"
					placeholder={placeholder}
					{...customProps}
					{...register(props.label, {})}
					style={inputStyle}
					onClick={onClickOnInput}
					autoComplete={props.autoComplete}
					type={props.type}
				/>}
			</div>
			<span className="inpuErrorTitle">{errorText}</span>
		</div>
	);
};

export default InputWithIcon;