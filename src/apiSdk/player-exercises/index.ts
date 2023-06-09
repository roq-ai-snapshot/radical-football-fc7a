import axios from 'axios';
import queryString from 'query-string';
import { PlayerExerciseInterface, PlayerExerciseGetQueryInterface } from 'interfaces/player-exercise';
import { GetQueryInterface } from '../../interfaces';

export const getPlayerExercises = async (query?: PlayerExerciseGetQueryInterface) => {
  const response = await axios.get(`/api/player-exercises${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPlayerExercise = async (playerExercise: PlayerExerciseInterface) => {
  const response = await axios.post('/api/player-exercises', playerExercise);
  return response.data;
};

export const updatePlayerExerciseById = async (id: string, playerExercise: PlayerExerciseInterface) => {
  const response = await axios.put(`/api/player-exercises/${id}`, playerExercise);
  return response.data;
};

export const getPlayerExerciseById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/player-exercises/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePlayerExerciseById = async (id: string) => {
  const response = await axios.delete(`/api/player-exercises/${id}`);
  return response.data;
};
