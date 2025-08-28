// Tried this on replit....

const jwt = require('jsonwebtoken');
const zod = require('zod');
const jwtPassword = 'secret';

const mailSchema = zod.email();
const passwordschema = zod.string().min(6);

function signJwt(username, password) {
    const usernameRes = mailSchema.safeParse(username);
    const passwordRes = passwordschema.safeParse(password);

    if (!usernameRes.success || !passwordRes.success) {
        return null;
    }

    const Signature = jwt.sign({
        username
    }, jwtPassword);
    return Signature;
}



function verifyJwt(token) {
    try {
            jwt.verify(token,jwtPassword);
            return true
    } catch (error) {
    
    }
    return false
}

function decodeJwt(token) {
    const decoded = jwt.decode(token)
    if (decoded) {
        return true
    } else {
        return false
    }
}
console.log(signJwt("pranav@gmail.com", "123456"));

console.log(decodeJwt(signJwt("pranav@gmail.com", "123456")));

console.log(verifyJwt(signJwt("pranav@gmail.com", "123456")));