import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Appointment, TimeSlot } from '../../prisma/types.ts';
const prisma: PrismaClient = new PrismaClient();

/**
 * Interface for the response object
 */
interface TimeSlotResponse {
  meta: {
    count: number
    title: string
    url: string
  },
  data: string[]
}

/**
 * Function to get all people
 * @param req {Request} - The Request object
 * @param res {Response} - The Response object
 * @returns {Promise<void>}
 */
export async function getAllTimeSlots(req: Request, res: Response): Promise<void> {
  const timeslots: TimeSlot[] = await prisma.timeslot.findMany();
  const timeSlotIds: string[] = timeslots.map((timeslot: TimeSlot) => `/timeslots/${timeslot.id}`);
  const timeslotResponse: TimeSlotResponse = {
    meta: {
      count: timeslots.length,
      title: 'All timeslots',
      url: req.url
    },
    data: timeSlotIds
  };
  res.status(200).send(timeslotResponse);
}

/**
 * Function to get a time slot by ID
 * @param req {Request} - The Request object
 * @param res {Response} - The Response object
 * @returns {Promise<void>}
 */
export async function getTimeSlotById(req: Request, res: Response): Promise<void> {
  const id: number = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send('Invalid ID');
    return;
  } else {
    const timeslot: TimeSlot | null = await prisma.timeslot.findUnique({
      where: {
        id: id
      }
    });
    if (timeslot) {
      res.status(200).send(timeslot);
    } else {
      res.status(404).send('Timeslot not found');
    }
  }
}

export async function getFreeTimeSlots(req: Request, res: Response): Promise<void> {
  console.log('Getting free time slots for:', req.query.date);
  const date = req.query.date as string;
  console.log(date);
  if (!date) {
    throw new Error('Date query parameter is required');
  }
  const appointments = await prisma.appointment.findMany({
    select: {
      timeslotId: true
    },
    where: {
      appointmentDate: new Date(date)
    }
  });
  const appointmentsForSpecificDate: number[] = appointments.map(a => a.timeslotId);
  let freeTimeSlots: number;
  if (appointmentsForSpecificDate.length === 0) {
    freeTimeSlots = 1;
  } else {
    for (let i = 1; i <= 16; i++) {
      if (!appointmentsForSpecificDate.includes(i)) {
        freeTimeSlots = i;
        break;
      }
    }
  }
  const freeTimeslotResponse: TimeSlotResponse = {
    meta: {
      count: 1,
      title: 'First free timeslot',
      url: req.url
    },
    data: [freeTimeSlots]
  };
  res.status(200).send(freeTimeslotResponse);
}
