from django.shortcuts import render
from django.http import HttpResponse
from .models import Product
from django.db.models import Q

def home(request):
    return render(request, 'web/index.html')

def shop(request):
    q = request.GET.get('q', '')
    group = request.GET.get('group', '')
    brand = request.GET.get('brand', '')
    
    catalogue_products = [
        {
            'id': 1,
            'name': 'Выпускной коллектор Sport',
            'description': 'Высокопроизводительный коллектор из нержавеющей стали для спортивных авто.',
            'price': 450.00,
            'group': 'engine',
            'brand': 'Bosch',
            'img': {'url': '/pictures/product_image/1_vkladish.jpg'}
        },
        {
            'id': 2,
            'name': 'Комплект кованых поршней',
            'description': 'Набор поршней повышенной прочности для турбированных двигателей.',
            'price': 850.00,
            'group': 'engine',
            'brand': 'Mahle',
            'img': {'url': '/pictures/product_image/3_rings.jpg'}
        },
        {
            'id': 3,
            'name': 'Капот карбоновый UltraLight',
            'description': 'Облегченный капот из настоящего углеволокна. Идеальный фитмент.',
            'price': 1200.00,
            'group': 'body',
            'brand': 'Seibon',
            'img': {'url': '/pictures/product_image/капот.jpg'}
        },
        {
            'id': 4,
            'name': 'АКПП 8-ступенчатая ZF',
            'description': 'Проверенная автоматическая трансмиссия с гарантией 12 месяцев.',
            'price': 2500.00,
            'group': 'transmission',
            'brand': 'ZF',
            'img': {'url': '/pictures/product_image/коробка_передач.jpg'}
        },
        {
            'id': 5,
            'name': 'Мультимедиа система Pro',
            'description': '12-дюймовый экран, CarPlay, Android Auto и 4G модем.',
            'price': 600.00,
            'group': 'electronics',
            'brand': 'Pioneer',
            'img': {'url': '/pictures/product_image/оптика_автомобильная.jpg'}
        },
        {
            'id': 6,
            'name': 'Редуктор самоблокирующийся',
            'description': 'LSD дифференциал для улучшения управляемости и зацепа.',
            'price': 950.00,
            'group': 'transmission',
            'brand': 'Quaife',
            'img': {'url': '/pictures/product_image/редуктор.jpg'}
        },
        {
            'id': 7,
            'name': 'Крылья WideBody Kit',
            'description': 'Расширенные передние крылья для агрессивного внешнего вида.',
            'price': 400.00,
            'group': 'body',
            'brand': 'Duraflex',
            'img': {'url': '/pictures/product_image/крылья.jpg'}
        },
        {
            'id': 8,
            'name': 'Руль спортивный Alcantara',
            'description': 'Анатомический руль с отделкой из премиальной алькантары.',
            'price': 350.00,
            'group': 'accessories',
            'brand': 'Momo',
            'img': {'url': '/pictures/product_image/Обшивка_на_руль.jpg'}
        },
        {
            'id': 9,
            'name': 'Тормозная система Carbon-Ceramic',
            'description': 'Максимальная эффективность торможения без перегрева.',
            'price': 4500.00,
            'group': 'body',
            'brand': 'Brembo',
            'img': {'url': '/pictures/product_image/бампер.webp'}
        },
        {
            'id': 10,
            'name': 'Набор инструментов Premium',
            'description': 'Профессиональный чемодан на 150 предметов для ремонта.',
            'price': 200.00,
            'group': 'accessories',
            'brand': 'Stanley',
            'img': {'url': '/pictures/product_image/аптечка.png'}
        },
    ]
    
    # Simple search
    if q:
        catalogue_products = [p for p in catalogue_products if q.lower() in p['name'].lower() or q.lower() in p['description'].lower()]
    
    # Filter by group
    if group:
        catalogue_products = [p for p in catalogue_products if p['group'] == group]
    
    # Filter by brand
    if brand:
        catalogue_products = [p for p in catalogue_products if p.get('brand', '').lower() == brand.lower()]
    
    # Also fetch from DB if any exist (to allow admin adding real ones)
    db_products = Product.objects.all()
    if q:
        db_products = db_products.filter(Q(name__icontains=q) | Q(description__icontains=q))
    if group:
        db_products = db_products.filter(group=group)
    if brand:
        db_products = db_products.filter(brand__icontains=brand)
    
    # Merge dummy and DB products for the WOW effect
    all_products = catalogue_products + list(db_products)
    
    # Get all unique brands from catalogue
    all_brands = sorted(list(set(p.get('brand', '') for p in catalogue_products if p.get('brand'))))
    
    context = {
        'catalogue_products': all_products,
        'q': q,
        'group': group,
        'brand': brand,
        'all_brands': all_brands
    }
    
    return render(request, 'web/shop.html', context)

