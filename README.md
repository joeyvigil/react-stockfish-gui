# React Stockfish GUI

Chess analysis frontend powered by the public Stockfish API at `https://stockfish.online/api/s/v2.php`.

## GitHub Pages

Live site: https://joeyvigil.github.io/react-stockfish-gui/

## Local Development

```sh
npm install
npm run dev
```

## Deploy with AWS EC2

This app builds to static files, so EC2 deployment is just: build the Vite app, copy `dist/` to Nginx, and let Nginx serve `index.html` for SPA routes.

Important: the default Vite config uses the GitHub Pages base path `/react-stockfish-gui/`. For EC2, build with `--base=/` so asset URLs resolve from the server root.

### 1. Launch the instance

- AMI: Ubuntu 24.04 LTS
- Instance type: `t2.micro` or `t3.micro`
- Storage: 8 GiB is enough
- Security group: allow `22` from your IP, `80` from anywhere, and `443` from anywhere if you plan to add TLS

### 2. Install Node, Nginx, and Git

```sh
ssh -i your-key.pem ubuntu@<EC2_PUBLIC_IP>

sudo apt update
sudo apt install -y ca-certificates curl gnupg nginx git
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node -v
npm -v
```

### 3. Clone and build for EC2

```sh
git clone https://github.com/joeyvigil/react-stockfish-gui.git
cd react-stockfish-gui
npm install
npm run build -- --base=/
```

### 4. Publish the static build

```sh
sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html/
sudo chown -R www-data:www-data /var/www/html/
```

### 5. Configure Nginx for the SPA

```sh
sudo tee /etc/nginx/sites-available/default > /dev/null <<'EOF'
server {
    listen 80;
    server_name _;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

sudo nginx -t
sudo systemctl enable nginx
sudo systemctl reload nginx
```

### 6. Open the site

Visit `http://<EC2_PUBLIC_IP>`.

## Updating the EC2 deployment

When you push new changes:

```sh
cd ~/react-stockfish-gui
git pull
npm install
npm run build -- --base=/
sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html/
sudo systemctl reload nginx
```

