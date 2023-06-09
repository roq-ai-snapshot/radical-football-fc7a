const mapping: Record<string, string> = {
  academies: 'academy',
  exercises: 'exercise',
  parents: 'parent',
  players: 'player',
  'player-exercises': 'player_exercise',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
