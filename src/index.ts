import express from 'express'
import fileUpload from 'express-fileupload'
// import { router as RealmImporterRouter } from './routes/realmImporter'
import { PORT } from './config/constants'
import { CharacterManager } from 'delta-green-core/src/managers/CharacterManager'

const app = express()
app.use(express.json())
app.use(
    fileUpload({
        createParentPath: true,
    })
)
// app.use('/import', RealmImporterRouter)
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`)
})
