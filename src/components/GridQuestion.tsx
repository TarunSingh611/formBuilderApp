// src/components/GridQuestion.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Button } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';

interface GridQuestionProps {
  rows: string[];
  columns: string[];
  onUpdateRows: (rows: string[]) => void;
  onUpdateColumns: (columns: string[]) => void;
  isPreview?: boolean;
  value?: { [key: string]: string };
  onChange?: (value: { [key: string]: string }) => void;
}

export const GridQuestion: React.FC<GridQuestionProps> = ({
  rows,
  columns,
  onUpdateRows,
  onUpdateColumns,
  isPreview = false,
  value = {},
  onChange,
}) => {
  const handleAddRow = () => {
    onUpdateRows([...rows, `Row ${rows.length + 1}`]);
  };

  const handleAddColumn = () => {
    onUpdateColumns([...columns, `Column ${columns.length + 1}`]);
  };

  const handleUpdateRow = (index: number, text: string) => {
    const newRows = [...rows];
    newRows[index] = text;
    onUpdateRows(newRows);
  };

  const handleUpdateColumn = (index: number, text: string) => {
    const newColumns = [...columns];
    newColumns[index] = text;
    onUpdateColumns(newColumns);
  };

  const handleDeleteRow = (index: number) => {
    onUpdateRows(rows.filter((_, i) => i !== index));
  };

  const handleDeleteColumn = (index: number) => {
    onUpdateColumns(columns.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View>
          {/* Header row with column labels */}
          <View style={styles.headerRow}>
            <View style={styles.cornerCell} />
            {columns.map((column, colIndex) => (
              <View key={colIndex} style={styles.headerCell}>
                {isPreview ? (
                  <Text style={styles.headerText}>{column}</Text>
                ) : (
                  <View style={styles.editableHeader}>
                    <TextInput
                      value={column}
                      onChangeText={(text) => handleUpdateColumn(colIndex, text)}
                      style={styles.headerInput}
                    />
                    <TouchableOpacity onPress={() => handleDeleteColumn(colIndex)}>
                      <Ionicons name="close-circle" size={20} color="#ff4444" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* Grid rows */}
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {/* Row label */}
              <View style={styles.rowLabelCell}>
                {isPreview ? (
                  <Text style={styles.rowLabel}>{row}</Text>
                ) : (
                  <View style={styles.editableRow}>
                    <TextInput
                      value={row}
                      onChangeText={(text) => handleUpdateRow(rowIndex, text)}
                      style={styles.rowInput}
                    />
                    <TouchableOpacity onPress={() => handleDeleteRow(rowIndex)}>
                      <Ionicons name="close-circle" size={20} color="#ff4444" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {/* Grid cells */}
              {columns.map((column, colIndex) => (
                <TouchableOpacity
                  key={colIndex}
                  style={[
                    styles.cell,
                    value?.[`${rowIndex}-${colIndex}`] && styles.selectedCell,
                  ]}
                  onPress={() => {
                    if (isPreview && onChange) {
                      const newValue = { ...value };
                      if (newValue[`${rowIndex}-${colIndex}`]) {
                        delete newValue[`${rowIndex}-${colIndex}`];
                      } else {
                        newValue[`${rowIndex}-${colIndex}`] = 'selected';
                      }
                      onChange(newValue);
                    }
                  }}
                  disabled={!isPreview}
                >
                  {value?.[`${rowIndex}-${colIndex}`] && (
                    <Ionicons name="checkmark" size={24} color="white" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      {!isPreview && (
        <View style={styles.actions}>
          <Button
            title="Add Row"
            onPress={handleAddRow}
            type="outline"
            icon={<Ionicons name="add" size={24} color="#2196F3" />}
            containerStyle={styles.actionButton}
          />
          <Button
            title="Add Column"
            onPress={handleAddColumn}
            type="outline"
            icon={<Ionicons name="add" size={24} color="#2196F3" />}
            containerStyle={styles.actionButton}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cornerCell: {
    width: 120,
    height: 50,
  },
  headerCell: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontWeight: '600',
    fontSize: 14,
  },
  editableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  headerInput: {
    flex: 1,
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLabelCell: {
    width: 120,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f5f5f5',
  },
  rowLabel: {
    fontWeight: '600',
    fontSize: 14,
  },
  editableRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowInput: {
    flex: 1,
    marginRight: 8,
  },
  cell: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
  selectedCell: {
    backgroundColor: '#2196F3',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
});