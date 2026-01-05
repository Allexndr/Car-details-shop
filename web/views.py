from django.shortcuts import render
from django.http import HttpResponse
from .models import Product
from django.db.models import Q

def home(request):
    return render(request, 'web/index.html')

def shop(request):
    q = request.GET.get('q', '')
    group = request.GET.get('group', '')
    
    catalogue_products = [
        {
            'id': 1,
            'name': 'Выпускной коллектор Sport',
            'description': 'Высокопроизводительный коллектор из нержавеющей стали для спортивных авто.',
            'price': 450.00,
            'group': 'engine',
            'img': {'url': '/pictures/product_image/1_vkladish.jpg'}
        },
        {
            'id': 2,
            'name': 'Комплект кованых поршней',
            'description': 'Набор поршней повышенной прочности для турбированных двигателей.',
            'price': 850.00,
            'group': 'engine',
            'img': {'url': '/pictures/product_image/3_rings.jpg'}
        },
        {
            'id': 3,
            'name': 'Капот карбоновый UltraLight',
            'description': 'Облегченный капот из настоящего углеволокна. Идеальный фитмент.',
            'price': 1200.00,
            'group': 'body',
            'img': {'url': '/pictures/product_image/капот.jpg'}
        },
        {
            'id': 4,
            'name': 'АКПП 8-ступенчатая ZF',
            'description': 'Проверенная автоматическая трансмиссия с гарантией 12 месяцев.',
            'price': 2500.00,
            'group': 'transmission',
            'img': {'url': '/pictures/product_image/коробка_передач.jpg'}
        },
        {
            'id': 5,
            'name': 'Мультимедиа система Pro',
            'description': '12-дюймовый экран, CarPlay, Android Auto и 4G модем.',
            'price': 600.00,
            'group': 'electronics',
            'img': {'url': '/pictures/product_image/оптика_автомобильная.jpg'}
        },
        {
            'id': 6,
            'name': 'Редуктор самоблокирующийся',
            'description': 'LSD дифференциал для улучшения управляемости и зацепа.',
            'price': 950.00,
            'group': 'transmission',
            'img': {'url': '/pictures/product_image/редуктор.jpg'}
        },
        {
            'id': 7,
            'name': 'Крылья WideBody Kit',
            'description': 'Расширенные передние крылья для агрессивного внешнего вида.',
            'price': 400.00,
            'group': 'body',
            'img': {'url': '/pictures/product_image/крылья.jpg'}
        },
        {
            'id': 8,
            'name': 'Руль спортивный Alcantara',
            'description': 'Анатомический руль с отделкой из премиальной алькантары.',
            'price': 350.00,
            'group': 'accessories',
            'img': {'url': '/pictures/product_image/Обшивка_на_руль.jpg'}
        },
        {
            'id': 9,
            'name': 'Тормозная система Carbon-Ceramic',
            'description': 'Максимальная эффективность торможения без перегрева.',
            'price': 4500.00,
            'group': 'body',
            'img': {'url': '/pictures/product_image/бампер.webp'}
        },
        {
            'id': 10,
            'name': 'Набор инструментов Premium',
            'description': 'Профессиональный чемодан на 150 предметов для ремонта.',
            'price': 200.00,
            'group': 'accessories',
            'img': {'url': '/pictures/product_image/аптечка.png'}
        },
    ]
    
    # Simple search
    if q:
        catalogue_products = [p for p in catalogue_products if q.lower() in p['name'].lower() or q.lower() in p['description'].lower()]
    
    # Filter by group
    if group:
        catalogue_products = [p for p in catalogue_products if p['group'] == group]
    
    # Also fetch from DB if any exist (to allow admin adding real ones)
    db_products = Product.objects.all()
    if q:
        db_products = db_products.filter(Q(name__icontains=q) | Q(description__icontains=q))
    if group:
        db_products = db_products.filter(group=group)
    
    # Merge dummy and DB products for the WOW effect
    all_products = catalogue_products + list(db_products)
    
    context = {
        'catalogue_products': all_products,
        'q': q,
        'group': group
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
