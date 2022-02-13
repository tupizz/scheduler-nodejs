const { DateTime, Settings } = require('luxon');

// We should create and handle dates that come from db and server on UTC
Settings.defaultZone = 'utc';

class AvailableTimesService {
  constructor(dbClient, bookableOptionService) {
    this.db = dbClient;
    this.bookableOptionService = bookableOptionService;
  }

  /**
 * Given all the appointments from a given user, and a possible bookable spot
 * we will return if we have any occurrence of overlap or whether we don't have
 *
 * @param appointments: Array<{ start: string, end: string }>
 * @param spot: { start: DateTime, end: DateTime }
 * @returns undefined || { start: string, end: string }
 */
  findOverlapOccurrence(appointments, spot) {
    return appointments.find((appointment) => {
      const appointmentStart = DateTime.fromISO(appointment.start);
      const appointmentEnd = DateTime.fromISO(appointment.end);

      return (
        (appointmentStart > spot.start && appointmentStart < spot.end)
      || (appointmentEnd > spot.start && appointmentEnd < spot.end)
      );
    });
  }

  /**
   * Given an array of appointments and all possible bookable options
   * during the next 7 days, we will filter all by item which do not
   * overlap any appointment time window
   *
   * @param appointments: Array<{ start: string, end: string }>
   * @param bookableOptions: Array<{ start: DateTime, end: DateTime }>
   * @returns Array<{ start: DateTime, end: DateTime }>
   */
  getAvailableTimes(appointments, bookableOptions) {
    return bookableOptions.filter((bookableOption) => {
      const overlapOccurrence = this.findOverlapOccurrence(appointments, {
        start: bookableOption.start,
        end: bookableOption.end,
      });

      return !overlapOccurrence;
    });
  }

  async getByUser(hostUserId) {
    const appointments = await this.db.calendar.findEventsForUser(hostUserId);
    const bookableOptions = this.bookableOptionService.create();
    const availableTimes = this.getAvailableTimes(appointments, bookableOptions);
    return availableTimes.map((time) => time.start);
  }
}

module.exports = { AvailableTimesService };
