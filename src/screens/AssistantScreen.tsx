import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Text,
  Card,
  TextInput,
  IconButton,
  Avatar,
  Chip,
} from 'react-native-paper';
import { theme } from '../theme';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const quickQuestions = [
  "How much did I spend on food last month?",
  "What are my savings goals?",
  "Give me budget suggestions",
  "Show my expense categories",
  "Help me reduce spending"
];

export default function AssistantScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI financial assistant. I can help you with budgeting, expense tracking, savings goals, and financial advice. What would you like to know?",
      sender: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your spending patterns, I recommend setting aside 20% of your income for savings. Would you like me to help you create a budget plan?",
        "I can see you've been spending quite a bit on dining out this month. Consider meal prepping to save money while still enjoying good food!",
        "Your emergency fund goal is looking great! You're 65% of the way there. At your current saving rate, you'll reach your target in about 2 months.",
        "I notice some recurring subscriptions in your expenses. Let me help you identify which ones you might not be using actively.",
        "Great question! For your vacation fund, I suggest creating a separate savings goal and setting up automatic transfers of ₹5,000 monthly."
      ];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.userMessage : styles.assistantMessage
    ]}>
      <View style={styles.messageContent}>
        <Avatar.Icon
          size={32}
          icon={item.sender === 'user' ? 'account' : 'robot'}
          style={[
            styles.avatar,
            {
              backgroundColor: item.sender === 'user' ? theme.colors.primary : theme.colors.secondary
            }
          ]}
        />
        <View style={styles.messageBubble}>
          <Text style={styles.messageText}>{item.text}</Text>
          <Text style={styles.messageTime}>{formatTime(item.timestamp)}</Text>
        </View>
      </View>
    </View>
  );

  const renderTypingIndicator = () => (
    <View style={[styles.messageContainer, styles.assistantMessage]}>
      <View style={styles.messageContent}>
        <Avatar.Icon
          size={32}
          icon="robot"
          style={[styles.avatar, { backgroundColor: theme.colors.secondary }]}
        />
        <View style={styles.typingBubble}>
          <Text style={styles.typingText}>AI is typing...</Text>
        </View>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.title}>🤖 AI Assistant</Text>
        <Text style={styles.subtitle}>Get personalized financial advice</Text>
      </View>

      {/* Quick Questions */}
      <Card style={styles.quickQuestionsCard}>
        <Card.Content>
          <Text style={styles.quickQuestionsTitle}>Quick Questions</Text>
          <View style={styles.quickQuestionsContainer}>
            {quickQuestions.map((question, index) => (
              <Chip
                key={index}
                onPress={() => setInputText(question)}
                style={styles.quickQuestionChip}
                textStyle={styles.quickQuestionText}
              >
                {question}
              </Chip>
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        ListFooterComponent={isTyping ? renderTypingIndicator : null}
      />

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask me anything about your finances..."
          mode="outlined"
          style={styles.textInput}
          multiline
          right={
            <TextInput.Icon
              icon="send"
              onPress={sendMessage}
              disabled={!inputText.trim()}
            />
          }
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
    color: theme.colors.onSurface,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.onSurfaceVariant,
  },
  quickQuestionsCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
  },
  quickQuestionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: theme.colors.onSurface,
  },
  quickQuestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickQuestionChip: {
    marginBottom: 4,
  },
  quickQuestionText: {
    fontSize: 12,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  assistantMessage: {
    alignItems: 'flex-start',
  },
  messageContent: {
    flexDirection: 'row',
    maxWidth: '80%',
    alignItems: 'flex-end',
  },
  avatar: {
    marginHorizontal: 8,
  },
  messageBubble: {
    backgroundColor: theme.colors.surface,
    padding: 12,
    borderRadius: 16,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    color: theme.colors.onSurface,
    marginBottom: 4,
  },
  messageTime: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'right',
  },
  typingBubble: {
    backgroundColor: theme.colors.surfaceVariant,
    padding: 12,
    borderRadius: 16,
    elevation: 2,
  },
  typingText: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    fontStyle: 'italic',
  },
  inputContainer: {
    padding: 20,
    backgroundColor: theme.colors.surface,
    elevation: 8,
  },
  textInput: {
    backgroundColor: theme.colors.background,
  },
});