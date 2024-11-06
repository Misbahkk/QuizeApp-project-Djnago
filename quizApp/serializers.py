# from rest_framework import serializers
# from .models import Quiz, Question, Option

# class OptionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Option
#         fields = ['id', 'text', 'is_correct']

# class QuestionSerializer(serializers.ModelSerializer):
#     options = OptionSerializer(many=True)

#     class Meta:
#         model = Question
#         fields = ['id', 'text', 'question_type', 'options']

# class QuizSerializer(serializers.ModelSerializer):
#     questions = QuestionSerializer(many=True)

#     class Meta:
#         model = Quiz
#         fields = ['id', 'title', 'description', 'created_at', 'questions']
