import React, { HTMLAttributes, DetailedHTMLProps } from 'react';
import Select, { GroupBase, OptionsOrGroups, PropsValue, SingleValue } from 'react-select';
import { FilterType } from '../../types/filterTypes';

import './styles.scss';

export interface SelectPropsType
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  selectedOption: PropsValue<string>;
  handleChange?: (value: SingleValue<FilterType> | any) => void;
  options: OptionsOrGroups<string, GroupBase<string> | any>;
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