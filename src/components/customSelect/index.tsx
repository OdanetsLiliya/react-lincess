import React, { HTMLAttributes, DetailedHTMLProps } from 'react';
import Select from 'react-select';

import './styles.scss';

export interface SelectPropsType
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  selectedOption: string;
  handleChange?: (value: any) => void;
  options: any;
  title?: string
  errorText?: string
}

const CustomSelect: React.FC<SelectPropsType> = ({
    selectedOption,
    handleChange,
    options,
    title,
    errorText
}) => {
  return (
    <div>
      <div className="inputWithIconTitle">{title}</div>
      <Select
        defaultValue={selectedOption}
        value={selectedOption}
        onChange={handleChange}
        options={options}
        classNames={{
          container: (state) => 'selectContainer',
          control: (state) => 'selectControl',
          singleValue: (state) => 'selectSingleValue',
          menu: (state) => 'selectMenu',
          menuList: (state) => 'selectMenuList',
          option: (state) => {
            return state.isSelected ? 'selectOption selectSelected' : 'selectOption'
          },
          placeholder: (state) => 'selectSingleValue placeholder',
        }}
      />
      <div className="inpuErrorTitle">{errorText}</div>
    </div>
    );
}

export default CustomSelect;