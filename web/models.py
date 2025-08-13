from django.db import models


class Product(models.Model):
    """Simple product model for the shop catalogue."""

    MOBILE = 'mobile'
    NOTEBOOK = 'notebook'
    PC = 'pc'
    ACCESSORIES = 'accessories'

    GROUP_CHOICES = (
        (MOBILE, 'Двигатель'),
        (PC, 'Кузов'),
        (NOTEBOOK, 'Трансмиссия'),
        (ACCESSORIES, 'Аксессуары'),
    )

    name = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    availability = models.BooleanField(default=True)
    group = models.CharField(max_length=20, choices=GROUP_CHOICES, default=MOBILE)
    img = models.ImageField(default='no_image.jpg', upload_to='product_image')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self) -> str:
        return self.name
