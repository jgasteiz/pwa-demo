from django.shortcuts import render


def home(request):
    return render(request, 'public/home.html')


def agenda(request):
    return render(request, 'public/agenda.html')


def about(request):
    return render(request, 'public/about.html')


def not_found(request):
    return render(request, 'public/404.html')


def offline(request):
    return render(request, 'public/offline.html')
