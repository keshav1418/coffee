from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name_plural = 'categories'
        ordering = ['name']

    def __str__(self):
        return self.name


class MenuItem(models.Model):
    slug = models.SlugField(max_length=100, unique=True)
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    category = models.ForeignKey(
        Category,
        related_name='items',
        on_delete=models.CASCADE,
    )
    tags = models.JSONField(default=list, blank=True)
    image = models.URLField(max_length=500)
    sizes = models.JSONField(default=list, blank=True)
    milk_options = models.JSONField(default=list, blank=True)
    extras = models.JSONField(default=list, blank=True)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['category__name', 'name']

    def __str__(self):
        return self.name


class ContactMessage(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} — {self.email}'


class Order(models.Model):
    ORDER_MODES = (
        ('pickup', 'Pickup'),
        ('delivery', 'Delivery'),
    )
    STATUSES = (
        ('Confirmed', 'Confirmed'),
        ('Preparing', 'Preparing'),
        ('Ready', 'Ready'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    )

    order_id = models.CharField(max_length=50, unique=True)
    customer_name = models.CharField(max_length=200)
    customer_phone = models.CharField(max_length=50, db_index=True)
    customer_address = models.TextField(blank=True)
    notes = models.TextField(blank=True)
    order_mode = models.CharField(max_length=20, choices=ORDER_MODES)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, choices=STATUSES, default='Confirmed')
    placed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-placed_at']

    def __str__(self):
        return self.order_id


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        related_name='items',
        on_delete=models.CASCADE,
    )
    menu_item_slug = models.CharField(max_length=100)
    name = models.CharField(max_length=200)
    image = models.URLField(max_length=500)
    size = models.CharField(max_length=50, blank=True)
    milk = models.CharField(max_length=50, blank=True, null=True)
    extras = models.JSONField(default=list, blank=True)
    line_total = models.DecimalField(max_digits=8, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f'{self.name} x{self.quantity}'
