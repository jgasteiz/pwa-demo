import session_csrf
from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.staticfiles.views import serve
from django.views.decorators.cache import cache_control
from django.views.generic import TemplateView

from public import urls as public_urls


session_csrf.monkeypatch()
admin.autodiscover()

urlpatterns = (
    # Examples:
    # url(r'^$', 'pwademo.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^_ah/', include('djangae.urls')),

    # Note that by default this is also locked down with login:admin in app.yaml
    url(r'^admin/', include(admin.site.urls)),

    url(r'^csp/', include('cspreports.urls')),

    url(r'^auth/', include('djangae.contrib.gauth.urls')),

    # Service worker!
    url(r'^service-worker.js', cache_control(max_age=2592000)(TemplateView.as_view(
        template_name="service-worker.js",
        content_type='application/javascript',
    )), name='service-worker.js'),

    url(r'^', include(public_urls)),
)

if settings.DEBUG:
    urlpatterns += tuple(static(settings.STATIC_URL, view=serve, show_indexes=True))

handler404 = 'public.views.not_found'
