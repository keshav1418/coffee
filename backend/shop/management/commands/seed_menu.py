from decimal import Decimal

from django.core.management.base import BaseCommand

from shop.models import Category, MenuItem

MENU_DATA = [
    {
        'slug': 'espresso',
        'name': 'Classic Espresso',
        'description': 'Rich, bold single shot pulled from our house blend.',
        'price': Decimal('3.50'),
        'category': 'Coffee',
        'tags': ['Hot', 'Strong'],
        'image': 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=400&fit=crop',
        'sizes': ['Single', 'Double'],
        'milk_options': [],
        'extras': [{'id': 'extra-shot', 'label': 'Extra shot (+$1)', 'price': 1}],
    },
    {
        'slug': 'latte',
        'name': 'Caramel Latte',
        'description': 'Silky steamed milk with espresso and caramel drizzle.',
        'price': Decimal('5.25'),
        'category': 'Coffee',
        'tags': ['Hot', 'Sweet'],
        'image': 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop',
        'sizes': ['Small', 'Medium', 'Large'],
        'milk_options': ['Whole', 'Oat', 'Almond', 'Soy'],
        'extras': [{'id': 'whip', 'label': 'Whipped cream (+$0.50)', 'price': 0.5}],
    },
    {
        'slug': 'cappuccino',
        'name': 'Cappuccino',
        'description': 'Equal parts espresso, steamed milk, and velvety foam.',
        'price': Decimal('4.75'),
        'category': 'Coffee',
        'tags': ['Hot', 'Classic'],
        'image': 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop',
        'sizes': ['Small', 'Medium', 'Large'],
        'milk_options': ['Whole', 'Oat', 'Almond'],
        'extras': [],
    },
    {
        'slug': 'cold-brew',
        'name': 'Cold Brew',
        'description': 'Slow-steeped for 18 hours. Smooth and refreshing.',
        'price': Decimal('4.50'),
        'category': 'Coffee',
        'tags': ['Cold', 'Bold'],
        'image': 'https://images.unsplash.com/photo-1517487881594-278085931592?w=400&h=400&fit=crop',
        'sizes': ['Medium', 'Large'],
        'milk_options': ['None', 'Oat', 'Almond'],
        'extras': [{'id': 'vanilla', 'label': 'Vanilla syrup (+$0.75)', 'price': 0.75}],
    },
    {
        'slug': 'mocha',
        'name': 'Mocha',
        'description': 'Espresso, chocolate, and steamed milk topped with cocoa.',
        'price': Decimal('5.50'),
        'category': 'Coffee',
        'tags': ['Hot', 'Chocolate'],
        'image': 'https://images.unsplash.com/photo-1541167760492-8972f5427c8c?w=400&h=400&fit=crop',
        'sizes': ['Small', 'Medium', 'Large'],
        'milk_options': ['Whole', 'Oat'],
        'extras': [{'id': 'whip', 'label': 'Whipped cream (+$0.50)', 'price': 0.5}],
    },
    {
        'slug': 'croissant',
        'name': 'Butter Croissant',
        'description': 'Flaky, golden pastry baked fresh every morning.',
        'price': Decimal('3.25'),
        'category': 'Pastry',
        'tags': ['Fresh', 'Baked'],
        'image': 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&fit=crop',
        'sizes': ['Regular'],
        'milk_options': [],
        'extras': [],
    },
]


class Command(BaseCommand):
    help = 'Seed the database with Brew & Bean menu items'

    def handle(self, *args, **options):
        created_count = 0
        updated_count = 0

        for item in MENU_DATA:
            category, _ = Category.objects.get_or_create(name=item['category'])
            _, created = MenuItem.objects.update_or_create(
                slug=item['slug'],
                defaults={
                    'name': item['name'],
                    'description': item['description'],
                    'price': item['price'],
                    'category': category,
                    'tags': item['tags'],
                    'image': item['image'],
                    'sizes': item['sizes'],
                    'milk_options': item['milk_options'],
                    'extras': item['extras'],
                    'is_available': True,
                },
            )
            if created:
                created_count += 1
            else:
                updated_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f'Menu seeded: {created_count} created, {updated_count} updated.'
            )
        )
