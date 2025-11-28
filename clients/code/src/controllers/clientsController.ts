import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Owner} from '../../prisma/types.ts';
const prisma: PrismaClient = new PrismaClient();

/**
 * Interface for the response object
 */
interface OwnerResponse {
  meta: {
    count: number
    title: string
    url: string
  },
  data: Owner[]
}

/**
 * Function to get all people
 * @param req {Request} - The Request object
 * @param res {Response} - The Response object
 * @returns {Promise<void>}
 */
export async function getOwners(req: Request, res: Response): Promise<void> {
  try {
    const owners: Owner[] = await prisma.owner.findMany();
    const ownerResponse: OwnerResponse = {
      meta: {
        count: owners.length,
        title: 'All owners',
        url: req.url
      },
      data: owners
    };
    res.status(200).send(ownerResponse);
  } catch (error) {
    res.status(500).send({
      error: {
        message: 'Failed to retrieve owners',
        code: 'SERVER_ERROR',
        url: req.url
      }
    });
  }
}

/**
 * Function to get a person by id
 * @param req {Request} - The Request object
 * @param res {Response} - The Response object
 * @returns {Promise<void>}
 */
export async function getOwner(req: Request, res: Response): Promise<void> {
  try {
    const id: number = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).send({
        error: {
          message: 'Invalid owner ID',
          code: 'INVALID_ID',
          url: req.url
        }
      });
      return;
    }
    const owner: Owner | null = await prisma.owner.findUnique({
      where: { id }
    });
    if (!owner) {
      res.status(404).send({
        error: {
          message: `Owner with ID ${id} not found`,
          code: 'NOT_FOUND',
          url: req.url
        }
      });
      return;
    }
    res.status(200).send(owner);
  } catch (error) {
    res.status(500).send({
      error: {
        message: 'Internal server error',
        code: 'SERVER_ERROR',
        url: req.url
      }
    });
  }
}

export async function setOwner(req: Request, res: Response): Promise<void> {
  try {
    const { name, email } = req.body;
    const newOwner: Owner = await prisma.owner.create({
      data: {
        name,
        email
      }
    });
    res.status(201).send(newOwner);
  } catch (error) {
    res.status(500).send({
      error: {
        message: 'Failed to create owner',
        code: 'SERVER_ERROR',
        url: req.url
      }
    });
  }
}
