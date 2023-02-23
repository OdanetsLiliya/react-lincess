import React, { HTMLAttributes, DetailedHTMLProps } from 'react';
import DOMPurify from 'dompurify';

import './styles.scss';

export interface DetailsPropsType
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isAvailiable: boolean;
  details: string;
}

const Details: React.FC<DetailsPropsType> = ({ isAvailiable, details }) =>
(isAvailiable ?
  <div className="detailsContainer">
    <div className="details"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(details) }}
    >
    </div>
  </div> : <></>
)

export default Details;