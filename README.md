# Gecko Minimal

## Development

#### Install dependencies
```sh
npm install
```

#### Start dev server
```sh
npm run dev
```

#### Or, start dev server with mock endpoints
```sh
npm run dev:mock
```

#### Test
```sh
npm test
```

## Deployment

#### Build app bundle
```sh
npm run build
```
this will produce production build at `dist/` directory.

You can preview it by
```sh
npm run preview
```

## Docker

#### Build image
```sh
docker build -t [image_name] .
```

#### Run container
```sh
docker run --rm -p 8080:80 [image_name]
# you can access website at http://localhost:8080
```

