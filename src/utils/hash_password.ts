import { createHash } from 'crypto';

export const hashpassword = (password:string ) =>{
    const hashedPasswordStage1 = createHash('sha256').update(password).digest('hex');
    const hashedPasswordStage2 = createHash('sha1').update(hashedPasswordStage1).digest('hex');
    const hashedPasswordStage3 = createHash('md5').update(hashedPasswordStage2).digest('hex');
    return hashedPasswordStage3
}