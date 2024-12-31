import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { StyleSheet, Text } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useTheme } from "@/hooks/useTheme";

type BottomSheetProps = {
  onChange: (index: number) => void;
  children: React.ReactNode;
};

const BottomSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  ({ onChange, children }, ref) => {
    // internal ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // expose methods to parent via the ref
    useImperativeHandle(ref, () => ({
      present: () => bottomSheetModalRef.current?.present(),
      dismiss: () => bottomSheetModalRef.current?.dismiss(),
      snapToIndex: (index: number) =>
        bottomSheetModalRef.current?.snapToIndex(index),
      snapToPosition: (position: string | number) =>
        bottomSheetModalRef.current?.snapToPosition(position),
      expand: () => bottomSheetModalRef.current?.expand(),
      collapse: () => bottomSheetModalRef.current?.collapse(),
      close: () => bottomSheetModalRef.current?.close(),
      forceClose: () => bottomSheetModalRef.current?.forceClose(),
    }));
    const theme = useTheme();
    // renders
    return (
      <BottomSheetModal
      
        ref={bottomSheetModalRef}
        handleIndicatorStyle={{
          backgroundColor: theme.primary,
        }}
        handleStyle={{
          backgroundColor: theme.background,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          overflow: "hidden",
        }}
        containerStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
        onChange={onChange}
      >
        <BottomSheetView
          style={[
            styles.contentContainer,
            {
              backgroundColor: theme.background,
            },
          ]}
        >
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    paddingBottom: 40,
  },
});

export default BottomSheet;
