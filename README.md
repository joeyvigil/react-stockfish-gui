# React Stockfish Gui

This app communicates with the stockfish API to get engine moves

## gh pages link

https://joeyvigil.github.io/react-stockfish-gui/

## Local Development

```sh
npm install
npm run dev
```

## Deploy on AWS EC2

### 1. Launch EC2 Instance

- AMI: **Ubuntu 24.04 LTS** (or Amazon Linux 2023)
- Instance type: `t2.micro` (free tier eligible)
- Security group: allow **HTTP (80)** and **HTTPS (443)** from `0.0.0.0/0`, plus **SSH (22)** from your IP
- Storage: **8 GiB gp3** is sufficient

### 2. Connect & Install Dependencies

```sh
ssh -i your-key.pem ubuntu@<PUBLIC_IP>

sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs nginx git
```

### 3. Clone & Build

```sh
git clone https://github.com/YOUR_USER/stockfish-api-gui.git
cd stockfish-api-gui
npm install
npm run build
```

### 4. Serve with Nginx

```sh
sudo cp -r dist/* /var/www/html/
sudo chown -R www-data:www-data /var/www/html/
```

Configure Nginx:

```sh
sudo tee /etc/nginx/sites-available/default > /dev/null <<'EOF'
server {
    listen 80;
    server_name _;
    root /var/www/html;
    index index.html;
    location / {
        try_files $uri /index.html;
    }
}
EOF
sudo nginx -t && sudo systemctl reload nginx
```

### 5. Access

Open `http://<PUBLIC_IP>` in your browser.

> **Note:** This is a static frontend. If your app relies on a backend API running on a specific port, adjust the security group rules and Nginx proxy config accordingly.
