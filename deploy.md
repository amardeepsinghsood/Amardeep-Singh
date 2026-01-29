# Deployment Guide

## Option 1: Netlify (Recommended)

### Drag & Drop Deploy

1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Drag the entire `resume2` folder onto the deploy zone
3. Wait for deployment (usually < 1 minute)
4. Get your live URL (e.g., `amazing-site-123.netlify.app`)

### Git-Based Deploy

1. Push code to GitHub/GitLab
2. Connect your repo to Netlify
3. Set build settings:
   - Build command: (leave empty)
   - Publish directory: `/`
4. Deploy!

### Netlify Forms Setup

Add `data-netlify="true"` to the form tag in `index.html`:

```html
<form id="contact-form" data-netlify="true" name="contact">
```

Form submissions will appear in Netlify dashboard.

---

## Option 2: Cloudflare Pages

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Create new project
3. Upload folder or connect Git repo
4. Set output directory: `/`
5. Deploy

---

## Option 3: GitHub Pages

1. Create a GitHub repository
2. Push all files to `main` branch
3. Go to repo Settings → Pages
4. Select source: "Deploy from branch" → `main`
5. Your site will be at `https://username.github.io/repo-name/`

---

## Option 4: Apache/Nginx Server

### Apache Setup

Upload files to your web root (usually `/var/www/html/` or `public_html/`).

Optional `.htaccess` for clean URLs and caching:

```apache
# Enable gzip
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType text/css "access plus 1 week"
  ExpiresByType application/javascript "access plus 1 week"
</IfModule>

# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### Nginx Setup

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/portfolio;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;

    # Cache static assets
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|pdf)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## Form Endpoint Configuration

### Option A: Formspree (No Backend)

1. Sign up at [formspree.io](https://formspree.io)
2. Create a form, copy your endpoint
3. Update the form action in `index.html`:

```html
<form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

4. Update `app.js` to use standard form submission

### Option B: EmailJS (Frontend Only)

1. Sign up at [emailjs.com](https://emailjs.com)
2. Create service and template
3. Add EmailJS SDK to `index.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

4. Update form handler in `app.js`:

```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
  name: formData.name,
  email: formData.email,
  message: formData.message,
  purpose: formData.purpose
});
```

### Option C: Custom PHP Backend

Create `api/form-handler.php`:

```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$data = json_decode(file_get_contents('php://input'), true);

// Validate
if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

// Send email
$to = 'business@example.com'; // UPDATE THIS
$subject = 'New Contact: ' . $data['purpose'];
$body = "Name: {$data['name']}\nEmail: {$data['email']}\n\nMessage:\n{$data['message']}";
$headers = "From: {$data['email']}";

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Message sent']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send']);
}
```

---

## CV Download Configuration

The CV is served from `assets/resume/Amardeep_CV_v2026.pdf`.

For forced download headers (Apache `.htaccess`):

```apache
<Files "*.pdf">
    Header set Content-Disposition "attachment"
</Files>
```

---

## SSL/HTTPS

- **Netlify/Cloudflare**: Automatic HTTPS
- **GitHub Pages**: Automatic HTTPS with custom domain
- **Self-hosted**: Use Let's Encrypt (certbot)

---

## Custom Domain Setup

1. Purchase domain from Namecheap, GoDaddy, Cloudflare, etc.
2. Point DNS to your host:
   - Netlify: Add CNAME pointing to your-site.netlify.app
   - Cloudflare: Add A record to Cloudflare IPs
3. Configure SSL certificate
4. Update canonical URL in `index.html`:

```html
<link rel="canonical" href="https://yourdomain.com/">
```

---

## Environment Checklist

Before going live:

- [ ] Replace `business@example.com` with real email
- [ ] Update social media links in footer
- [ ] Replace placeholder metrics with real data
- [ ] Verify all project links work
- [ ] Test form submission on production
- [ ] Verify CV downloads correctly
- [ ] Check mobile responsiveness
- [ ] Run Lighthouse audit (aim for 90+ scores)
