from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ContactMessage, MenuItem, Order
from .serializers import (
    ContactMessageSerializer,
    MenuItemSerializer,
    OrderCreateSerializer,
    OrderSerializer,
)


class MenuListView(generics.ListAPIView):
    queryset = MenuItem.objects.filter(is_available=True).select_related('category')
    serializer_class = MenuItemSerializer


class OrderListCreateView(APIView):
    def get(self, request):
        phone = request.query_params.get('phone', '').strip()
        if not phone:
            return Response(
                {'detail': 'Phone query parameter is required.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        orders = Order.objects.filter(customer_phone=phone).prefetch_related('items')
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = OrderCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)


class ContactCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
