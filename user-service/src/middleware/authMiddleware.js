const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer token format

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = decoded; // Attach user info to request object
        next();
    });
};

//curl -X PUT http://localhost:3000/api/users -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzJkYTk2YWM3NjdkOTNmN2RlZTIzNCIsImlhdCI6MTczNTU4MTM2MCwiZXhwIjoxNzM1NTg0OTYwfQ.Fl0sYhttkloOsqS0kSaRuInKnGOX3uzKLnHmyjGmI2k" -H "Content-Type: application/json" -d '{"newUsername": "newTestUser"}'