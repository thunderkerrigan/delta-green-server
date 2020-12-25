// import express, { Request, Response } from 'express';
// import { TEMPORARY_REALM_PATH } from '../../config/constants';
// import { RealmManager } from '../../managers/RealmManager';


// export const router = express.Router({
//   strict: true,
// });

// router.post('/', async (req: Request, res: Response) => {
//   if (req.files && req.files.realmFile) {
//     const file = req.files.realmFile;
//     file.mv(TEMPORARY_REALM_PATH);
//     const manager = new RealmManager(TEMPORARY_REALM_PATH);
//     const theaters = await manager.queryTheaters();
//     const screens = await manager.queryScreens();
//     const screenServers = await manager.queryScreenServers();
//     return { theaters, screens, screenServers };
//   }
// });
