# Site

Work-in-progress website! Undergoing tidying and restructuring, transferring to roughly the structure below.

This will be a simple static site with partials and JSON data for configuration and news.

## Directory structure

<details>
<summary>Click to expand</summary>

```text
site/
├─ index.html
├─ privacy.html
├─ accessibility.html
├─ assets/
│  ├─ css/styles.css
│  ├─ js/main.js
│  └─ images/… (web-sized)
├─ partials/               # 1 file per section
│  ├─ donate.html 
│  ├─ events.html 
│  ├─ footer.html
│  ├─ header.html
│  ├─ hero.html
│  ├─ news.html
│  ├─ resources.html
│  ├─ signup.html
│  └─ social-links.html
├─ data/config.json        # Mailchimp, Stripe links, socials, colours
└─ data/news.json
 
