import {body} from 'express-validator';

export const loginValidation = [
    body('email', 'Невірний формат електронної пошти').isEmail(),
    body('password', 'Довжина паролю має складати мінімум 5 символів').isLength({ min: 5}),
];
export const registerValidation = [
    body('email', 'Невірний формат електронної пошти').isEmail(),
    body('password', 'Довжина паролю має складати мінімум 5 символів').isLength({ min: 5}),
    body('fullName', 'Довжина логіну має складати мінімум 5 символів').isLength({ min: 3}),
    body('avatarURL', 'Невірний формат адреси').optional().isURL(),

];
export const postCreateValidation = [
    body('title', 'Мінімальна довжина тексту 3 символи').isLength({min: 3}).isString(),
    body('text', 'Мінімальна довжина тексту 3 символи').isLength({min: 3}).isString(),
    body('subj', 'Невірний формат').isLength({min: 3}).isString(),
    body('grade', 'Невірний формат').isLength({min: 1}).isString(),
    body('imageUrl', 'Невірне посилання').optional().isString(),
];