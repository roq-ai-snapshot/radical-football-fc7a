import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { exerciseValidationSchema } from 'validationSchema/exercises';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.exercise
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getExerciseById();
    case 'PUT':
      return updateExerciseById();
    case 'DELETE':
      return deleteExerciseById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getExerciseById() {
    const data = await prisma.exercise.findFirst(convertQueryToPrismaUtil(req.query, 'exercise'));
    return res.status(200).json(data);
  }

  async function updateExerciseById() {
    await exerciseValidationSchema.validate(req.body);
    const data = await prisma.exercise.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteExerciseById() {
    const data = await prisma.exercise.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
