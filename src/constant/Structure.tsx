import { SafeAreaView } from "react-native-safe-area-context";
import CustomStatusBar from "../components/StatusBar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface structureProps {
  children: React.ReactNode;
}

export default function AppStructure({
  children,
}: structureProps) {
  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}
    >
      <CustomStatusBar />
      <GestureHandlerRootView style={{ flexGrow: 1 }}>
        {children}
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}