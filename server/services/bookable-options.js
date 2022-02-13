const { DateTime } = require('luxon');

class BookableOptionsService {
  constructor() {
    this.NUMBER_OF_DAYS = 7;
    this.START_WORKDAY = 9;
    this.END_WORKDAY = 17;
  }

  /**
   * Given the criteria of number of days to get, and the start/end workday hour
   * we will deliver all possible bookable options using 1 hour window
   *
   * @returns Array<{ start: DateTime, end: DateTime }>
   */
  create() {
    const bookableOptions = [];
    let pastReference = DateTime.now().toUTC().startOf('day');
    for (let i = 0; i < this.NUMBER_OF_DAYS; i++) {
      const day = pastReference.plus({ days: 1 });

      for (let hour = this.START_WORKDAY; hour < this.END_WORKDAY; hour++) {
        const start = pastReference.plus({ days: 1 }).set({ hour });
        const end = start.plus({ hours: 1 });

        bookableOptions.push({ start, end });
      }

      pastReference = day;
    }

    return bookableOptions;
  }
}

module.exports = {
  BookableOptionsService,
};
