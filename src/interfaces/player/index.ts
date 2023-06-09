import { ParentInterface } from 'interfaces/parent';
import { PlayerExerciseInterface } from 'interfaces/player-exercise';
import { UserInterface } from 'interfaces/user';
import { AcademyInterface } from 'interfaces/academy';
import { GetQueryInterface } from 'interfaces';

export interface PlayerInterface {
  id?: string;
  user_id: string;
  academy_id: string;
  date_of_birth: Date | string;
  position: string;
  achievements?: string;
  performance_metrics?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  parent?: ParentInterface[];
  player_exercise?: PlayerExerciseInterface[];
  user?: UserInterface;
  academy?: AcademyInterface;
  _count?: {
    parent?: number;
    player_exercise?: number;
  };
}

export interface PlayerGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  academy_id?: string;
  position?: string;
  achievements?: string;
  performance_metrics?: string;
}
