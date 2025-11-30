---
layout: page
---

{% for category in site.data.services.categories %}
<div class="category-section">
  <h2 class="category-title">{{ category.name }}</h2>
  <div class="services-grid">
    {% for service in category.services %}
      <div class="service-card">
        <div class="service-icon">{{ service.icon }}</div>
        <h3>{{ service.name }}</h3>
        <p>{{ service.description }}</p>
        {% if service.url %}
          <a href="{{ service.url }}" target="_blank" class="service-button">Open Dashboard</a>
        {% else %}
          <span class="service-button-disabled">Internal Only</span>
        {% endif %}
      </div>
    {% endfor %}
  </div>
</div>
{% endfor %}