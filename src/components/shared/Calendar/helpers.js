export const isYearCommon = (y) => {
  if (y % 4 === 0 && y % 100 !== 0) {
    return true;
  }
  return false;
};

export const countDays = (
  month1,
  year1,
  month2,
  year2,
  months,
  nrOfAllDays
) => {
  let days = 0;

  if (year1 === year2 && month2 > month1) {
    for (let i = month1; i < month2; i++) {
      days += months[i].nrOfDays;
    }
    if (isYearCommon(year1) && month1 <= 1 && month2 > 1) {
      days++;
    }
    return days;
  } else if (year1 === year2 && month2 < month1) {
    for (let i = month1 - 1; i >= month2; i--) {
      days += months[i].nrOfDays;
    }
    if (isYearCommon(year1) && month2 <= 1 && month1 > 1) {
      days++;
    }
    days *= -1;
    return days;
  } else if (year1 < year2) {
    if (isYearCommon(year1) && month1 < 2) {
      days++;
    }

    if (isYearCommon(year2) && month2 > 1) {
      days++;
    }

    for (let i = month1; i < 12; i++) {
      days += months[i].nrOfDays;
    }
    for (let i = 0; i < month2; i++) {
      days += months[i].nrOfDays;
    }

    for (let i = year1 + 1; i < year2; i++) {
      if (isYearCommon(i)) {
        days += nrOfAllDays + 1;
      } else {
        days += nrOfAllDays;
      }
    }
    return days;
  } else if (year2 < year1) {
    // if (isYearCommon(year1)) {
    //   days++;
    // }
    if (isYearCommon(year2) && month2 < 2) {
      days++;
    }

    if (isYearCommon(year1) && month1 > 1) {
      days++;
    }
    for (let i = month1 - 1; i >= 0; i--) {
      days += months[i].nrOfDays;
    }
    for (let i = year1 - 1; i > year2; i--) {
      if (isYearCommon(i)) {
        days += nrOfAllDays + 1;
      } else {
        days += nrOfAllDays;
      }
    }
    for (let i = 11; i >= month2; i--) {
      days += months[i].nrOfDays;
    }
    days *= -1;
  }
  return days;
};
