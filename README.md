# Amardeep Portfolio Website

A modern, responsive one-page portfolio for Amardeep — Social Media & SEO Expert.

## 🚀 Quick Start

### Local Development

1. **Clone or download** the project folder
2. **Open with Live Server** (VS Code extension) or any local server:

```bash
# Using Python
python -m http.server 5500

# Using Node.js npx
npx serve .

# Using PHP
php -S localhost:5500
```

3. **Open** `http://localhost:5500` in your browser

## 📁 Project Structure

```
resume2/
├── index.html              # Main portfolio page
├── styles.css              # Complete design system
├── app.js                  # Animations & interactions
├── site.config.json        # Configuration settings
├── README.md               # This file
├── deploy.md               # Deployment instructions
├── qa-report.txt           # QA test results
└── assets/
    ├── images/
    │   └── amardeep.png    # Profile photo
    └── resume/
        └── Amardeep_CV_v2026.pdf  # Downloadable CV
```

## ⚙️ Configuration

Edit `site.config.json` to update:

```json
{
  "business_email": "your-email@example.com",  // Update with your email
  "cv_path": "/assets/resume/Amardeep_CV_v2026.pdf",
  "projects": [...],
  "kpis": {
    "projects": 3,        // Update with actual count
    "response_time": "24h",
    "clients": 5
  }
}
```

### Update Real Metrics

Replace placeholder metrics in `index.html`:

1. Search for `+X% engagement` and replace with real GA4/ad metrics
2. Update KPI values in the hero section
3. Add real testimonial quotes and names

### Configure Contact Form

The form is set to POST to `/api/form-handler`. For static hosting options:

1. **Netlify Forms**: Add `data-netlify="true"` to the form tag
2. **Formspree**: Change action to `https://formspree.io/f/YOUR_ID`
3. **EmailJS**: Integrate EmailJS SDK (see deploy.md)

## 🎨 Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Primary Red | `#C62828` | Buttons, accents, CTAs |
| Black | `#1A1A1A` | Headings, primary text |
| Gray | `#666666` | Body text, descriptions |
| White | `#FFFFFF` | Backgrounds |
| Heading Font | Poppins | h1-h6 headings |
| Body Font | Inter | Paragraphs, labels |

## ✅ QA Checklist

Before deploying, verify:

- [ ] Form submits correctly (check console for logged data)
- [ ] CV downloads with correct filename (`Amardeep_CV.pdf`)
- [ ] All project links open in new tabs
- [ ] Mobile menu opens/closes correctly
- [ ] Typed effect plays on page load
- [ ] Scroll reveal animations trigger
- [ ] All images load (no broken images)
- [ ] Focus states visible for keyboard navigation

## 🔧 Updating the CV

1. Edit the CV HTML template (or create in Word/Canva)
2. Export as PDF, save to `assets/resume/Amardeep_CV_v2026.pdf`
3. Ensure font sizes are readable (min 10pt)
4. Test that all links in PDF are clickable

## 📱 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile Safari (iOS 13+)
- Chrome for Android

## 📄 License

This project is created for Amardeep's personal portfolio use.

---

Built with ❤️ — inspired by designers I admire.
