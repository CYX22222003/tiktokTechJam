from .views import DocumentView, delete, get_ai, post_ai
from django.urls import path

urlpatterns = [
    path('basic/', DocumentView.as_view()),
    path('delete/<int:pk>', delete),
    path('aiget/<int:pk>', get_ai),
    path('aipost/', post_ai)
]