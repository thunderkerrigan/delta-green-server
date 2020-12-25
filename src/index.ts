import express from 'express'
import fileUpload from 'express-fileupload'
// import { router as RealmImporterRouter } from './routes/realmImporter'
import { PORT } from './config/constants'
import { CharacterManager } from './managers/CharacterManager'

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

const manager = new CharacterManager()

console.log('-------------------------------')
for (let index = 0; index < 10; index++) {
    console.log(`${index + 1} ${JSON.stringify(manager.randomMaleCharacter())}`)
    console.log(
        `${index + 1} ${JSON.stringify(manager.randomFemaleCharacter())}`
    )
}
console.log('-------------------------------')
