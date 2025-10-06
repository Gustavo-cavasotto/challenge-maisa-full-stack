import { db } from '../database/connection';

export class AdminRepository {
    async findByEmail(email: string) {
        const user = await db('admins').where({ email }).first();
        return user;
    }

    async findById(id: number) {
        const user = await db('admins').where({ id }).first();
        return user;
    }
}
