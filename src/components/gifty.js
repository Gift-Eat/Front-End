import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";




const Gifty = ({
  gifticon_id,
  expiration_date,
  gifticon_name,
  where_to_use,
  serial_code,
  original_image_path,
  onPress,
  dayLeft,

}) => {
  console.log("원본 이미지 경로:", original_image_path);



  // original_image_path가 존재하지 않으면 기본 이미지 rul 사용
  const imgUrl = original_image_path
    ? `http://52.78.201.166:8080/images/${original_image_path.split("/").pop()}`
    : "https://via.placeholder.com/150";
  console.log("경로", imgUrl);

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: imgUrl }} style={styles.image} />
      <Text style={styles.store}>{where_to_use}</Text>
      <Text style={styles.name}>{gifticon_name}</Text>
      <Text style={styles.expiry}>D-{dayLeft}</Text>
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