def about(request):
    team_members = [
        {
            'name': 'Александр Петров',
            'position': 'CEO & Основатель',
            'bio': '15+ лет опыта в автомобильной индустрии. Создал AutoParts с целью сделать качественные запчасти доступными каждому.',
            'avatar': '/static/img/avatar1.jpg',
            'social': {
                'linkedin': '#',
                'twitter': '#',
                'email': 'alex@autoparts.ru'
            }
        },
        {
            'name': 'Мария Сидорова',
            'position': 'CTO',
            'bio': 'Технический директор с экспертизой в e-commerce и системах управления складом. Отвечает за технологическое развитие.',
            'avatar': '/static/img/avatar2.jpg',
            'social': {
                'linkedin': '#',
                'twitter': '#',
                'email': 'maria@autoparts.ru'
            }
        },
        {
            'name': 'Дмитрий Козлов',
            'position': 'Head of Sales',
            'bio': 'Руководитель отдела продаж с 10-летним стажем. Специалист по развитию клиентской базы и партнерских отношений.',
            'avatar': '/static/img/avatar3.jpg',
            'social': {
                'linkedin': '#',
                'twitter': '#',
                'email': 'dmitry@autoparts.ru'
            }
        }
    ]
    
    milestones = [
        {'year': '2020', 'title': 'Основание компании', 'description': 'Запуск первого онлайн-магазина автозапчастей'},
        {'year': '2021', 'title': 'Расширение ассортимента', 'description': 'Добавление 5000+ новых позиций'},
        {'year': '2022', 'title': 'Открытие склада', 'description': 'Собственный склад площадью 2000 м²'},
        {'year': '2023', 'title': 'Мобильное приложение', 'description': 'Запуск iOS и Android приложений'},
        {'year': '2024', 'title': 'Франшиза', 'description': 'Открытие 10 партнерских магазинов'},
        {'year': '2025', 'title': 'AI-ассистент', 'description': 'Внедрение искусственного интеллекта для подбора запчастей'}
    ]
    
    context = {
        'team_members': team_members,
        'milestones': milestones
    }
    
    return render(request, 'web/about.html', context)

def demo_info(request):
    return render(request, 'web/demo_info.html')

