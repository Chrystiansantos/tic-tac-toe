import { serverHttp } from "./app"

serverHttp.listen(process.env.PORT, () => {
  console.log(`Server run on port ${process.env.PORT} 🔥`)
})