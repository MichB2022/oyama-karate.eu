import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';

function CalendarView(props) {
  const {
    calendarTitle,
    chosenMonth,
    chosenYear,
    generateDayTiles,
    generateMonthListItems,
    generateWeekDays,
    generateYearsListItems,
    handleArrowClick,
    handleDateSwitcherClick,
    isMonthSwitcherOpen,
    isYearSwitcherOpen,
    months,
    startDay
  } = props;

  return (
    <section className='calendar-container'>
      <header className='top'>
        <IoMdArrowDropleft
          className='arrow-left'
          onClick={() => handleArrowClick('LEFT')}
        />

        <p className='month-and-year' onClick={handleDateSwitcherClick}>
          {`${months[chosenMonth].name} ${chosenYear}`}
        </p>

        <IoMdArrowDropright
          className='arrow-right'
          onClick={() => handleArrowClick('RIGHT')}
        />
      </header>

      <main className='calendar-content'>
        {isYearSwitcherOpen && (
          <div className='year-switcher'>
            <div className='year-list-wrapper'>
              <ul className='year-list'>{generateYearsListItems()}</ul>
            </div>
          </div>
        )}

        {isMonthSwitcherOpen && (
          <div className='month-switcher'>
            <div className='month-list-wrapper'>
              <ul className='month-list'>{generateMonthListItems()}</ul>
            </div>
          </div>
        )}

        <div className='week-days'>{generateWeekDays()}</div>

        <div className='month-days'>
          {generateDayTiles(months[chosenMonth].nrOfDays, startDay)}
        </div>
      </main>
    </section>
  );
}

export default CalendarView;
