import bcrypt from 'bcrypt';
import { Credential } from '../entities/Credential.entity';
import { EntityManager } from 'typeorm';
import { CredentialModel } from '../config/dataSource';

const hashPass: (pass: string) => Promise<string> = async (pass: string): Promise<string> => {
    const salt: number = 10;
    const hash: string = await bcrypt.hash(pass, salt);
    return hash;
}

export const createCredentialService: (EntityManager: EntityManager, a: string, b: string) => Promise<Credential> = async (EntityManager: EntityManager, username: string, password: string): Promise<Credential> => {
    
    const hash: string = await hashPass(password)
    
    const credentials: Credential = EntityManager.create(Credential, {
        username,
        password: hash
    })

    return await EntityManager.save(credentials); 
};

export const checkCredentialService: (a: string, b: string) => Promise<number | undefined> = async (username: string, password: string): Promise<number | undefined> => {
    
    const credentialsFound: Credential | null = await CredentialModel.findOneBy({ username: username });

    if (!credentialsFound) throw new Error(`User "${username}" doesn't exist`);
    
    const isMatch = await bcrypt.compare(password, credentialsFound.password);
    
    if (!isMatch) throw new Error(`Username or password incorrect`);
    
    return credentialsFound.id;
};