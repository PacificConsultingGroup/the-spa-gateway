import { getPersonByUuid } from '@/models/person.model';
import type { RequestHandler } from 'express';

export const getPersonByUuidController: RequestHandler = async (req, res) => {

    const personUuid = req.params.personUuid;

    try {
        const person = await getPersonByUuid(personUuid);
        if (!person) res.status(404).send('No such person.');
        res.status(200).send({ person });
    } catch (err) {
        console.log(err);
        return res.status(500).send('Error getting person.');
    }
};