from django.urls import path

from .views import ContactCreateView, MenuListView, OrderListCreateView

urlpatterns = [
    path('menu/', MenuListView.as_view(), name='menu-list'),
    path('orders/', OrderListCreateView.as_view(), name='order-list-create'),
    path('contact/', ContactCreateView.as_view(), name='contact-create'),
]
