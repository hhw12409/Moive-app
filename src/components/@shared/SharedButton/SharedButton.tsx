import React from 'react';
import { Share, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ShareButtonProps {
  onPress: () => void;
}

const SharedButton: React.FC<ShareButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name="share-outline" color="white" size={24} />
    </TouchableOpacity>
  );
};

export default SharedButton;
