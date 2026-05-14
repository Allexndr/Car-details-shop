from django.db import models


class Product(models.Model):
    """Enhanced product model for the auto parts shop."""

    ENGINE = 'engine'
    TRANSMISSION = 'transmission'
    BODY = 'body'
    ACCESSORIES = 'accessories'
    ELECTRICAL = 'electrical'
    BRAKES = 'brakes'
    SUSPENSION = 'suspension'
    EXHAUST = 'exhaust'

    GROUP_CHOICES = (
        (ENGINE, 'Двигатель'),
        (BODY, 'Кузов'),
        (TRANSMISSION, 'Трансмиссия'),
        (ACCESSORIES, 'Аксессуары'),
        (ELECTRICAL, 'Электрика'),
        (BRAKES, 'Тормозная система'),
        (SUSPENSION, 'Подвеска'),
        (EXHAUST, 'Выхлопная система'),
    )

    # Basic information
    name = models.CharField(max_length=200)
    brand = models.CharField(max_length=100, blank=True)
    sku = models.CharField(max_length=50, unique=True, blank=True)
    description = models.TextField(blank=True)
    
    # Pricing
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    # Inventory
    availability = models.BooleanField(default=True)
    stock_quantity = models.PositiveIntegerField(default=0)
    
    # Categorization
    group = models.CharField(max_length=20, choices=GROUP_CHOICES, default=ENGINE)
    
    # Media
    img = models.ImageField(default='no_image.jpg', upload_to='product_image')
    
    # Metrics
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    review_count = models.PositiveIntegerField(default=0)
    view_count = models.PositiveIntegerField(default=0)
    purchase_count = models.PositiveIntegerField(default=0)
    
    # SEO
    meta_title = models.CharField(max_length=70, blank=True)
    meta_description = models.CharField(max_length=160, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['brand']),
            models.Index(fields=['group']),
            models.Index(fields=['-rating']),
            models.Index(fields=['-purchase_count']),
        ]

    def __str__(self) -> str:
        return f"{self.brand} {self.name}" if self.brand else self.name

    @property
    def discount_percentage(self):
        if self.discount_price and self.price > self.discount_price:
            return round((self.price - self.discount_price) / self.price * 100, 1)
        return 0

    @property
    def final_price(self):
        return self.discount_price if self.discount_price else self.price


class ProductReview(models.Model):
    """Product reviews model."""
    
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    name = models.CharField(max_length=100)
    email = models.EmailField()
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    approved = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self) -> str:
        return f"Review by {self.name} for {self.product.name}"
