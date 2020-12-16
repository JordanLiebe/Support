import React from 'react';
import { GlobalStat } from '../interfaces/Stats';

const ApiStatsController = process.env.REACT_APP_API_URL + '/Stat';

export const getGlobalStats = async () => {
  const authenticationUrl = ApiStatsController + '/Global';
  let response = await fetch(authenticationUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((e) => console.error(e));

  if (response && response.status === 200) {
    let apiResponse: GlobalStat[] | undefined = await response.json();
    return apiResponse;
  }

  return undefined;
};
