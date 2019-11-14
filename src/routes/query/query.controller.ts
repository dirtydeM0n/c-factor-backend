
import { Request, Response } from 'express';
import { Database } from '../../db';

class QueryController {

    root(req: Request, resp: Response) {
        return resp.status(200).send({ msg: 'Query API is available!' });
    }

    async executeQuery(req: Request, resp: Response) {
        try {
            if (!req.body.query) {
                return resp.status(404).send({ msg: `Parameter 'query' is required and must not be empty.` });
            }
            console.log('query:', req.body.query);
            console.log('replaceVars:', req.body.replaceVars);
            const results = await Database.query(req.body.query, { // 'SELECT "id" FROM users" WHERE "users"."id" = (:id)'
                replacements: req.body.replaceVars ? req.body.replaceVars : {}, // { id: req.user.id }
                type: Database.QueryTypes.SELECT
            });
            return resp.status(200).send(results);
        } catch (error) {
            resp.status(404).send({ msg: 'Not found' });
        }
    }

}

export default new QueryController();