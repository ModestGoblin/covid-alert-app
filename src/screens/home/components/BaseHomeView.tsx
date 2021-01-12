import React from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Box, Header, Icon, IconName} from 'components';
import styles from 'shared/theme/styles';

interface BaseHomeViewProps {
  children?: React.ReactNode;
  iconName?: IconName;
  testID?: string;
}

export const BaseHomeView = ({children, iconName, testID}: BaseHomeViewProps) => {
  return (
    <>
      <SafeAreaView edges={['top']}>
        <Header />
      </SafeAreaView>
      <ScrollView
        alwaysBounceVertical={false}
        style={styles.scrollView}
        testID={testID}
        contentContainerStyle={styles.scrollContainer}
      >
        <SafeAreaView edges={['left', 'right']}>
          <Box width="100%" justifyContent="flex-start" marginBottom="-l">
            <Box style={{...styles.primaryIcon}}>
              <Icon name={iconName} height={120} width={150} />
            </Box>
          </Box>
          <Box
            width="100%"
            flex={1}
            alignItems="flex-start"
            justifyContent="flex-start"
            paddingHorizontal="m"
            marginBottom="l"
          >
            {children}
          </Box>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};
