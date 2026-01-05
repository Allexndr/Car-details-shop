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
            'name': 'Вкладыш двигателя',
            'description': 'Качественный комплект вкладышей для ремонта двигателя.',
            'price': 12990,
            'availability': True,
            'group': 'engine',
            'img_url': '/pictures/product_image/1_vkladish.jpg'
        },
        {
            'name': 'Кольца поршневые',
            'description': 'Набор поршневых колец для различных моделей двигателей.',
            'price': 8500,
            'availability': True,
            'group': 'engine',
            'img_url': '/pictures/product_image/3_rings.jpg'
        },
        {
            'name': 'Капот',
            'description': 'Оригинальный капот для автомобиля.',
            'price': 35000,
            'availability': True,
            'group': 'body',
            'img_url': '/pictures/product_image/капот.jpg'
        },
        {
            'name': 'Коробка передач',
            'description': 'Автоматическая коробка передач, б/у, в отличном состоянии.',
            'price': 75000,
            'availability': True,
            'group': 'transmission',
            'img_url': '/pictures/product_image/коробка_передач.jpg'
        },
        {
            'name': 'Держатель телефона',
            'description': 'Универсальный магнитный держатель для смартфона в автомобиль.',
            'price': 1500,
            'availability': True,
            'group': 'accessories',
            'img_url': '/pictures/product_image/держатель_телефона.jpg'
        },
        {
            'name': 'Редуктор заднего моста',
            'description': 'Редуктор для заднеприводных автомобилей.',
            'price': 22000,
            'availability': True,
            'group': 'transmission',
            'img_url': '/pictures/product_image/редуктор.jpg'
        },
        {
            'name': 'Крылья передние',
            'description': 'Комплект передних крыльев, левое и правое.',
            'price': 18000,
            'availability': True,
            'group': 'body',
            'img_url': '/pictures/product_image/крылья.jpg'
        },
        {
            'name': 'Обшивка на руль',
            'description': 'Кожаная обшивка для рулевого колеса.',
            'price': 2500,
            'availability': True,
            'group': 'accessories',
            'img_url': '/pictures/product_image/Обшивка_на_руль.jpg'
        },
        {
            'name': 'Оптика автомобильная',
            'description': 'Комплект передних фар с LED-элементами.',
            'price': 45000,
            'availability': True,
            'group': 'body',
            'img_url': '/pictures/product_image/оптика_автомобильная.jpg'
        },
        {
            'name': 'Аптечка автомобильная',
            'description': 'Стандартная автомобильная аптечка, соответствует ГОСТ.',
            'price': 1000,
            'availability': True,
            'group': 'accessories',
            'img_url': '/pictures/product_image/аптечка.png'
        },
    ]
    
    if q:
        catalogue_products = [p for p in catalogue_products if q.lower() in p['name'].lower() or q.lower() in p['description'].lower()]
    
    if group:
        catalogue_products = [p for p in catalogue_products if p['group'] == group]
    
    context = {
        'pr': catalogue_products,
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
