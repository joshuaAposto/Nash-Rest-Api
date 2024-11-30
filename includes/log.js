const kleur = require('kleur');

const createLogger = (colorFn, prefix = '') => 
    (text) => console.log(kleur.bold(colorFn(`[ BURAT ]${prefix} » ${text}`)));

const createPlainLogger = (colorFn) => 
    (text) => console.log(kleur.bold(colorFn(text)));

const createErrorLogger = (colorFn) => 
    (text) => console.log(kleur.bold(colorFn(`[ BURAT ] [ Error ] » ${text}`)));

const createWarnLogger = (colorFn) => 
    (text) => console.log(kleur.bold(colorFn(`[ BURAT ] [ Warn ] » ${text}`)));

const log = {
    main: createLogger(kleur.blue),
    hm: createLogger(kleur.blue),
    plain: createPlainLogger(kleur.blue),
    error: createErrorLogger(kleur.red),
    warn: createWarnLogger(kleur.yellow)
};

module.exports = log;
