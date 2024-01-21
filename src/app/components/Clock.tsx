import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const Clock = () => {
  return (
    <div className='flex mt-3 items-center justify-center bg-white rounded-full font-semibold text-2xl'>
      <CountdownCircleTimer
        isPlaying={false}
        duration={60}
        colors={['#006400', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[8, 6, 2, 0]}
        isSmoothColorTransition
        onComplete={() => {alert('u lose noob')}}
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

export default Clock