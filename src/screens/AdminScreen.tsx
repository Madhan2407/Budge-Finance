import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  Text,
  Card,
  Title,
  DataTable,
  Chip,
} from 'react-native-paper';
import { theme } from '../theme';

export default function AdminScreen() {
  const userStats = {
    totalUsers: 1247,
    activeUsers: 892,
    totalTransactions: 15642,
    totalVolume: 8450000,
  };

  const recentUsers = [
    { name: 'John Doe', email: 'john@example.com', status: 'active', joinDate: '2024-01-15' },
    { name: 'Jane Smith', email: 'jane@example.com', status: 'active', joinDate: '2024-01-14' },
    { name: 'Mike Johnson', email: 'mike@example.com', status: 'inactive', joinDate: '2024-01-13' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Admin Dashboard</Title>
        <Text style={styles.subtitle}>Monitor and manage the Budge platform</Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsGrid}>
        <Card style={styles.statCard}>
          <Card.Content>
            <Text style={styles.statLabel}>Total Users</Text>
            <Text style={styles.statValue}>{userStats.totalUsers.toLocaleString()}</Text>
            <Text style={styles.statChange}>+12.5% from last month</Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content>
            <Text style={styles.statLabel}>Active Users</Text>
            <Text style={styles.statValue}>{userStats.activeUsers.toLocaleString()}</Text>
            <Text style={styles.statChange}>+8.2% from last month</Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content>
            <Text style={styles.statLabel}>Total Transactions</Text>
            <Text style={styles.statValue}>{userStats.totalTransactions.toLocaleString()}</Text>
            <Text style={styles.statChange}>+15.3% from last month</Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content>
            <Text style={styles.statLabel}>Transaction Volume</Text>
            <Text style={styles.statValue}>{formatCurrency(userStats.totalVolume)}</Text>
            <Text style={styles.statChange}>+22.1% from last month</Text>
          </Card.Content>
        </Card>
      </View>

      {/* Recent Users */}
      <Card style={styles.tableCard}>
        <Card.Content>
          <Title style={styles.tableTitle}>Recent Users</Title>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Email</DataTable.Title>
              <DataTable.Title>Status</DataTable.Title>
            </DataTable.Header>

            {recentUsers.map((user, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{user.name}</DataTable.Cell>
                <DataTable.Cell>{user.email}</DataTable.Cell>
                <DataTable.Cell>
                  <Chip
                    mode="outlined"
                    textStyle={{
                      color: user.status === 'active' ? theme.colors.tertiary : theme.colors.onSurfaceVariant
                    }}
                  >
                    {user.status}
                  </Chip>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>

      {/* System Health */}
      <Card style={styles.healthCard}>
        <Card.Content>
          <Title style={styles.tableTitle}>System Health</Title>
          <View style={styles.healthItem}>
            <Text style={styles.healthLabel}>Server Status</Text>
            <Chip mode="outlined" textStyle={{ color: theme.colors.tertiary }}>
              Healthy
            </Chip>
          </View>
          <View style={styles.healthItem}>
            <Text style={styles.healthLabel}>Database</Text>
            <Chip mode="outlined" textStyle={{ color: theme.colors.tertiary }}>
              Online
            </Chip>
          </View>
          <View style={styles.healthItem}>
            <Text style={styles.healthLabel}>API Response Time</Text>
            <Text style={styles.healthValue}>145ms</Text>
          </View>
          <View style={styles.healthItem}>
            <Text style={styles.healthLabel}>Uptime</Text>
            <Text style={styles.healthValue}>99.9%</Text>
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    borderRadius: 12,
  },
  statLabel: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginBottom: 4,
  },
  statChange: {
    fontSize: 12,
    color: theme.colors.tertiary,
  },
  tableCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
  },
  tableTitle: {
    fontSize: 18,
    marginBottom: 12,
    color: theme.colors.onSurface,
  },
  healthCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
  },
  healthItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  healthLabel: {
    fontSize: 16,
    color: theme.colors.onSurfaceVariant,
  },
  healthValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
  },
});