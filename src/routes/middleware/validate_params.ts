import * as R from 'ramda';

export const validateParams = (containerPath, params) => async (ctx, next) => {
    const container = R.path(containerPath, ctx);

    if (!container) {
        console.warn('Invalid param container:', container);
        ctx.throw(400, 'Bad request');
    }

    R.forEach(assertValid(ctx, container), params);
    await next();
};

export const validateBulkParams = (containerPath, params) => async (ctx, next) => {
    const container = R.path(containerPath, ctx);

    if (!container) {
        console.warn('Invalid param container:', container);
        ctx.throw(400, 'Bad request');
    }
    container.forEach((item) => {
        R.forEach(assertValid(ctx, item), params);
    });

    await next();
};

const assertValid = (ctx, container) => param => {
    if (!container[param] && container[param] !== 0) {
        ctx.throw(400, `${param} is required.`);
    }
};
