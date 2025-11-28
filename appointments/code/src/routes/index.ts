import Express, { Router } from 'express';
import { getAllApointments, getApointmentById, setAppointment } from '../controllers/appointmentsController.ts';
import { getAllTimeSlots, getFreeTimeSlots, getTimeSlotById } from '../controllers/timeslotsController.ts';
import { showRoutes } from '../controllers/mainController.ts';
const router: Router = Express.Router();
import Cors from 'cors';

const currentApiVersion: string = 'v1';
const apiSlug: string = '/api/' + currentApiVersion;

router.get(`${apiSlug}/`, Cors(), showRoutes);

router.get(`${apiSlug}/appointments`, Cors(), getAllApointments);
router.post(`${apiSlug}/appointments`, Cors(), setAppointment);
router.get(`${apiSlug}/appointments/:id`, Cors(), getApointmentById);

router.get(`${apiSlug}/timeslots`, Cors(), getAllTimeSlots);
router.get(`${apiSlug}/timeslots/free`, Cors(), getFreeTimeSlots);
router.get(`${apiSlug}/timeslots/:id`, Cors(), getTimeSlotById);


export default router;
