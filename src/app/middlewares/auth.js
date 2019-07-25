// The 'jwt' import bellow is responsible for creting the tokens used in the validation process
import jwt from 'jsonwebtoken';
// The 'promisify' dependency is used to use asyncronous functions as synchronous
import { promisify } from 'util';
// The import bellow is responsible for provind the 'secret' and how for long will the token be valid
import authConfig from '../../config/auth';

/**
 * The export bellow is responsible for checking if a token is being provided and,
 * if so, if the token's authenticity, returning the lack of a token, its invalidity or
 * allowing a connection
 */
export default async (req, res, next) => {
  // The 'const' variable receives the authorization that is inside the header
  const authHeader = req.headers.authorization;

  // If the 'authHeader' is null, i'll return a 'Token not provided message'
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  /**
   *  If the token isn't null, the 'token' variable will get the value that was inside header
   *  By doing so, the 'Bearer' word that is inside the 'authHeader' will be discarted and
   *  only the token will remain
   */
  const [, token] = authHeader.split(' ');

  /**
   * The token is then checked and, if it is valid, the 'req.userId' will receive the user's
   * id and i'll return next, proceding to the next route. If not, it'll return as an invalid token
   */
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token Invalid' });
  }
};
