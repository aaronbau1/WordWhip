'use client'

import { openGameOverModal } from '@/lib/features/gameState-slice';
import { stopClock } from '@/lib/features/levelState-slice';
import { AppDispatch, RootState, useAppSelector } from '@/lib/store';
import { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { connect, useDispatch } from 'react-redux';

interface ClockProps {
  clockTime: number;
  runningClock: boolean;
}

const Clock = ({runningClock, clockTime}:ClockProps) => {

  const [reset, setReset] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  const handleReset = () => {
    setReset(prevKey => prevKey + 1)
  }

  const handleClockComplete = () => {
    dispatch(stopClock())
    dispatch(openGameOverModal())
  }

  return (
    <div className='flex mt-3 items-center justify-center bg-white rounded-full font-semibold text-2xl'>
      {/* <Button onClick={handleReset}>reset</Button> */}
      <CountdownCircleTimer
        key={reset}
        isPlaying={false}
        duration={clockTime}
        colors={['#50C878', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[45, 30, 15, 0]}
        isSmoothColorTransition
        onComplete={handleClockComplete}
        size={80}
        strokeWidth={10}
      >
        {({ remainingTime }) => (
          <div className={remainingTime <= 3 ? 'text-red-600' : ''}>
            {remainingTime}
          </div>
        )}
      </CountdownCircleTimer>
    </div>
  )
}

const mapStateToProps = (state: RootState): ClockProps => ({
  runningClock: state.levelState.value.runningClock,
  clockTime: state.levelState.value.clockTime,
});

export default connect(mapStateToProps)(Clock);
