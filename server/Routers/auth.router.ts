import { Router, Request, Response } from "express";
import passport from "passport";

import {
    signUpUser,
    failedAuth,
    logoutUser,
    resetPassword,
    forgetPassword,
    successfulLocalAuth,
    successfulGoogleAuth,
} from "../controller/auth.controller";
import {
    mwValidateUser,
    mwCheckUserExists,
    mwCheckLoginCredentials,
    mwCheckLoginStatus,
} from "../middlewares/auth/user.middleware";

const authRouter = Router();
// TODO: check user exists
authRouter.post("/signup", mwValidateUser, mwCheckUserExists(true), signUpUser);

authRouter.post(
    "/local",
    mwCheckLoginStatus("loggedOut"),
    passport.authenticate("local", {
        failureRedirect: "/auth/failure",
        successRedirect: "/auth/localSuccess",
        session: true,
    })
);

authRouter.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/auth/failure",
        successRedirect: "/auth/googleSuccess",
        session: true,
    })
);

// authRouter.get(
//     "/facebook",
//     passport.authenticate("facebook", { scope: ["profile", "email"] })
// );
// authRouter.get(
//     "/facebook/callback",
//     passport.authenticate("facebook", {
//         failureRedirect: "/auth/failure",
//         successRedirect: "/auth/success",
//         session: true,
//     })
// );

authRouter.post("/forgot-password",mwCheckUserExists(false), forgetPassword);

authRouter.post("/reset-password", resetPassword);
authRouter.delete("/logout", mwCheckLoginStatus("loggedIn"), logoutUser);

authRouter.use("/failure", failedAuth);
authRouter.use("/localSuccess", successfulLocalAuth);
authRouter.use("/googleSuccess", successfulGoogleAuth);
export default authRouter;
