---
layout: page
title: ""
---

<div class="services-grid">
{% for service in site.data.services %}
  <div class="service-card">
    <div class="service-icon">{{ service.icon }}</div>
    <h3>{{ service.name }}</h3>
    <p>{{ service.description }}</p>
    <a href="{{ service.url }}" target="_blank" class="service-button">Open Dashboard</a>
  </div>
{% endfor %}
</div>