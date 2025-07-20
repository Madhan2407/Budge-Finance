import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import {
  Text,
  Card,
  Title,
  Searchbar,
  Chip,
  FAB,
  List,
  Avatar,
} from 'react-native-paper';
import { theme } from '../theme';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  date: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Salary',
    amount: 50000,
    category: 'Income',
    type: 'income',
    date: '2024-01-15',
  },
  {
    id: '2',
    description: 'Grocery Shopping',
    amount: 2500,
    category: 'Food',
    type: 'expense',
    date: '2024-01-14',
  },
  {
    id: '3',
    description: 'Uber Ride',
    amount: 350,
    category: 'Transport',
    type: 'expense',
    date: '2024-01-13',
  },
  {
    id: '4',
    description: 'Online Shopping',
    amount: 1200,
    category: 'Shopping',
    type: 'expense',
    date: '2024-01-12',
  },
];

export default function TransactionsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Income', 'Food', 'Transport', 'Shopping', 'Bills'];

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || transaction.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const getTransactionIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      Income: 'cash',
      Food: 'food',
      Transport: 'car',
      Shopping: 'shopping',
      Bills: 'receipt',
    };
    return icons[category] || 'cash';
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <Card style={styles.transactionCard}>
      <List.Item
        title={item.description}
        description={`${item.category} • ${item.date}`}
        left={() => (
          <Avatar.Icon
            size={40}
            icon={getTransactionIcon(item.category)}
            style={{
              backgroundColor: item.type === 'income' ? theme.colors.tertiary : theme.colors.error,
            }}
          />
        )}
        right={() => (
          <Text
            style={[
              styles.amount,
              {
                color: item.type === 'income' ? theme.colors.tertiary : theme.colors.error,
              },
            ]}
          >
            {item.type === 'income' ? '+' : '-'}{formatCurrency(item.amount)}
          </Text>
        )}
      />
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Transactions</Title>
        <Searchbar
          placeholder="Search transactions..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
        
        <View style={styles.categoryFilter}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Chip
                selected={selectedCategory === item}
                onPress={() => setSelectedCategory(item)}
                style={styles.categoryChip}
                selectedColor={theme.colors.primary}
              >
                {item}
              </Chip>
            )}
          />
        </View>
      </View>

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={renderTransaction}
        contentContainerStyle={styles.transactionsList}
        showsVerticalScrollIndicator={false}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          // Handle add transaction
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
    marginBottom: 16,
    color: theme.colors.onSurface,
  },
  searchbar: {
    marginBottom: 16,
    elevation: 2,
  },
  categoryFilter: {
    marginBottom: 8,
  },
  categoryChip: {
    marginRight: 8,
  },
  transactionsList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  transactionCard: {
    marginBottom: 8,
    borderRadius: 12,
    elevation: 2,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
});