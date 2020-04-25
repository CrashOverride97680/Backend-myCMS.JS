// MODULE EXPORT MAIL
module.exports = {
// LABEL WEB_API
	LABEL_SERVER: 'SERVER LISTEN ON PORT:',
	LABEL_JSON_STATUS: 'SERVER STATUS WORK!!',
	LABEL_JSON_NOT_FOUND: 'MESSAGE 404 ROUTE NOT FOUND',
	LABEL_JSON_STATUS_NUMBER: 'MESSAGE SERVER STATUS 200',
	LABEL_JSON_STATUS_NUMBER_NOT_FOUND: '404',
	LABEL_ERROR_RETURN: 'ERROR',
	LABEL_LOGOUT: 'SIGNOUT SUCCESS',
	LABEL_RESEND_EMAIL: { message: 'RESEND EMAIL CHECK YOUR EMAIL BOX' },
	LABEL_LOCAL_CACHE_BLACKLIST_ON: 'LOCAL CACHE TOKEN REVOKE RUNNING',
// LABEL CHECK DATA
	LABEL_CHECK_EMAIL: 'EMAIL IS REQUIRED',
	LABEL_CHECK_PASSWORD: 'EMAIL IS REQUIRED',
// LABEL HTTP SERVER
	LABEL_200_HTTP: { number: '200', message: '200 OK' },
	LABEL_201_HTTP: { number: '201', message: '201 CREATED' },
	LABEL_202_HTTP: { number: '202', message: '202 ACCEPTED' },
	LABEL_204_HTTP: { number: '204', message: '204 NO CONTENT' },
	LABEL_403_HTTP: { number: '403', message: '403 FORBIDDEN' },
	LABEL_422_HTTP: { number: '422', message: '422 UNPROCESSABLE ENTITY' },
	LABEL_500_HTTP: { number: '500', message: '500 INTERNAL SERVER ERROR' },
// LABEL SMTP
	LABEL_ERROR_SMTP: { resp: 'GENERAL ERROR SENDING MAIL, EMAIL REJECTED' },
	LABEL_ACCEPTED_SMTP: { resp: 'MAIL SENDING' },
// LABEL MONGOOSE
	LABEL_CONNECT_MONGOOSE: 'MONGOOSE DEFAULT CONNECTION IS OPEN TO:',
	LABEL_CONNECTED_MONGOOSE_FUNCTION: 'CONNECTED',
	LABEL_OCCURRED_MONGOOSE: 'MONGOOSE DEFAULT CONNECTION HAS OCCURED:',
	LABEL_ERROR_FUNCTION_NAME: 'ERROR',
	LABEL_DEFAULT_ERROR: 'MONGOOSE DEFAULT CONNECTION IS DISCONNECTED',
	LABEL_DISCONNECTED_FUNCTION_NAME: 'DISCONNECTED',
	LABEL_DISCONNECTED_APPLICATION_TERM: 'MONGOOSE DEFAULT CONNECTION IS DISCONNECTED DUE TO APPLICATION TERMINATION',
	LABEL_SIGURS_ONE_MONGOOSE: 'MONGOOSE DISCONNECTED THROUGH APP TERMINATION (SIGTERM)',
	LABEL_SIGINT_FUNCTION_MOONGOOSE: 'SIGINT',
	LABEL_SIGTERM_FUNCTION: 'SIGTERM',
	LABEL_DISCONNECTED_APP: 'MONGOOSE DISCONNECTED THROUGH APP TERMINATION (SIGUSR2)',
	LABEL_SIGUSR_TWO_FUNCTION_MONGOOSE: 'SIGUSR2',
	LABEL_ERROR_MONGOOSE: 'ERROR REQUEST MONGOOSE:',
// LABEL DEBUG
	LABEL_ENV_VAR: 'ENV_VAR:',
	LABELL_ACCESS_PAGE: { message: 'YOU HAVE ACCESS TO SECRET PAGE' },
	LABEL_DECODE_TOKEN_TEST: 'DECODE VARIABLE TEST',
	LABEL_TOKEN_HEADER: 'TOKEN HEADER',
	LABEL_UPLOADFILE_CHECK: 'UPLOADS ARRAY FILE',
	LABEL_TEST_UPLOAD: 'FILE OR FILES UPLOADED INFO:',
	LABEL_RESULT_UPLOAD_OK: 'FILE OR FILES UPLOADED',
	LABEL_RESULT_UPLOAD_ERROR: 'FILE OR FILES NOT UPLOADED ERROR:',
// LABEL SCHEDULER
	LABEL_SCHEDULER_RUN: 'SCHEDULER IS UPPER RUNNING',
// LABEL MULTER
	LABEL_MULTER_VALIDATION_ERROR: 'ONLY IMAGE FILES ARE ALLOWED!',
	LABEL_MULTER_ERROR: 'ONLY IMAGE FILES ARE ALLOWED!',
	LABEL_UPLOAD_STATUS_COMPLETE: { status: 200, message: 'UPLOAD COMPLETE' },
// LANG TEST FOR MOCHA
};