import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { UserRoutes } from "../modules/user/user.routes";
import { RiderRoutes } from "../modules/rider/rider.routes";


export const router = Router()

const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/rider",
        route: RiderRoutes
    }
]

moduleRoutes.forEach((route)=>{
    router.use(route.path, route.route)
})