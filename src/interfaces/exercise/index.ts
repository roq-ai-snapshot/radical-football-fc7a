import { PlayerExerciseInterface } from 'interfaces/player-exercise';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ExerciseInterface {
  id?: string;
  name: string;
  description?: string;
  coach_id: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  player_exercise?: PlayerExerciseInterface[];
  user?: UserInterface;
  _count?: {
    player_exercise?: number;
  };
}

export interface ExerciseGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  coach_id?: string;
}
