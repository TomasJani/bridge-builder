import { Application, Request, Response } from "express";
import { Connection } from "typeorm";
import { Work } from "../entity/Work";


export function workRoutes(app: Application, connection: Connection) {
    const worksReprository = connection.getRepository(Work);

    app.get("/works", async function (req: Request, res: Response) {
        const works = await worksReprository.find();
        res.json(works);
    });

    app.get("/works/:id", async function (req: Request, res: Response) {
        const results = await worksReprository.findOne(req.params.id);
        return res.send(results);
    });

    app.get("/works/:id/changes", async function (req: Request, res: Response) {
        const results = await worksReprository.findOne(req.params.id, { relations: ["changes"] });
        return res.send(results.changes);
    });

    // app.get("/works/:id/project", async function (req: Request, res: Response) {
    //     const results = await worksReprository.findOne(req.params.id, { relations: ["project"] });
    //     return res.send(results.project);
    // });

    app.get("/works/:id/author", async function (req: Request, res: Response) {
        const results = await worksReprository.findOne(req.params.id, { relations: ["author"] });
        return res.send(results.author);
    });

    app.post("/works", async function (req: Request, res: Response) {
        const Work = await worksReprository.create(req.body);
        const results = await worksReprository.save(Work);
        return res.send(results);
    });

    app.put("/works/:id", async function (req: Request, res: Response) {
        const Work = await worksReprository.findOne(req.params.id);
        worksReprository.merge(Work, req.body);
        const results = await worksReprository.save(Work);
        return res.send(results);
    });

    app.delete("/works/:id", async function (req: Request, res: Response) {
        await worksReprository.delete(req.params.id);
        return res.status(204).send();
    });
}