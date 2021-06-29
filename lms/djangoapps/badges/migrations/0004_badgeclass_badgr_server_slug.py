# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('badges', '121'),
    ]

    operations = [
        migrations.AddField(
            model_name='badgeclass',
            name='badgr_server_slug',
            field=models.SlugField(blank=True, default='', max_length=255),
        ),
    ]
