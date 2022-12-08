import factory
from django.utils import timezone

from lms.djangoapps.grades.models import PersistentCourseGrade


class PersistentCourseGradeFactory(factory.django.DjangoModelFactory):
    user_id = 2
    course_id = 'course-v1:edX+DemoX-T2020'
    passed_timestamp = timezone.now()
    letter_grade = 'A'
    percent_grade = 85.0

    class Meta:
        model = PersistentCourseGrade
