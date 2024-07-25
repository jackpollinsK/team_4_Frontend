import { LoginRequest } from "../models/LoginRequest";
import { getTokenByloggingIn} from "../services/AuthService";
import express from "express";

export const getLoginForm = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('pages/loginPage.html', {pageName: 'Login page'});
}

export const postLoginForm  = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const loginRequest: LoginRequest = req.body;
        req.session.token = await getTokenByloggingIn(loginRequest);
        res.redirect('/logoutForm')
    } catch (e) {
        res.locals.errormessage = e.message;
        res.locals.pageName = "Login Page"
        res.render('pages/loginPage.html', req.body);
    }
}

export const getLogoutForm = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('pages/logoutPage.html', {pageName: 'Logout page'});
}

export const postLogoutForm = async(req: express.Request, res: express.Response): Promise<void> => {

    req.session.token = "";
    res.redirect('/loginForm')

}