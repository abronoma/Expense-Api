import jwtProvider from '../providers/provider.mjs';

export default (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Authorization Header:', req.headers['authorization']);
console.log('Extracted Token:', token);


  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });


  try {
    const decoded = jwtProvider.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
