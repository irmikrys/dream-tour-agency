const express = require('express');
const {check, validationResult} = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth');
const isValidDate = require('../../utils/dateValidator');
const generateError = require('../../utils/errorsGenerator');
const Trip = require('../../models/Trip');
const User = require('../../models/User');

const QUERY_TRIP_BASICS = '-__v -gallery -comments -reservations';

/**
 * @route   GET api/trips
 * @desc    Trips main route
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const tripQuery = Trip.find().select(QUERY_TRIP_BASICS).sort({price: 1});
    const allTrips = await tripQuery;
    const expensive = allTrips.length && allTrips[allTrips.length - 1].id;
    const cheap = allTrips.length && allTrips[0].id;
    const taken = allTrips.filter(t => t.placesCount === 0).length;
    let fetchedTrips;

    if (pageSize && currentPage) {
      tripQuery
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize);
    }
    tripQuery
      .then(trips => {
        fetchedTrips = trips;
        return Trip.countDocuments();
      })
      .then(count => {
        res.json({
          trips: fetchedTrips,
          maxTrips: count,
          expensive,
          cheap,
          taken
        })
      });
  } catch (e) {
    console.error(e.message);
    res.status(500).json(generateError('Server error on fetching trips'));
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
  // check('startDate', 'Start date must be valid').custom(isValidDate),
  check('endDate', 'End date is required').not().isEmpty(),
  // check('endDate', 'End date must be valid').custom(isValidDate),
  check('price', 'Price is required').not().isEmpty(),
  check('currency', 'Currency is required').not().isEmpty(),
  check('currency', 'Currency code must have length of 3 characters').isLength({min: 3, max: 3}),
  check('maxPlaces', 'Maximum number of places is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
]], async (req, res) => {

  try {
    const user = await User.findById(req.user.id).select('role');
    if (user.role !== 'admin') {
      return res.status(401).json(generateError('Only administrator can add a new trip'))
    }
  } catch (e) {
    console.error(e.message);
    return res.status(500).json(generateError('Server error on fetching trip author'));
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  try {
    const {name, country, startDate, endDate, price, currency, maxPlaces, description, pictureLink = ''} = req.body;

    if(new Date().getTime() - new Date(startDate).getTime() > 0) {
      return res.status(400).json(generateError('Start date cannot be earlier than now'));
    }
    if(new Date(endDate).getTime() - new Date(startDate).getTime() < 0) {
      return res.status(400).json(generateError('End date cannot be earlier than start date'));
    }

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
      // overallRating: 0,
    });
    await newTrip.save();
    await res.json(newTrip)

  } catch (e) {
    console.error(e.message);
    res.status(500).json(generateError('Server error on trip create'));
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
      .select('-__v -comments');
    await res.json(trip);

  } catch (e) {
    console.error(e.message);
    res.status(500).json(generateError('Server error on detail trip fetch'));
  }
});

/**
 * @route   DELETE api/trips/:tripId
 * @desc    Delete trip by id
 * @access  Private
 */
router.delete('/:tripId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('role');
    if (user.role !== 'admin') {
      return res.status(401).json(generateError('Only administrator can delete a trip'))
    }

    await Trip.findOneAndRemove({_id: req.params.tripId});
    await res.json({msg: `Trip with id ${req.params.tripId} deleted`});

  } catch (e) {
    console.error(e.message);
    res.status(500).send(generateError('Server error on trip delete'));
  }
});

// TODO: make a route that updates trip, but only specific fields for user; and specific fields for admin

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
      return res.status(400).json(generateError('You\'ve already made a reservation for this trip'))
    }

    if (trip.placesCount === 0) {
      return res.status(400).json(generateError('Cannot make reservation for a trip with no places left'))
    }

    if (count > trip.placesCount) {
      count = trip.placesCount;
      console.warn('Count too big, changed to max free places count...')
    }

    const newReservation = {
      author: req.user.id,
      count,
      createDate: Date.now()
    };

    trip.reservations.unshift(newReservation);
    trip.placesCount -= count;
    await trip.save();
    await res.json(trip.reservations[0]);

  } catch (e) {
    console.error(e.message);
    res.status(500).send(generateError('Server error on reservation'));
  }
});

