import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';

import CoachCard from './components/coachCard';

import coachImg1 from '../../assets/images/jetasveta.jpg';

import { coachesActions } from '../../globals/coaches/actions';

import { RootStateType } from '../../stores';

import './styles.scss';

const CoachesList = () => {
  const dispatch = useDispatch();
  const { items = [] } = useSelector((state: RootStateType) => state.coach?.coaches);

  useEffect(() => {
    dispatch(coachesActions.getCoachesList({}))
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = () => {
    console.log('fetchData')
  }

  const onRefresh = () => {

  }

  return (
    <div className="coachesListContainer unselectableItems">
      <div className="coachesTitle">Список тренеров</div>
      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={fetchData}
        hasMore={true}
        loader={<></>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
        refreshFunction={onRefresh}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        }
      >
        <div className="coachesContainerGrid">
          {items.map(item => <CoachCard
            image_url={coachImg1}
            title={item.title}
            key={item.id}
            coachId={item.id}
          />
          )}
        </div>
      </InfiniteScroll>
    </div>

  );
}

export default CoachesList;