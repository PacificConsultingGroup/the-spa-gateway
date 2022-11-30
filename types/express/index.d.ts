import type { Person } from '@root/src/schema/Person';

declare global {
    namespace Express {
        interface Request {
            userUuid?: Person['person_uuid'];
        }
    }
}
export { };