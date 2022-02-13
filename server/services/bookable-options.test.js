const { BookableOptionsService } = require('./bookable-options');

describe('BookableOptionsService', () => {
  test('should create an array containing desired schema', () => {
    // Arrange
    const service = new BookableOptionsService();

    // Act
    const bookableOptions = service.create();

    // Assert
    expect(bookableOptions.length).toBe(56);
    expect(bookableOptions[0]).toHaveProperty('start');
    expect(bookableOptions[0]).toHaveProperty('end');
  });
});
