import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  Text,
  Card,
  Title,
  Paragraph,
  Button,
  Surface,
  IconButton,
} from 'react-native-paper';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { theme } from '../theme';

const screenWidth = Dimensions.get('window').width;

export default function DashboardScreen() {
  const balanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20000, 45000, 28000, 80000, 99000, 43000],
        color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const spendingData = [
    {
      name: 'Food',
      population: 15000,
      color: '#8B5CF6',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Transport',
      population: 8000,
      color: '#06B6D4',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Shopping',
      population: 12000,
      color: '#10B981',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Bills',
      population: 5000,
      color: '#F59E0B',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  const chartConfig = {
    backgroundColor: theme.colors.surface,
    backgroundGradientFrom: theme.colors.surface,
    backgroundGradientTo: theme.colors.surface,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: theme.colors.primary,
    },
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning! 👋</Text>
        <Text style={styles.subtitle}>Here's your financial overview</Text>
      </View>

      {/* Balance Cards */}
      <View style={styles.balanceGrid}>
        <Card style={[styles.balanceCard, { backgroundColor: theme.colors.primary }]}>
          <Card.Content>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.balanceAmount}>₹1,25,000</Text>
            <Text style={styles.balanceChange}>+5.2% from last month</Text>
          </Card.Content>
        </Card>

        <Card style={[styles.balanceCard, { backgroundColor: theme.colors.secondary }]}>
          <Card.Content>
            <Text style={styles.balanceLabel}>Monthly Income</Text>
            <Text style={styles.balanceAmount}>₹50,000</Text>
            <Text style={styles.balanceChange}>+12.5% from last month</Text>
          </Card.Content>
        </Card>
      </View>

      {/* Balance Trend Chart */}
      <Card style={styles.chartCard}>
        <Card.Content>
          <Title>Balance Trend</Title>
          <LineChart
            data={balanceData}
            width={screenWidth - 60}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </Card.Content>
      </Card>

      {/* Spending Breakdown */}
      <Card style={styles.chartCard}>
        <Card.Content>
          <Title>Spending Breakdown</Title>
          <PieChart
            data={spendingData}
            width={screenWidth - 60}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            style={styles.chart}
          />
        </Card.Content>
      </Card>

      {/* Quick Actions */}
      <Card style={styles.actionsCard}>
        <Card.Content>
          <Title>Quick Actions</Title>
          <View style={styles.actionsGrid}>
            <Surface style={styles.actionButton}>
              <IconButton icon="plus" size={24} iconColor={theme.colors.primary} />
              <Text style={styles.actionText}>Add Transaction</Text>
            </Surface>
            <Surface style={styles.actionButton}>
              <IconButton icon="target" size={24} iconColor={theme.colors.secondary} />
              <Text style={styles.actionText}>Set Goal</Text>
            </Surface>
            <Surface style={styles.actionButton}>
              <IconButton icon="chart-line" size={24} iconColor={theme.colors.tertiary} />
              <Text style={styles.actionText}>View Reports</Text>
            </Surface>
            <Surface style={styles.actionButton}>
              <IconButton icon="robot" size={24} iconColor="#F59E0B" />
              <Text style={styles.actionText}>Ask AI</Text>
            </Surface>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
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
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.onSurfaceVariant,
  },
  balanceGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  balanceCard: {
    flex: 1,
    borderRadius: 16,
  },
  balanceLabel: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 4,
  },
  balanceAmount: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  balanceChange: {
    color: 'white',
    fontSize: 12,
    opacity: 0.8,
  },
  chartCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  actionsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  actionText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    color: theme.colors.onSurface,
  },
});