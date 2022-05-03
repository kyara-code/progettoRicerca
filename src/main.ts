import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

const app = require('http').createServer((req, res) => res.send('Ahoy!'));
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
