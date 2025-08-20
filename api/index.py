import os

from django.core.wsgi import get_wsgi_application


# Ensure Django knows where the settings module is
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "shop.settings")


# Vercel's Python runtime looks for a WSGI/ASGI callable named `app`
app = get_wsgi_application()