/**
 * @route   GET api/trips/:tripId/reservations/:reservationId
 * @desc    Trip reservation by reservation id
 * @access  Private
 */
router.get('/:tripId/reservations/:reservationId', auth, async (req, res) => {
  try {
    const trip = await Trip
      .findById(req.params.tripId)
      .select('reservations price currency name date')
      .populate('reservations.author', 'name surname email');

    if (!trip) {
      return res.status(400).json(generateError('Trip does not exist!'));
    }

    const reservation = trip.reservations.filter(r => r._id.toString() === req.params.reservationId)[0];

    if (!reservation) {
      return res.status(400).json(generateError('Reservation does not exist!'));
    }

    if (req.user.id !== reservation.author._id.toString()) {
      return res.status(400).json(generateError('You do not have such reservation!'));
    }

    const confirmation = {
      tripData: {
        name: trip.name,
        price: trip.price,
        currency: trip.currency,
        id: trip.id
      },
      reservationData: {
        id: reservation._id,
        createDate: reservation.createDate,
        author: reservation.author,
        count: reservation.count
      }
    };

    await res.json(confirmation);

  } catch (e) {
    console.error(e.message);
    res.status(500).json(generateError('Server error on fetching user reservations'));
  }
});

/**
 * @route   GET api/trips/user/reservations
 * @desc    Trips reservations for authenticated user
 * @access  Private
 */
router.get('/user/reservations', auth, async (req, res) => {
  try {
    const trips = await Trip
      .find()
      .select('reservations price currency name');
    const userTrips = trips
      .filter(trip => trip.reservations
        .filter(r => r.author.toString() === req.user.id).length > 0
      )
      .map(trip => ({
        reservation: trip.reservations[0],
        tripId: trip.id,
        price: trip.price,
        name: trip.name,
        currency: trip.currency
      }))
      .sort(function (a, b) {
        return new Date(b.reservation.createDate) - new Date(a.reservation.createDate);
      });
    await res.json(userTrips);

  } catch (e) {
    console.error(e.message);
    res.status(500).json(generateError('Server error on fetching user reservations'));
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
      return res.status(401).json(generateError('Only users with reservation can comment'))
    }

    const newComment = {
      author: req.user.id,
      title,
      content
    };

    trip.comments.unshift(newComment);
    await trip.save();

    const updatedTrip = await Trip
      .findById(req.params.tripId)
      .select('comments')
      .populate('comments.author');

    await res.json(updatedTrip.comments);

  } catch (e) {
    console.error(e.message);
    res.status(500).json(generateError('Server error on comments add'));
  }
});

/**
 * @route   GET api/trips/:tripId/comments
 * @desc    Trips comments fetch route
 * @access  Public
 */
router.get('/:tripId/comments', async (req, res) => {
  try {
    const trip = await Trip
      .findById(req.params.tripId)
      .select('comments')
      .populate('comments.author', 'name surname');
    await res.json(trip.comments.sort(function (a, b) {
      return new Date(b.createDate) - new Date(a.createDate);
    }));

  } catch (e) {
    console.error(e.message);
    res.status(500).json(generateError('Server error on fetching comments'));
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
      return res.status(401).json(generateError('Only users with reservation can add rating'))
    }

    // check if author hasn't already made rating
    const hasRatedTrip = trip.ratings.filter(it => it.author.toString() === req.user.id).length > 0;
    if (hasRatedTrip) {
      return res.status(400).json(generateError('You have already rated this trip'));
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
    res.status(500).json(generateError('Server error on rating add'));
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
    res.status(500).json(generateError('Server error on ratings fetch'));
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
    res.status(500).json(generateError('Server error on trip rating fetch'));
  }
});

module.exports = router;
