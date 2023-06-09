import axios from 'axios';
import queryString from 'query-string';
import { ExerciseInterface, ExerciseGetQueryInterface } from 'interfaces/exercise';
import { GetQueryInterface } from '../../interfaces';

export const getExercises = async (query?: ExerciseGetQueryInterface) => {
  const response = await axios.get(`/api/exercises${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createExercise = async (exercise: ExerciseInterface) => {
  const response = await axios.post('/api/exercises', exercise);
  return response.data;
};

export const updateExerciseById = async (id: string, exercise: ExerciseInterface) => {
  const response = await axios.put(`/api/exercises/${id}`, exercise);
  return response.data;
};

export const getExerciseById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/exercises/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteExerciseById = async (id: string) => {
  const response = await axios.delete(`/api/exercises/${id}`);
  return response.data;
};
