import React, { HTMLAttributes, DetailedHTMLProps } from 'react';
import DOMPurify from 'dompurify';

import DefaultButton from '../../../../components/defaultButton';

import './styles.scss';

export interface AboutPropsType
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isAvailiable: boolean;
  about: string;
}

const About: React.FC<AboutPropsType> = ({ isAvailiable, about }) => (isAvailiable ?
  <div className="aboutContainer">
    <div className="about"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(about) }}
    >
    </div>
    <div className="buttonWatch">
      <DefaultButton title="Смотреть" />
    </div>
  </div> : <></>
)

export default About;