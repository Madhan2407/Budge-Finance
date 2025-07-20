import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import {
  Text,
  Card,
  Title,
  ProgressBar,
  FAB,
  Chip,
} from 'react-native-paper';
import { theme } from '../theme';

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
  completed: boolean;
}

const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Emergency Fund',
    targetAmount: 100000,
    currentAmount: 65000,
    targetDate: '2024-06-30',
    category: 'Savings',
    completed: false,
  },
  {
    id: '2',
    title: 'Vacation to Japan',
    targetAmount: 150000,
    currentAmount: 45000,
    targetDate: '2024-12-15',
    category: 'Travel',
    completed: false,
  },
  {
    id: '3',
    title: 'New Laptop',
    targetAmount: 80000,
    currentAmount: 80000,
    targetDate: '2024-03-01',
    category: 'Technology',
    completed: true,
  },
];

export default function GoalsScreen() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const renderGoal = ({ item }: { item: Goal }) => {
    const progress = item.currentAmount / item.targetAmount;
    const progressPercentage = Math.min(progress * 100, 100);

    return (
      <Card style={styles.goalCard}>
        <Card.Content>
          <View style={styles.goalHeader}>
            <View style={styles.goalInfo}>
              <Title style={styles.goalTitle}>{item.title}</Title>
              <Text style={styles.goalCategory}>{item.category}</Text>
            </View>
            {item.completed && (
              <Chip icon="check" textStyle={{ color: theme.colors.tertiary }}>
                Completed
              </Chip>
            )}
          </View>

          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Progress</Text>
              <Text style={styles.progressPercentage}>
                {progressPercentage.toFixed(1)}%
              </Text>
            </View>
            <ProgressBar
              progress={progress}
              color={item.completed ? theme.colors.tertiary : theme.colors.primary}
              style={styles.progressBar}
            />
          </View>

          <View style={styles.amountSection}>
            <View style={styles.amountItem}>
              <Text style={styles.amountLabel}>Current</Text>
              <Text style={styles.amountValue}>
                {formatCurrency(item.currentAmount)}
              </Text>
            </View>
            <View style={styles.amountItem}>
              <Text style={styles.amountLabel}>Target</Text>
              <Text style={styles.amountValue}>
                {formatCurrency(item.targetAmount)}
              </Text>
            </View>
          </View>

          <Text style={styles.targetDate}>Target: {item.targetDate}</Text>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Goals</Title>
        <Text style={styles.subtitle}>Track your financial goals</Text>
      </View>

      <FlatList
        data={mockGoals}
        keyExtractor={(item) => item.id}
        renderItem={renderGoal}
        contentContainerStyle={styles.goalsList}
        showsVerticalScrollIndicator={false}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          // Handle add goal
        }}
      />
    </View>
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
  goalsList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  goalCard: {
    marginBottom: 16,
    borderRadius: 16,
    elevation: 3,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: theme.colors.onSurface,
  },
  goalCategory: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
  },
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  amountSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  amountItem: {
    flex: 1,
  },
  amountLabel: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
  },
  targetDate: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
});