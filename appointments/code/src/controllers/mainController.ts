import { Request, Response } from 'express';

/**
 * Function to get a time slot by ID
 * @param req {Request} - The Request object
 * @param res {Response} - The Response object
 */
export function showRoutes(req: Request, res: Response): void {
  res.set({
    'Content-Type': 'application/json',
    'Allow': 'GET',

  });
  res.status(200).send({
    appointments: '/appointments',
    timeslots: '/timeslots',
  });
}
