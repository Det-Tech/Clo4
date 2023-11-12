import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'utils/axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await await getSession({ req });

  if (session && session.token.accessToken) {
    const { _id } = req.query;

    axios.defaults.headers.common = { Authorization: `${session.token.accessToken as string}` };

    const response = await axios.get(`/api/user/${_id}`).catch((err) => {
      res.status(err.response.status).json({ error: err });
    });

    if (response) {
      res.status(200).json(response.data);
    }
  } else {
    res.status(404).send({ error: 'No permission' });
  }
}
