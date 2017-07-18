from django.conf.urls import url

from public.views import about, agenda, home, offline


urlpatterns = [
    url(r'^$', home, name='home'),
    url(r'^agenda/$', agenda, name='agenda'),
    url(r'^about/$', about, name='about'),

    # Urls for the service worker to cache and return when the connection is gone.
    url(r'^offline/$', offline, name='offline'),
]
