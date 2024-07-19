import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const Gifty = ({ image, gifticon_name, store, serial_code,where_to_use,expiration_date,dayLeft, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={image} style={styles.image} />
      <Text style={styles.store}>{gifticon_name}</Text>
      <Text style={styles.name}>{store}</Text>
      <Text style={styles.expiry}>D-{dd}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    padding: 5,
    backgroundColor: "#fff",  
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
    margin: 5,
    alignItems: "center",
  },
  image: {
    width: 130,
    height: 130,
    marginBottom: 7,
    marginTop: 5,
  },
  store: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  name: {
    fontSize: 14,
    marginBottom: 5,
  },
  expiry: {
    fontSize: 12,
    color: "gray",
    marginBottom: 5,
  },
});

export default Gifty;