def product_detail(request, product_id):
    # Get catalogue products
    catalogue_products = [
        {
            'id': 1,
            'name': 'Выпускной коллектор Sport',
            'description': 'Высокопроизводительный коллектор из нержавеющей стали для спортивных авто. Идеально подходит для тюнинга и повышения мощности двигателя. Устойчив к высоким температурам.',
            'price': 450.00,
            'group': 'engine',
            'brand': 'Bosch',
            'sku': 'COL-SPORT-001',
            'stock': 15,
            'img': {'url': '/pictures/product_image/1_vkladish.jpg'},
            'features': ['Нержавеющая сталь', 'Увеличенная мощность', 'Легкий монтаж', 'Гарантия 2 года']
        },
        {
            'id': 2,
            'name': 'Комплект кованых поршней',
            'description': 'Набор поршней повышенной прочности для турбированных двигателей. Специальное покрытие снижает трение и износ.',
            'price': 850.00,
            'group': 'engine',
            'brand': 'Mahle',
            'sku': 'PIST-FORG-002',
            'stock': 8,
            'img': {'url': '/pictures/product_image/3_rings.jpg'},
            'features': ['Кованая конструкция', 'Антифрикционное покрытие', 'Комплект колец', 'Высокая прочность']
        },
        {
            'id': 3,
            'name': 'Капот карбоновый UltraLight',
            'description': 'Облегченный капот из настоящего углеволокна. Идеальный фитмент для большинства моделей.',
            'price': 1200.00,
            'group': 'body',
            'brand': 'Seibon',
            'sku': 'HOOD-CARB-003',
            'stock': 5,
            'img': {'url': '/pictures/product_image/капот.jpg'},
            'features': ['Углеволокно', 'Снижение веса на 40%', 'UV защита', 'Простая установка']
        },
        {
            'id': 4,
            'name': 'АКПП 8-ступенчатая ZF',
            'description': 'Проверенная автоматическая трансмиссия с гарантией 12 месяцев. Плавные переключения и высокая надежность.',
            'price': 2500.00,
            'group': 'transmission',
            'brand': 'ZF',
            'sku': 'TRN-ZF-8SP-004',
            'stock': 3,
            'img': {'url': '/pictures/product_image/коробка_передач.jpg'},
            'features': ['8 скоростей', 'Плавные переключения', 'Экономия топлива', 'Гарантия 12 мес']
        },
        {
            'id': 5,
            'name': 'Мультимедиа система Pro',
            'description': '12-дюймовый экран, CarPlay, Android Auto и 4G модем. Полный комплект для модернизации салона.',
            'price': 600.00,
            'group': 'electronics',
            'brand': 'Pioneer',
            'sku': 'MM-PRO-12-005',
            'stock': 20,
            'img': {'url': '/pictures/product_image/оптика_автомобильная.jpg'},
            'features': ['12" сенсорный экран', 'CarPlay/Android Auto', '4G модем', 'Навигация']
        },
        {
            'id': 6,
            'name': 'Редуктор самоблокирующийся',
            'description': 'LSD дифференциал для улучшения управляемости и зацепа. Идеально для спортивной езды.',
            'price': 950.00,
            'group': 'transmission',
            'brand': 'Quaife',
            'sku': 'DIFF-LSD-006',
            'stock': 7,
            'img': {'url': '/pictures/product_image/редуктор.jpg'},
            'features': ['LSD механизм', 'Улучшенная управляемость', 'Высокое зацепление', 'Простая установка']
        },
        {
            'id': 7,
            'name': 'Крылья WideBody Kit',
            'description': 'Расширенные передние крылья для агрессивного внешнего вида. ABS пластик высокой прочности.',
            'price': 400.00,
            'group': 'body',
            'brand': 'Duraflex',
            'sku': 'WING-WB-007',
            'stock': 12,
            'img': {'url': '/pictures/product_image/крылья.jpg'},
            'features': ['ABS пластик', 'Широкий кузов', 'Легкая покраска', 'Комплект 2 шт']
        },
        {
            'id': 8,
            'name': 'Руль спортивный Alcantara',
            'description': 'Анатомический руль с отделкой из премиальной алькантары. Улучшенный хват и стиль.',
            'price': 350.00,
            'group': 'accessories',
            'brand': 'Momo',
            'sku': 'WHEEL-ALC-008',
            'stock': 25,
            'img': {'url': '/pictures/product_image/Обшивка_на_руль.jpg'},
            'features': ['Алькантара', 'Анатомическая форма', 'Улучшенный хват', 'Легкий монтаж']
        },
        {
            'id': 9,
            'name': 'Тормозная система Carbon-Ceramic',
            'description': 'Максимальная эффективность торможения без перегрева. Для спортивных и высокопроизводительных авто.',
            'price': 4500.00,
            'group': 'body',
            'brand': 'Brembo',
            'sku': 'BRK-CC-009',
            'stock': 2,
            'img': {'url': '/pictures/product_image/бампер.webp'},
            'features': ['Керамические диски', 'Без перегрева', 'Максимальное торможение', 'Комплект 4 диска']
        },
        {
            'id': 10,
            'name': 'Набор инструментов Premium',
            'description': 'Профессиональный чемодан на 150 предметов для ремонта. Все необходимое в одном наборе.',
            'price': 200.00,
            'group': 'accessories',
            'brand': 'Stanley',
            'sku': 'TOOL-PREM-010',
            'stock': 30,
            'img': {'url': '/pictures/product_image/аптечка.png'},
            features': ['150 предметов', 'Профессиональный чемодан', 'Хромированный инструмент', 'Гарантия 5 лет']
        },
    ]
    
    # Find product in catalogue
    product = next((p for p in catalogue_products if p['id'] == product_id), None)
    
    # If not found, try to find in database
    if not product:
        try:
            product = Product.objects.get(id=product_id)
            # Convert DB product to dict format
            product = {
                'id': product.id,
                'name': product.name,
                'description': product.description,
                'price': product.price,
                'group': product.group,
                'brand': product.brand if hasattr(product, 'brand') else '',
                'sku': product.sku if hasattr(product, 'sku') else '',
                'stock': product.stock if hasattr(product, 'stock') else 0,
                'img': {'url': product.img.url if product.img else ''},
                'features': product.features if hasattr(product, 'features') else []
            }
        except Product.DoesNotExist:
            product = None
    
    if not product:
        return HttpResponse('Товар не найден', status=404)
    
    # Get related products (same group, excluding current)
    related_products = [p for p in catalogue_products if p['group'] == product['group'] and p['id'] != product['id']][:3]
    
    context = {
        'product': product,
        'related_products': related_products
    }
    
    return render(request, 'web/product_detail.html', context)
