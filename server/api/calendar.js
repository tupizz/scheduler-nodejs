const express = require('express');
const db = require('db');
const { AvailableTimesService } = require('../services/available-times');
const { BookableOptionsService } = require('../services/bookable-options');

const router = express.Router();

router.get('/api/calendar', async (req, res) => {
  const { hostUserId } = req.query;

  const service = new AvailableTimesService(db, new BookableOptionsService());

  const timeslots = await service.getByUser(hostUserId);

  res.json({
    name: 'Eng Test User',
    timeslotLengthMin: 60,
    timeslots,
  });
});

module.exports = router;
