import { useEffect, useState } from 'react';
import './DayTile.scss';
import Modal from './Modal';

const DayTile = ({ event, startDay, i, className }) => {
  const [isEventModalDisplayed, setIsEventModalDisplayed] = useState(false);

  useEffect(() => {
    if (isEventModalDisplayed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isEventModalDisplayed]);

  const currentDate = new Date();

  const eventDate = event
    ? new Date(`${event.year}/${event.month}/${event.dayEnd}`)
    : null;
  return (
    <>
      <div
        className={
          event && eventDate < currentDate
            ? `past-event ${className}`
            : className
        }
        style={{ gridColumnStart: `${((startDay + i - 1) % 7) + 1}` }}
        onClick={() =>
          event !== undefined ? setIsEventModalDisplayed(true) : null
        }
      >
        {i + 1}
      </div>
      {isEventModalDisplayed && (
        <Modal
          event={event}
          setIsEventModalDisplayed={setIsEventModalDisplayed}
          isEventModalDisplayed={isEventModalDisplayed}
        />
      )}
    </>
  );
};

export default DayTile;
