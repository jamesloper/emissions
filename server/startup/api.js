import connect from 'connect';
import { restTwilio } from '../imports/rest/rest-twilio';
import { proxyRtsp } from '../imports/rest/proxy-rtsp';

const app = connect();
app.use('/twilio', restTwilio);
app.use('/rtsp', proxyRtsp);
app.use('/', (req, res) => res.end('ok'));

WebApp.connectHandlers.use('/api', app);
