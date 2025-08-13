from django.contrib import admin
from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'group',
        'price',
        'availability',
        'created_at',
    )
    list_filter = ('group', 'availability', 'created_at')
    search_fields = ('name', 'description')
    ordering = ('-created_at',)
    
    # Demo version notice
    def changelist_view(self, request, extra_context=None):
        extra_context = extra_context or {}
        extra_context['demo_notice'] = True
        extra_context['demo_message'] = 'Это демо-версия админки для показа возможностей Django'
        return super().changelist_view(request, extra_context)
