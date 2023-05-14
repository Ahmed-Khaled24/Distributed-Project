import bcrypt from 'bcrypt';

async function encryptPassword(password: string) {
    const encryptedPassword = await bcrypt.hash(password, 15 );
    return encryptedPassword;
}

async function checkPassword(password: string, encryptedPassword: string): Promise<boolean>  {
    const result = await bcrypt.compare(password, encryptedPassword);
    return result;
}

export { encryptPassword, checkPassword };