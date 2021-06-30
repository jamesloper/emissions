import express from 'express';
import { restTwilio } from '../imports/rest/rest-twilio';
import { proxyVideo } from '../imports/rest/proxy-video';

const app = express();
app.use('/twilio', restTwilio);
app.use('/video/:id', proxyVideo);
app.use('/', (req, res) => res.end('404'));

WebApp.connectHandlers.use('/api', app);
