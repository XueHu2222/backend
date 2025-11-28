import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Appointment } from '../../prisma/types.ts';
const prisma: PrismaClient = new PrismaClient();

/**
 * Interface for the response object
 */
interface AppointmentResponse {
  meta: {
    count: number
    title: string
    url: string
  },
  data: string[]
}

/**
 * Function to get all appointments
 * @param req {Request} - The Request object
 * @param res {Response} - The Response object
 * @returns {Promise<void>}
 */
export async function getAllApointments(req: Request, res: Response): Promise<void> {
  /**
   * working with query parameters is a bit tricky.
   * You need to check if the query parameter exists and then convert it to a number
   * However, you do not have control over the exact type of the query parameter
   */

  /**
   * TODO: refactor this code to make it more readable
   * Step 1 - are the query parameters present?
   * Step 2 - if they are present, convert them to numbers
   * Step 3 - use the numbers to filter the appointments
   */

  // let month: number = 0;
  let day: number = 0;
  let appointments: Appointment[];
  console.log(req.query);

  if (req.query.day) {
    const tempDay: string = req.query.day.toString();

    if (isNaN(Number(tempDay))) {
      res.status(400).send('Invalid query parameters');
      return;
    }
    if (Number(tempDay) < 1 || Number(tempDay) > 365) {
      res.status(400).send('Invalid day');
      return;
    }
    day = Number(tempDay);
    appointments = await getApppointmentsByDay(day);
    console.log(`I found: ${day}`);
  } else {
    appointments = await prisma.appointment.findMany();
  }

  const appointmentIds: string[] = appointments.map((appointment: Appointment) => `/appointments/${appointment.id}`);
  //reponse
  const appointmentResponse: AppointmentResponse = {
    meta: {
      count: appointments.length,
      title: 'All appointments',
      url: req.url
    },
    data: appointmentIds
  };
  res.status(200).send(appointmentResponse);
}


async function getApppointmentsByDay(day: number): Promise<Appointment[]> {
  console.log('What day is it?', day);
  const appointments: Appointment[] = await prisma.appointment.findMany(
    {
      where: {
        theDateId: day
      }
    }
  );
  console.log('I found app', appointments);
  return appointments;
}

// async function getApppointmentsByMonth(month: number): Promise<Appointment[]> {
//   const appointments: Appointment[] = await prisma.appointment.findMany(
//     {
//       where: {
//         theDate: {
//           month: month
//         }
//       }
//     }
//   );
//   return appointments;
// }

/**
 * Get an appointment by ID.
 * @param req {Request} - The Request object
 * @param res {Response} - The Response object
 * @returns {Promise<void>}
 */
export async function getApointmentById(req: Request, res: Response): Promise<void> {
  const id: number = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send('Invalid ID');
    return;
  } else {
    const appointment: Appointment | null = await prisma.appointment.findUnique({
      where: {
        id: id
      }
    });
    if (appointment) {
      res.status(200).send(appointment);
    } else {
      res.status(404).send('Appointment not found');
    }
  }
};

/**
 * Set appointments for a year, month, and day.
 * @param req {Request} - The Request object
 * @param res {Response} - The Response object
 */
export function setAppointment(req: Request, res: Response): void {
  console.log('setting appointment', req.body);
  const client: number = req.body.client ? req.body.client : 0;
  const date: number = req.body.date ? req.body.date : 0;
  const timeslot: number = req.body.timeslot ? req.body.timeslot : 0;
  console.log(client, date, timeslot);
  if (client != 0 && date != 0 && timeslot != 0) {
    res
      .status(200)
      .send(
        `Hi ${client}! I made an appointment for: ${date} at ${timeslot}!`
      );
  } else {
    res
      .status(200)
      .send('Hi love ❤️. I am trying to create an appointment but something went wrong. Please try again later.');
  }
}
