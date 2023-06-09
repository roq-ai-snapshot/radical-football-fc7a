import { UserInterface } from 'interfaces/user';
import { PlayerInterface } from 'interfaces/player';
import { GetQueryInterface } from 'interfaces';

export interface ParentInterface {
  id?: string;
  user_id: string;
  player_id: string;
  created_at?: Date | string;
  updated_at?: Date | string;

  user?: UserInterface;
  player?: PlayerInterface;
  _count?: {};
}

export interface ParentGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  player_id?: string;
}
