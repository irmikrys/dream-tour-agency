const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const isValidDate = require('../../utils/dateValidator');
const {check, validationResult} = require('express-validator');

const Trip = require('../../models/Trip');
const User = require('../../models/User');

const QUERY_TRIP_BASICS = '-__v -gallery -comments -reservations -createDate';

/**
 * @route   GET api/trips
 * @desc    Trips main route
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const trips = await Trip
      .find()
      .select(QUERY_TRIP_BASICS);
    await res.json(trips);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route   POST api/trips
 * @desc    Trips creation route
 * @access  Private
 */
router.post('/', [auth, [
  check('name', 'Name is required').not().isEmpty(),
  check('country', 'Country is required').not().isEmpty(),
  check('startDate', 'Start date is required').not().isEmpty(),
  check('startDate', 'Start date must be valid').custom(isValidDate),
  check('endDate', 'End date is required').not().isEmpty(),
  check('endDate', 'End date must be valid').custom(isValidDate),
  check('price', 'Price is required').not().isEmpty(),
  check('currency', 'Currency is required').not().isEmpty(),
  check('currency', 'Enter a valid currency code').isCurrency(),
  check('maxPlaces', 'Maximum number of places is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
]], async (req, res) => {

  try {
    const user = await User.findById(req.user.id).select('role');
    if (user.role !== 'admin') {
      return res.status(400).json({msg: 'Only administrator can add a new trip', user})
    }
  } catch (e) {
    console.error(e.message);
    return res.status(500).send('Server error');
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }
  try {
    const {name, country, startDate, endDate, price, currency, maxPlaces, description, pictureLink = ''} = req.body;
    const newTrip = new Trip({
      name,
      country,
      startDate,
      endDate,
      price,
      currency,
      maxPlaces,
      description,
      pictureLink,
      placesCount: maxPlaces,
    });
    await newTrip.save();
    await res.json(newTrip)

  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route   GET api/trips/:tripId
 * @desc    Trip detailed information
 * @access  Public
 */
router.get('/:tripId', async (req, res) => {
  try {
    const trip = await Trip
      .findById(req.params.tripId)
      .select('-__v');
    await res.json(trip);

  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route   POST api/trips/:tripId/reservations
 * @desc    Trips reservations creation route
 * @access  Private
 */
router.post('/:tripId/reservations', [auth, [
  check('count', 'Reservations count is required').not().isEmpty(),
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }
  try {
    let {count} = req.body;
    const trip = await Trip.findById(req.params.tripId);

    if (trip.reservations.map(r => r.author).filter(a => a.toString() === req.user.id).length > 0) {
      return res.status(400).json({errors: [{msg: 'You\'ve already made a reservation for this trip'}]})
    }

    if (trip.placesCount === 0) {
      return res.status(400).json({errors: [{msg: 'Cannot make reservation for a trip with no places left'}]})
    }

    if (count > trip.placesCount) {
      count = trip.placesCount;
      console.warn('Count too big, changed to max free places count...')
    }

    const newReservation = {
      author: req.user.id,
      count
    };

    trip.reservations.unshift(newReservation);
    trip.placesCount -= count;
    await trip.save();
    await res.json(trip);

  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route   GET api/trips/user/reservations
 * @desc    Trips reservations for authenticated user
 * @access  Private
 */
router.get('/user/reservations', auth, async (req, res) => {
  try {
    const trips = await Trip.find().select('reservations price currency name');
    const userTrips = trips
      .filter(trip => trip.reservations
        .filter(r => r.author.toString() === req.user.id).length > 0
      )
      .map(trip => ({
        ...trip.reservations,
        id: trip.id,
        tripId: trip.id,
        price: trip.price,
        name: trip.name,
        currency: trip.currency
      }));
    await res.json(userTrips);

  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route   POST api/trips/:tripId/comments
 * @desc    Trips comments creation route
 * @access  Private
 */
router.post('/:tripId/comments', [auth, [
  check('title', 'Title is required').not().isEmpty(),
  check('content', 'Content is required').not().isEmpty(),
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }
  try {
    const {title, content} = req.body;
    const trip = await Trip.findById(req.params.tripId);

    // check if author made trip reservation
    const hasReservedTrip = trip.reservations.filter(it => it.author.toString() === req.user.id).length > 0;
    if (!hasReservedTrip) {
      return res.status(400).json({errors: [{msg: 'Only users with reservation can comment'}]})
    }

    const newComment = {
      author: req.user.id,
      title,
      content
    };

    trip.comments.unshift(newComment);
    await trip.save();
    await res.json(trip.comments);

  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route   GET api/trips/:tripId/comments
 * @desc    Trips comments creation route
 * @access  Private
 */
router.get('/:tripId/comments', auth, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId).select('comments');
    await res.json(trip.comments);

  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route   POST api/trips/:tripId/ratings
 * @desc    Trips ratings creation route
 * @access  Private
 */
router.post('/:tripId/ratings', [auth, [
  check('rating', 'Rating is required').not().isEmpty(),
  check('rating', 'Rating should be a number between 1 and 5').matches(/^(?:[1-5])$/),
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }
  try {
    const {rating} = req.body;
    const trip = await Trip.findById(req.params.tripId);

    // check if author made trip reservation
    const hasReservedTrip = trip.reservations.filter(it => it.author.toString() === req.user.id).length > 0;
    if (!hasReservedTrip) {
      return res.status(400).json({errors: [{msg: 'Only users with reservation can add rating'}]})
    }

    // check if author hasn't already made rating
    const hasRatedTrip = trip.ratings.filter(it => it.author.toString() === req.user.id).length > 0;
    if (hasRatedTrip) {
      return res.status(400).json({errors: [{msg: 'You have already rated this trip'}]});
    }

    const newRating = {
      author: req.user.id,
      rating
    };

    trip.ratings.unshift(newRating);
    await trip.save();
    await res.json(trip.ratings);

  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route   GET api/trips/:tripId/ratings
 * @desc    Trip ratings route
 * @access  Public
 */
router.get('/:tripId/ratings', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId).select('ratings');
    await res.json(trip.ratings);

  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route   GET api/trips/:tripId/user/rating
 * @desc    Trip user's rating route
 * @access  Private
 */
router.get('/:tripId/user/rating', auth, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId).select('ratings');
    const userRatings = trip.ratings.filter(r => r.author.toString() === req.user.id);
    await res.json(userRatings);

  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
