from rest_framework import serializers

from .models import ContactMessage, MenuItem, Order, OrderItem


class MenuItemSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='slug')
    category = serializers.CharField(source='category.name')
    milkOptions = serializers.JSONField(source='milk_options')

    class Meta:
        model = MenuItem
        fields = [
            'id',
            'name',
            'description',
            'price',
            'category',
            'tags',
            'image',
            'sizes',
            'milkOptions',
            'extras',
        ]


class OrderItemInputSerializer(serializers.Serializer):
    id = serializers.CharField()
    name = serializers.CharField()
    image = serializers.URLField()
    size = serializers.CharField(required=False, allow_blank=True, default='')
    milk = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    extras = serializers.ListField(child=serializers.CharField(), default=list)
    lineTotal = serializers.DecimalField(max_digits=8, decimal_places=2)
    qty = serializers.IntegerField(min_value=1)


class OrderCreateSerializer(serializers.Serializer):
    items = OrderItemInputSerializer(many=True)
    customer = serializers.DictField()
    orderMode = serializers.ChoiceField(choices=['pickup', 'delivery'])
    total = serializers.DecimalField(max_digits=10, decimal_places=2)

    def validate_items(self, value):
        if not value:
            raise serializers.ValidationError('Order must include at least one item.')
        return value

    def validate_customer(self, value):
        if not value.get('name', '').strip():
            raise serializers.ValidationError('Customer name is required.')
        if not value.get('phone', '').strip():
            raise serializers.ValidationError('Customer phone is required.')
        return value

    def create(self, validated_data):
        import uuid

        customer = validated_data['customer']
        order_mode = validated_data['orderMode']
        address = customer.get('address', '')

        if order_mode == 'delivery' and not address.strip():
            raise serializers.ValidationError(
                {'customer': 'Address is required for delivery orders.'}
            )

        order_id = f'BB-{uuid.uuid4().hex[:8].upper()}'
        order = Order.objects.create(
            order_id=order_id,
            customer_name=customer['name'].strip(),
            customer_phone=customer['phone'].strip(),
            customer_address=address.strip(),
            notes=customer.get('notes', '').strip(),
            order_mode=order_mode,
            total=validated_data['total'],
        )

        for item in validated_data['items']:
            OrderItem.objects.create(
                order=order,
                menu_item_slug=item['id'],
                name=item['name'],
                image=item['image'],
                size=item.get('size', ''),
                milk=item.get('milk') or None,
                extras=item.get('extras', []),
                line_total=item['lineTotal'],
                quantity=item['qty'],
            )

        return order


class OrderItemSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='menu_item_slug')
    lineTotal = serializers.DecimalField(source='line_total', max_digits=8, decimal_places=2)
    qty = serializers.IntegerField(source='quantity')

    class Meta:
        model = OrderItem
        fields = ['id', 'name', 'image', 'size', 'milk', 'extras', 'lineTotal', 'qty']


class OrderSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='order_id')
    items = OrderItemSerializer(many=True, read_only=True)
    customer = serializers.SerializerMethodField()
    orderMode = serializers.CharField(source='order_mode')
    placedAt = serializers.DateTimeField(source='placed_at')

    class Meta:
        model = Order
        fields = [
            'id',
            'items',
            'customer',
            'orderMode',
            'total',
            'placedAt',
            'status',
        ]

    def get_customer(self, obj):
        return {
            'name': obj.customer_name,
            'phone': obj.customer_phone,
            'address': obj.customer_address,
            'notes': obj.notes,
        }


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'message']
