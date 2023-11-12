import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'utils/axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await await getSession({ req });

  if (session && session.token.accessToken) {
    const { inspectionId, imageId } = req.query;
    console.log(inspectionId, imageId);
    axios.defaults.headers.common = { Authorization: `${session.token.accessToken as string}` };
    const response = await axios.get(`/api/kyc/image/${inspectionId}/${imageId}`, { responseType: 'arraybuffer' }).catch((err) => {
      res.status(err.response.status).json({ error: err });
    });
    if (response) {
      const base64 = btoa(
        new Uint8Array(response.data).reduce(function (data, byte) {
          return data + String.fromCharCode(byte);
        }, '')
      );
      res.status(200).json(base64);
    }
  } else {
    res.status(404).send({ error: 'No permission' });
  }
}
