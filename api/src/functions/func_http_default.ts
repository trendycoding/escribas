import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function func_http_default(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const passthroughData = request.query.get('name') || await request.text() || 'Missing body or query parameter';

    return { body: passthroughData, status: 200 };
};

app.http('func_http_default', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    route: '/api/default',
    handler: func_http_default
});
