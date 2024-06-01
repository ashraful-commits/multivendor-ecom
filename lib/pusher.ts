import pusherServer from "pusher"
import pusherClient from "pusher-js"

export const PusherServer = new pusherServer({
    appId:process.env.APP_ID as string,
    key:process.env.KEY as string,
    secret:process.env.SECRET as string,
    cluster:process.env.CLUSTER as string,
   useTLS:true

})
export const PusherClient= new pusherClient(
    process.env.KEY as string,{
        cluster:process.env.CLUSTER as string
    }
)