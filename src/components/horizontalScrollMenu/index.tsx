import React, { HTMLAttributes, DetailedHTMLProps } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

import Arrow from './components/Arrow';

import './styles.scss';

export interface HorizontalScrollPropsType
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  CardItem: React.FunctionComponent<any>;
  data: any,
  setData: () => void;
}

const HorizontalScrollMenu: React.FC<HorizontalScrollPropsType> = ({ CardItem, data, setData }) => {
  const [selected, setSelected] = React.useState<number[]>([]);

  const isItemSelected = (id: number) => !!selected.find((el) => el === id);

  const handleClick =
    (id: number) =>
      (/* { getItemById, scrollToItem } */) => {
        const itemSelected = isItemSelected(id);
        setSelected((currentSelected: number[]) =>
          itemSelected
            ? currentSelected.filter((el) => el !== id)
            : currentSelected.concat(id)
        );
      };

  function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } =
      React.useContext(VisibilityContext);

    return (
      <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()} left={true}>
      </Arrow>
    );
  }

  function RightArrow() {
    const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

    return (
      <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
      </Arrow>
    );
  }

  function Card({ onClick, selected, item, itemId }: {
    onClick: () => void,
    selected: boolean,
    item: any,
    itemId: number
  }) {
    const visibility = React.useContext(VisibilityContext);
    return (
      <CardItem
        visibility={visibility}
        selected={selected}
        itemId={itemId}
        item={item}
        onClick={onClick}
      />
    );
  }

  return (
    <ScrollMenu
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
      itemClassName="item"
      separatorClassName="separator"
      scrollContainerClassName="scrollContainer"
    >
      {data.map((item: any, idx: number) => (
        <Card
          itemId={idx} // NOTE: itemId is required for track items
          item={item}
          key={idx}
          onClick={handleClick(idx)}
          selected={isItemSelected(idx)}
        />
      ))}
    </ScrollMenu>
  );
}

export default HorizontalScrollMenu;