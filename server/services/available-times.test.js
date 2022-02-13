const { DateTime, Settings } = require('luxon');
const { AvailableTimesService } = require('./available-times');

// We should create and handle dates that come from db and server on UTC
Settings.defaultZone = 'utc';

describe('AvailableTimesService', () => {
  describe('getByUser()', () => {
    test('should get all available times for a given user', async () => {
      // Arrange
      const mockDbClient = {
        calendar: {
          findEventsForUser() {
            return [
              { start: '2022-02-15T15:10:00.000', end: '2022-02-15T16:30:00.000' },
              { start: '2022-02-16T14:10:00.000', end: '2022-02-16T15:20:00.000' }];
          },
        },
      };

      const mockBookableService = {
        create() {
          return [
            // Day 15
            {
              start: DateTime.fromISO('2022-02-15T13:00:00.000'), // should return
              end: DateTime.fromISO('2022-02-15T14:00:00.000'),
            },
            {
              start: DateTime.fromISO('2022-02-15T14:00:00.000'), // should return
              end: DateTime.fromISO('2022-02-15T15:00:00.000'),
            },
            {
              start: DateTime.fromISO('2022-02-15T15:00:00.000'), // should not return
              end: DateTime.fromISO('2022-02-15T16:00:00.000'),
            },
            {
              start: DateTime.fromISO('2022-02-15T16:00:00.000'), // should not return
              end: DateTime.fromISO('2022-02-15T17:00:00.000'),
            },
            // Day 16
            {
              start: DateTime.fromISO('2022-02-16T13:00:00.000'), // should return
              end: DateTime.fromISO('2022-02-16T14:00:00.000'),
            },
            {
              start: DateTime.fromISO('2022-02-16T14:00:00.000'), // should not return
              end: DateTime.fromISO('2022-02-16T15:00:00.000'),
            },
            {
              start: DateTime.fromISO('2022-02-16T15:00:00.000'), // should not return
              end: DateTime.fromISO('2022-02-16T16:00:00.000'),
            },
          ];
        },
      };

      const availableTimesService = new AvailableTimesService(mockDbClient, mockBookableService);

      // Act
      const availableTimes = await availableTimesService.getByUser('mock_user_id');

      // Assert
      expect(availableTimes.length).toBe(3);
    });

    test('given an empty bookable option should return an empty available options', async () => {
      // Arrange
      const mockDbClient = {
        calendar: {
          findEventsForUser() {
            return [
              { start: '2022-02-15T15:10:00.000', end: '2022-02-15T16:30:00.000' },
              { start: '2022-02-16T14:10:00.000', end: '2022-02-16T15:20:00.000' }];
          },
        },
      };

      const mockBookableService = {
        create() {
          return [];
        },
      };

      const availableTimesService = new AvailableTimesService(mockDbClient, mockBookableService);

      // Act
      const availableTimes = await availableTimesService.getByUser('mock_user_id');

      // Assert
      expect(availableTimes.length).toBe(0);
    });
  });
});
