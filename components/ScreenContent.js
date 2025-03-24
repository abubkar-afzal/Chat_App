import { Text, View } from 'react-native';
const ScreenContent = () => {
  return (
    <View className={styles.container}>
      <Text className={`bg-red-200`}>This Is Our React Native App</Text>
      <View className={styles.separator} />
    </View>
  );
};
const styles = {
  container: ` items-center flex-1 justify-center`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
export default ScreenContent
