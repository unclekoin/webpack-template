import logo from './assets/images/logo.png';

const app = document.createElement('div');
app.className = 'container';

const title = document.createElement('h1');
title.className = 'title';
title.textContent = 'Webpack Template';

const image = document.createElement('img');
image.className = 'image';
image.src = logo;
image.alt = 'logo';

app.append(title, image);

export default app;
