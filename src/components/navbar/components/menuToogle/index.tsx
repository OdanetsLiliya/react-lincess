import { motion, SVGMotionProps } from "framer-motion";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";

import './styles.scss';

const Path = (props: SVGMotionProps<SVGPathElement>) => (
  <motion.path
    fill="transparent"
    strokeLinecap="round"
    strokeWidth="3"
    {...props}
  />
);

const transition = { duration: 0.33 };
const lilac = 'rgba(199,147,235,1)';

export interface MenuTogglePropsType
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  toggle: () => void,
  isOpen: boolean
}

const MenuToggle: React.FC<MenuTogglePropsType> = ({ toggle, isOpen }) => {
  return (
    <div className="navBarButton" onClick={toggle}>
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path
          animate={isOpen ? "open" : "closed"}
          initial={false}
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5", stroke: lilac },
            open: { d: "M 3 16.5 L 17 2.5", stroke: lilac },
          }}
          transition={transition}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          stroke={lilac}
          animate={isOpen ? "open" : "closed"}
          initial={false}
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={transition}
        />
        <Path
          animate={isOpen ? "open" : "closed"}
          initial={false}
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346", stroke: lilac },
            open: { d: "M 3 2.5 L 17 16.346", stroke: lilac },
          }}
          transition={transition}
        />
      </svg>
    </div>
  );
}

export default MenuToggle;