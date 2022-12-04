import { dbClient } from '@/lib/dbClient';
import type { Person } from '@/schema/Person';
import { structuredClone } from '@/utils/general.utils';

type PartialPerson = Pick<Person,
    'person_id'
    | 'person_uuid'
    | 'sso_id'
    | 'email'
    | 'mobile_no'
    | 'first_name'
    | 'last_name'
    | 'position'
    | 'department'
    | 'avatar'
>;

export async function getPersonByEmail(email: Person['email'], opt?: { fullRecord?: boolean }) {
    const defaultOptions: Required<typeof opt> = {
        fullRecord: false
    };
    const options = structuredClone({
        ...defaultOptions,
        ...(opt ?? {})
    });
    const query = options.fullRecord
        ? dbClient<Person, Person>('person').select('*').where('email', email).first()
        : dbClient<Person, PartialPerson>('person')
            .select([
                'person_id',
                'person_uuid',
                'sso_id',
                'email',
                'mobile_no',
                'first_name',
                'last_name',
                'position',
                'department',
                'avatar'
            ])
            .where('email', email)
            .first();
    const personRecord = await query;
    return personRecord;
}

export async function getPersonByUuid(personUuid: Person['email'], opt?: { fullRecord?: boolean }) {
    const defaultOptions: Required<typeof opt> = {
        fullRecord: false
    };
    const options = structuredClone({
        ...defaultOptions,
        ...(opt ?? {})
    });
    const query = options.fullRecord
        ? dbClient<Person, Person>('person').select('*').where('person_uuid', personUuid).first()
        : dbClient<Person, PartialPerson>('person')
            .select([
                'person_id',
                'person_uuid',
                'sso_id',
                'email',
                'mobile_no',
                'first_name',
                'last_name',
                'position',
                'department',
                'avatar'
            ])
            .where('person_uuid', personUuid)
            .first();
    const personRecord = await query;
    return personRecord;
}