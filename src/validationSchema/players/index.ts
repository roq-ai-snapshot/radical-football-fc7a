import * as yup from 'yup';
import { parentValidationSchema } from 'validationSchema/parents';
import { playerExerciseValidationSchema } from 'validationSchema/player-exercises';

export const playerValidationSchema = yup.object().shape({
  date_of_birth: yup.date().required(),
  position: yup.string().required(),
  achievements: yup.string(),
  performance_metrics: yup.string(),
  user_id: yup.string().nullable().required(),
  academy_id: yup.string().nullable().required(),
  parent: yup.array().of(parentValidationSchema),
  player_exercise: yup.array().of(playerExerciseValidationSchema),
});
