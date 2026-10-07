from django.contrib import admin

from .models import Category, ContactMessage, MenuItem, Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('menu_item_slug', 'name', 'size', 'milk', 'line_total', 'quantity')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'is_available')
    list_filter = ('category', 'is_available')
    search_fields = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at')
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('created_at',)


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_id', 'customer_name', 'customer_phone', 'order_mode', 'total', 'status', 'placed_at')
    list_filter = ('status', 'order_mode', 'placed_at')
    search_fields = ('order_id', 'customer_name', 'customer_phone')
    readonly_fields = ('order_id', 'placed_at')
    inlines = [OrderItemInline]
