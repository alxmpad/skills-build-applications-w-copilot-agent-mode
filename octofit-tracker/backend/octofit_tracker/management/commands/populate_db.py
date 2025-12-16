from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Teams
        marvel = Team.objects.create(name='Marvel', description='Marvel superheroes')
        dc = Team.objects.create(name='DC', description='DC superheroes')

        # Users
        users = [
            User(name='Tony Stark', email='tony@marvel.com', team=marvel.name),
            User(name='Steve Rogers', email='steve@marvel.com', team=marvel.name),
            User(name='Bruce Wayne', email='bruce@dc.com', team=dc.name),
            User(name='Clark Kent', email='clark@dc.com', team=dc.name),
        ]
        for user in users:
            user.save()

        # Activities
        Activity.objects.create(user='Tony Stark', activity_type='Running', duration=30, date='2025-12-01')
        Activity.objects.create(user='Steve Rogers', activity_type='Cycling', duration=45, date='2025-12-02')
        Activity.objects.create(user='Bruce Wayne', activity_type='Swimming', duration=60, date='2025-12-03')
        Activity.objects.create(user='Clark Kent', activity_type='Flying', duration=120, date='2025-12-04')

        # Leaderboard
        Leaderboard.objects.create(user='Tony Stark', points=100, rank=2)
        Leaderboard.objects.create(user='Steve Rogers', points=120, rank=1)
        Leaderboard.objects.create(user='Bruce Wayne', points=90, rank=3)
        Leaderboard.objects.create(user='Clark Kent', points=80, rank=4)

        # Workouts
        Workout.objects.create(name='Super Strength', description='Strength workout for heroes', difficulty='Hard')
        Workout.objects.create(name='Agility Training', description='Agility and speed drills', difficulty='Medium')
        Workout.objects.create(name='Endurance Run', description='Long distance running', difficulty='Easy')

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))
