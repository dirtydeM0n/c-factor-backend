/**
 * Created by Narain Sagar on 15/09/2019.
 */

export const validateRoles = (allowedRole: string) => async (ctx, next) => {
    const role = ctx.request.session.role.title;
    if (role === allowedRole) {
        await next();
    } else ctx.throw(401, 'Unauthorized request');
};

export const validateRolesNotToBe = (notAllowedRoles = []) => async (ctx, next) => {
    const role = ctx.request.session.role.title;
    if (notAllowedRoles.indexOf(role) === -1) {
        await next();
    } else {
        ctx.throw(401, 'Unauthorized request');
    }
};

export const validateMultipleRoles = (allowedRoles = []) => async (ctx, next) => {
    const role = ctx.request.session.role.title;
    if (allowedRoles.indexOf(role) !== -1) {
        await next();
    } else {
        ctx.throw(401, 'Unauthorized request');
    }
};
