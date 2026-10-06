import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db, COLLECTION } from '../firebaseConfig';

export default function DetailScreen({ route }) {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const docRef = doc(db, COLLECTION, productId);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          setProduct({ id: docSnapshot.id, ...docSnapshot.data() });
        } else {
          setError('El documento no existe.');
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [productId]);

  if (loading) return <ActivityIndicator style={styles.center} size="large" />;
  if (error) return <Text style={[styles.center, styles.error]}>Error: {error}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Object.entries(product).map(([key, value]) => (
        <View key={key} style={styles.row}>
          <Text style={styles.key}>{key}</Text>
          <Text style={styles.value}>
            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, textAlign: 'center', textAlignVertical: 'center', padding: 16 },
  error: { color: '#c00' },
  container: { padding: 16 },
  row: { paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#ccc' },
  key: { fontSize: 13, color: '#777', textTransform: 'uppercase' },
  value: { fontSize: 17, marginTop: 2 },
});
