import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { playerExerciseValidationSchema } from 'validationSchema/player-exercises';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.player_exercise
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPlayerExerciseById();
    case 'PUT':
      return updatePlayerExerciseById();
    case 'DELETE':
      return deletePlayerExerciseById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPlayerExerciseById() {
    const data = await prisma.player_exercise.findFirst(convertQueryToPrismaUtil(req.query, 'player_exercise'));
    return res.status(200).json(data);
  }

  async function updatePlayerExerciseById() {
    await playerExerciseValidationSchema.validate(req.body);
    const data = await prisma.player_exercise.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deletePlayerExerciseById() {
    const data = await prisma.player_exercise.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
