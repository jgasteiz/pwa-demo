"""
WSGI config for pwademo project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/howto/deployment/wsgi/
"""

from pwademo.boot import fix_path
fix_path()

import os
from django.core.wsgi import get_wsgi_application
from djangae.environment import is_production_environment
from djangae.wsgi import DjangaeApplication

settings = "pwademo.settings_live" if is_production_environment() else "pwademo.settings"
os.environ.setdefault("DJANGO_SETTINGS_MODULE", settings)



application = DjangaeApplication(get_wsgi_application())
