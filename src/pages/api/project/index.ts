import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'utils/axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await await getSession({ req });

  if (session && session.token.accessToken) {
    const { allowance } = req.query;
    axios.defaults.headers.common = { Authorization: `${session.token.accessToken as string}` };

    const response = await axios.get(`/api/project/all${allowance ? `?allowance=${allowance}` : ''}`).catch((err) => {
      if (err && err.response) {
        res.status(err.response.status).json(err);
      }
    });
    if (response) {
      res.status(200).json(response.data);
    }
  } else {
    res.status(404).send({ error: 'No permission' });
  }
}
