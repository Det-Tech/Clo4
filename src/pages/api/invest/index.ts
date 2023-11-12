import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'utils/axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (session && session.token.accessToken) {
    const { projectId, amount } = req.query;
    axios.defaults.headers.common = { Authorization: `${session.token.accessToken as string}` };

    const response = await axios.post(`/api/invest`, { projectId, amount }).catch((err) => {
      console.log(err);
      if (err) {
        res.status(err.response.status).json({ error: err });
      }
    });
    if (response) {
      console.log(response.data);
      res.status(200).json(response.data);
    }
  } else {
    res.status(404).send({ error: 'No permission' });
  }
}
